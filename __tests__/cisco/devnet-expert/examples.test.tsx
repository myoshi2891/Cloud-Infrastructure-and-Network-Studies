import { codeText } from '@/scripts/inventory-extraction.mjs';
import { execFileSync, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import Part4 from '@/app/cisco/devnet-expert/sections/Part4';
import Part5 from '@/app/cisco/devnet-expert/sections/Part5';
import Part7 from '@/app/cisco/devnet-expert/sections/Part7';
import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Part6 from '@/app/cisco/devnet-expert/sections/Part6';
import Part8 from '@/app/cisco/devnet-expert/sections/Part8';
import Part9 from '@/app/cisco/devnet-expert/sections/Part9';

vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));

it('renders code lines without extra text nodes and saves VLAN-only changes', () => {
    const { container } = render(<><Part4 /><Part5 /><Part6 /><Part7 /><Part8 /><Part9 /></>);
    const blocks = [...container.querySelectorAll('.code-block')];
    expect(blocks).toHaveLength(43);
    blocks.forEach(block => expect([...block.childNodes]).toEqual([...block.querySelectorAll(':scope > .code-line')]));
    const role = blocks.map(block => [...block.children].map(line => line.textContent).join('\n'))
        .find(text => text.startsWith('# roles/vlans/defaults/main.yml'))!;
    const yaml = createRequire(import.meta.url)('js-yaml');
    const tasks = yaml.load(role.split('# roles/vlans/tasks/main.yml\n')[1]!.split('# roles/vlans/handlers/main.yml')[0]!);
    expect(tasks.find((task: { name: string }) => task.name.startsWith('Configure VLANs')).notify).toBe('save config');
    expect(tasks.find((task: { name: string }) => task.name.startsWith('Render NTP')).notify).toBe('save config');
    const handlers = yaml.load(role.split('# roles/vlans/handlers/main.yml\n')[1]!);
    expect(handlers).toEqual([{ name: 'save config', 'cisco.ios.ios_config': { save_when: 'modified' } }]);
});

// ast.unparse in the embedded validator requires Python 3.9 or later.
const python = spawnSync('python3', ['-c', 'import sys; sys.exit(sys.version_info < (3, 9))']);

it('builds RESTCONF lists, escapes XML text, and selects a namespaced interface', (context) => {
    if (python.error || python.status !== 0) context.skip('Requires python3');
    const { container } = render(<Part5 />);
    const blocks = [...container.querySelectorAll('.code-block')].map(codeText);
    const restconf = blocks.find(b => b.includes('# 部分更新（PATCH）'))!;
    const payload = blocks.find(b => b.includes('def build_payload('))!;
    const xpath = blocks.find(b => b.includes('filter=("xpath",'))!;
    const result = execFileSync('python3', ['-c', `
import ast, json, sys, types
import xml.etree.ElementTree as ET
from unittest.mock import MagicMock, patch
restconf, payload, xpath = json.load(sys.stdin)
tree = ast.parse(restconf)
body = next(n.value for n in tree.body if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == 'body' for t in n.targets))
assert ast.literal_eval(body) == {'ietf-interfaces:interface': [{'name': 'GigabitEthernet1', 'description': 'managed by automation'}]}
manager = MagicMock()
sys.modules['ncclient'] = types.SimpleNamespace(manager=manager)
ns = {'HOST': 'example.test', 'USER': 'user', 'PASS': 'pass'}
with patch('builtins.print'):
    exec(payload, ns)
    exec(xpath, ns)
interface_ns = 'urn:ietf:params:xml:ns:yang:ietf-interfaces'
for enabled in (True, False):
    name = 'Gi1 & <test>'
    description = 'core & edge <backup> "quoted" café'
    root = ET.fromstring(ns['build_payload'](name, {'description': description, 'enabled': enabled}))
    interface = root.find('{%s}interfaces/{%s}interface' % (interface_ns, interface_ns))
    assert interface.find('{%s}name' % interface_ns).text == name
    assert interface.find('{%s}description' % interface_ns).text == description
    assert interface.find('{%s}enabled' % interface_ns).text == str(enabled).lower()
    assert len(interface) == 4
    assert interface.find('{%s}type' % interface_ns).text == 'ianaift:ethernetCsmacd'
call = manager.connect.return_value.__enter__.return_value.get_config.call_args
kind, (namespaces, expression) = call.kwargs['filter']
assert kind == 'xpath'
data = ET.fromstring('<data><interfaces xmlns="' + interface_ns + '"><interface><name>GigabitEthernet1</name></interface><interface><name>GigabitEthernet2</name></interface></interfaces></data>')
selected = data.findall('.' + expression, namespaces)
assert len(selected) == 1
assert selected[0].find('{%s}name' % interface_ns).text == 'GigabitEthernet1'
print('validation passed')
`], { input: JSON.stringify([restconf, payload, xpath]), encoding: 'utf8' });
    expect(result.trim()).toBe('validation passed');
});

it('executes the displayed OSPF and ping validators against missing neighbors and option injection', (context) => {
    if (python.error || python.status !== 0) {
        context.skip('Requires python3 (Python 3.9 or later) for ast.unparse');
    }
    const { container } = render(<><Part6 /><Part8 /></>);
    const blocks = [...container.querySelectorAll('.code-block')].map(codeText);
    const ospf = blocks.find(b => b.startsWith('# test_ospf.py'))!;
    const ping = blocks.find(b => b.includes('def safe_ping('))!;
    const ios = blocks.find(b => b.includes('with ConnectHandler('))!;
    const bearer = blocks.find(b => b.includes('def require_token('))!;
    const yaml = createRequire(import.meta.url)('js-yaml');
    const testbed = yaml.load(blocks.find(b => b.startsWith('# testbed.yaml'))!);
    expect(Object.keys(testbed.devices)).toEqual(['R1', 'R2']);
    expect(testbed.devices.R1.connections.cli.ip).not.toBe(testbed.devices.R2.connections.cli.ip);
    expect(blocks.find(b => b.startsWith('from genie.testbed import load'))).toContain('devices["R1"]');
    const result = execFileSync('python3', ['-c', `
import ast, json, os, re, sys, types
from unittest.mock import MagicMock, patch
ospf, ping, ios, bearer, router_names = json.load(sys.stdin)
class ValidationFailed(Exception): pass
class Testcase:
    def failed(self, message): raise ValidationFailed(message)
aetest = types.SimpleNamespace(CommonSetup=object, CommonCleanup=object,
    Testcase=Testcase, test=lambda f: f, subsection=lambda f: f)
sys.modules['pyats'] = types.SimpleNamespace(aetest=aetest)
ns = {}
exec(ospf, ns)
def device(neighbors):
    return types.SimpleNamespace(parse=lambda command: neighbors)
def neighbors(router, state='FULL/DR', iface='GigabitEthernet2'):
    return {'interfaces': {iface: {'neighbors': {router: {'state': state}}}}}
def check(devices, should_fail):
    try:
        ns['OspfNeighbors']().all_full(types.SimpleNamespace(devices=devices))
    except ValidationFailed:
        assert should_fail
    else:
        assert not should_fail
valid = {'R1': device(neighbors('2.2.2.2')), 'R2': device(neighbors('1.1.1.1'))}
assert set(router_names) == set(ns['EXPECTED_NEIGHBORS'])
check({name: valid[name] for name in router_names}, False)
for invalid in ({}, {'R1': valid['R1']}, {**valid, 'R3': valid['R1']},
    {**valid, 'R1': device({})},
    {**valid, 'R1': device({'interfaces': {'GigabitEthernet2': {'neighbors': {}}}})},
    {**valid, 'R1': device(neighbors('2.2.2.2', 'INIT'))},
    {**valid, 'R1': device(neighbors('3.3.3.3'))},
    {**valid, 'R1': device(neighbors('2.2.2.2', iface='GigabitEthernet3'))}):
    check(invalid, True)
ns = {}
exec(ping, ns)
with patch('subprocess.run', return_value=types.SimpleNamespace(returncode=0)) as run:
    for host in ('-f', '--help', '-example.com', '', 'a;id', 'a b', 'a' * 254):
        try: ns['safe_ping'](host)
        except ValueError: pass
        else: raise AssertionError(host)
    run.assert_not_called()
    for host in ('192.0.2.10', 'router-1.example.com'):
        assert ns['safe_ping'](host) == 0
        run.assert_called_with(['ping', '-c', '1', '--', host], check=False)
connect = MagicMock()
sys.modules['netmiko'] = types.SimpleNamespace(ConnectHandler=connect)
with patch.dict(os.environ, {'IOS_XE_USER': 'test-user', 'IOS_XE_PASS': 'test-pass'}):
    with patch('builtins.print'):
        exec(ios, {})
assert connect.call_args.kwargs['username'] == 'test-user'
assert connect.call_args.kwargs['password'] == 'test-pass'
conn = connect.return_value.__enter__.return_value
config = conn.send_config_set.call_args.args[0]
assert config[config.index('ip route 192.168.100.0 255.255.255.0 10.0.0.2') - 1] == 'exit'
pattern = conn.send_config_set.call_args.kwargs['error_pattern']
for error in ('% Invalid input detected', '% Incomplete command.', '% Ambiguous command:'):
    assert re.search(pattern, error)
assert not re.search(pattern, 'Configuration applied successfully')
# Verify the displayed startup uses required environment paths for both TLS files.
tree = ast.parse(bearer)
health = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'health')
assert len(health.decorator_list) == 1
route = health.decorator_list[0]
assert ast.unparse(route.func) == 'app.get'
assert ast.literal_eval(route.args[0]) == '/health'
assert {k.arg: ast.literal_eval(k.value) for k in route.keywords} == {'status_code': 200}
assert not health.args.args
health.decorator_list = []
health_ns = {}
exec(compile(ast.Module(body=[health], type_ignores=[]), '<health>', 'exec'), health_ns)
assert health_ns['health']() == {'status': 'ok'}
devices = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'list_devices')
assert ast.unparse(devices.decorator_list[0]) == "app.get('/devices', dependencies=[Depends(require_token)])"
startup = next(n for n in tree.body if isinstance(n, ast.If))
call = next(n for n in ast.walk(startup) if isinstance(n, ast.Call))
assert ast.unparse(call.func) == 'uvicorn.run'
args = {k.arg: ast.unparse(k.value) for k in call.keywords}
assert args['ssl_certfile'] == "os.environ['TLS_CERT_FILE']"
assert args['ssl_keyfile'] == "os.environ['TLS_KEY_FILE']"
print('validation passed')
`], { input: JSON.stringify([ospf, ping, ios, bearer, Object.keys(testbed.devices)]), encoding: 'utf8' });
    expect(result.trim()).toBe('validation passed');
});

it('retries transport failures with bounded backoff and preserves HTTP handling', (context) => {
    if (python.error || python.status !== 0) context.skip('Requires python3');
    const { container } = render(<Part4 />);
    const code = [...container.querySelectorAll('.code-block')].map(codeText).find(code => code.includes('def get_with_backoff('))!;
    const result = execFileSync('python3', ['-c', `
import json, sys, types
from unittest.mock import MagicMock, patch, call
class Timeout(Exception): pass
class ConnectionError(Exception): pass
class HTTPError(Exception): pass
requests = types.SimpleNamespace(get=MagicMock(), exceptions=types.SimpleNamespace(Timeout=Timeout, ConnectionError=ConnectionError))
sys.modules['requests'] = requests
ns = {}
exec(json.load(sys.stdin), ns)
def response(status, headers=None):
    r = MagicMock(status_code=status, headers=headers or {})
    r.json.return_value = {'ok': True}
    if status == 404: r.raise_for_status.side_effect = HTTPError()
    return r
def check(events, waits, error=None, retries=5):
    requests.get.reset_mock(side_effect=True)
    requests.get.side_effect = events
    with patch('time.sleep') as sleep, patch('random.uniform', return_value=0.25) as jitter:
        try:
            assert ns['get_with_backoff']('https://example.test', {'Accept': 'application/json'}, max_retries=retries) == {'ok': True}
        except Exception as exc:
            assert error and isinstance(exc, error), repr(exc)
        else:
            assert error is None
        assert sleep.call_args_list == [call(wait + 0.25) for wait in waits]
        assert jitter.call_args_list == [call(0, 1)] * len(waits)
    assert requests.get.call_count == len(events)
    for args in requests.get.call_args_list:
        assert args == call('https://example.test', headers={'Accept': 'application/json'}, timeout=10)
check([Timeout(), ConnectionError(), response(503), response(200)], [1, 2, 4])
for failure, waits in ((Timeout, [1, 2, 4, 8]), (ConnectionError, [1, 2, 4, 8]),
    (lambda: response(503), [1, 2, 4, 8]),
    (lambda: response(429, {'Retry-After': '7'}), [7, 7, 7, 7])):
    check([failure() for _ in range(5)], waits, RuntimeError)
    check([failure()], [], RuntimeError, retries=1)
check([Timeout(), ConnectionError()], [1], RuntimeError, retries=2)
check([], [], RuntimeError, retries=0)
check([Timeout(), response(200)], [1], retries=2)
check([response(429, {'Retry-After': '7'}), response(200)], [7])
check([response(429), response(200)], [1])
with patch('time.time', return_value=0):
    check([response(429, {'Retry-After': 'Thu, 01 Jan 1970 00:00:10 GMT'}), response(200)], [10])
check([response(404)], [], HTTPError)
print('validation passed')
`], { input: JSON.stringify(code), encoding: 'utf8' });
    expect(result.trim()).toBe('validation passed');
});

it('documents namespace and Secret creation before applying resources, and scopes as unimplemented', () => {
    const { container } = render(<><Part7 /><Part8 /></>);
    const setup = [...container.querySelectorAll('p')].find(p => p.textContent?.includes('kubectl create namespace netauto'))!.textContent!;
    const commands = ['kubectl create namespace netauto', 'kubectl -n netauto create secret tls api-tls', 'kubectl -n netauto create secret generic api-backend-ca', 'kubectl apply -f manifest.yaml'];
    const positions = commands.map(command => setup.indexOf(command));
    expect(positions.every((position, i) => position >= 0 && (i === 0 || position > positions[i - 1]!))).toBe(true);
    expect(container.textContent).toContain('スコープに基づく認可チェックや、権限不足で 403 を返す処理は実装していません');
    const authorization = [...container.querySelectorAll('tr')].find(tr => tr.cells[0]?.textContent === '認可')!;
    expect(authorization.cells[1]!.textContent).toContain('追加の制御（この例では未実装）');
});
