import { codeText } from '@/scripts/inventory-extraction.mjs';
import { execFileSync, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import Part2 from '@/app/cisco/devnet-expert/sections/Part2';
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
    expect(container.querySelector('#s-4-1')!.textContent).toContain('pip install fastapi uvicorn requests');
    blocks.forEach(block => expect([...block.childNodes]).toEqual([...block.querySelectorAll(':scope > .code-line')]));
    const role = blocks.map(block => [...block.children].map(line => line.textContent).join('\n'))
        .find(text => text.startsWith('# roles/vlans/defaults/main.yml'))!;
    const yaml = createRequire(import.meta.url)('js-yaml');
    const tasks = yaml.load(role.split('# roles/vlans/tasks/main.yml\n')[1]!.split('# roles/vlans/handlers/main.yml')[0]!);
    expect(tasks.find((task: { name: string }) => task.name.startsWith('Configure VLANs')).notify).toBe('save config');
    expect(tasks.find((task: { name: string }) => task.name.startsWith('Render NTP')).notify).toBe('save config');
    const handlers = yaml.load(role.split('# roles/vlans/handlers/main.yml\n')[1]!.split('# site.yml')[0]!);
    expect(handlers).toEqual([{ name: 'save config', 'cisco.ios.ios_config': { save_when: 'modified' } }]);
    const playbook = yaml.load(role.split('# site.yml\n')[1]!);
    expect(playbook).toEqual([{ name: 'Apply switch configuration', hosts: 'switches', gather_facts: false, roles: ['vlans'] }]);
    expect(container.querySelector('#s-4-7')!.textContent).toContain('ansible-playbook -i inventory/hosts.yml site.yml');
    const certificates = blocks.map(codeText).find(text => text.startsWith('# 1. 秘密鍵'))!;
    expect(certificates).toContain('ルート CA 証明書（ca.crt）・中間 CA 証明書（intermediate.crt）');
    expect(certificates.split('\n').find(line => line.startsWith('openssl verify ')))
        .toBe('openssl verify -verify_hostname app.example.com -CAfile ca.crt -untrusted intermediate.crt app.crt');
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
import ast, json, os, sys, types
import xml.etree.ElementTree as ET
from unittest.mock import MagicMock, patch
restconf, payload, xpath = json.load(sys.stdin)
tree = ast.parse(restconf)
body = next(n.value for n in tree.body if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == 'body' for t in n.targets))
assert ast.literal_eval(body) == {'ietf-interfaces:interface': [{'name': 'GigabitEthernet1', 'description': 'managed by automation'}]}
manager = MagicMock()
sys.modules['ncclient'] = types.SimpleNamespace(manager=manager)
for example in (payload, xpath):
    ns = {}
    with patch.dict(os.environ, {'DEV_USER': 'test-user', 'DEV_PASS': 'test-pass'}), patch('builtins.print'):
        exec(example, ns)
    assert manager.connect.call_args.kwargs == {'host': '192.0.2.10', 'port': 830,
        'username': 'test-user', 'password': 'test-pass', 'hostkey_verify': True}
    if example == payload:
        build_payload = ns['build_payload']
interface_ns = 'urn:ietf:params:xml:ns:yang:ietf-interfaces'
for enabled in (True, False):
    name = 'Gi1 & <test>'
    description = 'core & edge <backup> "quoted" café'
    root = ET.fromstring(build_payload(name, {'description': description, 'enabled': enabled}))
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
class SchemaEmptyParserError(Exception): pass
sys.modules['genie.metaparser.util.exceptions'] = types.SimpleNamespace(SchemaEmptyParserError=SchemaEmptyParserError)
ns = {}
exec(ospf, ns)
def device(neighbors):
    return types.SimpleNamespace(parse=lambda command: neighbors)
def neighbors(router, state='FULL/DR', iface='GigabitEthernet2'):
    return {'interfaces': {iface: {'neighbors': {router: {'state': state}}}}}
def check(devices, should_fail):
    try:
        ns['OspfNeighbors']().all_full(types.SimpleNamespace(devices=devices))
    except ValidationFailed as exc:
        assert should_fail
        return str(exc)
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
empty = MagicMock()
empty.parse.side_effect = SchemaEmptyParserError('Parser Output is empty')
remaining = MagicMock()
remaining.parse.return_value = neighbors('1.1.1.1', 'INIT')
message = check({'R1': empty, 'R2': remaining}, True)
assert 'R1 GigabitEthernet2 2.2.2.2: 隣接が欠落' in message
assert 'R2 GigabitEthernet2 1.1.1.1 INIT' in message
remaining.parse.assert_called_once_with('show ip ospf neighbor')
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
assert connect.call_args.kwargs['ssh_strict'] is True
assert connect.call_args.kwargs['alt_host_keys'] is True
assert connect.call_args.kwargs['alt_key_file'] == 'known_hosts'
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

it('distinguishes the lab blueprint versions and directs future candidates to v1.2', () => {
    const { container } = render(<Part2 />);
    const overview = container.querySelector('#s-1-3')!;
    expect(overview.textContent).toContain('v1.1 の最終受験日は2027年3月22日、v1.2 の開始日は2027年3月23日');
    expect(overview.textContent).toContain('後続の学習例は v1.1 ブループリントに基づきます');
    expect(overview.textContent).toContain('Python 製 MCP サーバー');
    expect(overview.textContent).toContain('NSO・AppDynamics・ThousandEyes・Kubernetes の項目は削除');
    expect(overview.querySelector('a')).toHaveAttribute('href', 'https://learningcontent.cisco.com/documents/marketing/exam-topics/CCIE_Automation_v1.2_Exam_Topics_PDF.pdf');
});

it('documents trusted SSH keys, Compose secrets, registry publishing and deploy prerequisites', () => {
    const { container } = render(<><Part4 /><Part6 /><Part7 /></>);
    expect(container.querySelector('#s-5-2')!.textContent).toContain('接続前に、管理者から別経路で確認した 192.0.2.10 の信頼済み SSH ホスト鍵を known_hosts ファイルに登録');
    expect(container.querySelector('#s-6-2')!.textContent).toContain('docker compose up の実行前に、データベース用のパスワードを保存した secrets/db_password.txt を作成');
    expect(container.querySelector('#s-6-2')!.textContent).toContain('Part8 API はメモリ上のデータを使い、PostgreSQL には接続しません');
    const blocks = [...container.querySelectorAll('.code-block')].map(codeText);
    const dockerfile = blocks.find(code => code.startsWith('FROM python:3.12-slim'))!;
    expect(dockerfile).toContain('RUN mkdir -p /app/data && chown appuser:appuser /app/data\nVOLUME ["/app/data"]\n\nUSER appuser');
    const build = blocks.find(code => code.startsWith('docker build -t device-api:1.0'))!;
    const yaml = createRequire(import.meta.url)('js-yaml');
    const compose = yaml.load(blocks.find(code => code.startsWith('# compose.yaml'))!);
    expect(compose.services.api.environment).not.toHaveProperty('DB_HOST');
    expect(compose.services.api).not.toHaveProperty('depends_on');
    expect(compose.services.db.volumes).toEqual(['dbdata:/var/lib/postgresql/data']);
    const deployment = yaml.loadAll(blocks.find(code => code.startsWith('apiVersion: v1'))!)
        .find((doc: { kind: string }) => doc.kind === 'Deployment');
    const image = deployment.spec.template.spec.containers[0].image;
    expect(image).toBe('registry.example.com/device-api:1.0');
    expect(build.split('\n').slice(0, 3)).toEqual([
        'docker build -t device-api:1.0 .',
        `docker tag device-api:1.0 ${image}`,
        `docker push ${image}`,
    ]);
    expect(container.querySelector('#s-6-1')!.textContent).toContain('クラスタからアクセスできるレジストリ');
    const tokenInstructions = '# Bash: 自分だけの ASCII 秘密トークンを非表示で入力する\nread -rsp "API_TOKEN: " API_TOKEN\nprintf \'\\n\'\nexport API_TOKEN\ndocker run ';
    for (const code of blocks.filter(code => code.startsWith('docker build') || code.startsWith('docker network'))) {
        expect(code).toContain(tokenInstructions);
        expect(code).toContain('-e API_TOKEN');
    }
    const pipeline = yaml.load(blocks.find(code => code.includes('deploy-prod:'))!);
    expect(pipeline['deploy-prod'].script).toEqual([
        'pip install ansible-core ansible-pylibssh',
        'ansible-galaxy collection install cisco.ios',
        'ansible-playbook -i inventory/prod site.yml',
    ]);
});

it('validates route-safe hostnames and rejects non-ASCII bearer credentials with HTTP errors', context => {
    const interpreter = process.env.DEVNET_EXAMPLE_PYTHON ?? 'python3';
    const available = spawnSync(interpreter, ['-c', 'import fastapi, httpx, pydantic; assert int(pydantic.__version__.split(".")[0]) >= 2']);
    if (available.error || available.status !== 0) context.skip('Requires FastAPI, Pydantic 2 and HTTPX (DEVNET_EXAMPLE_PYTHON may select a test environment)');
    const { container } = render(<><Part5 /><Part8 /></>);
    const blocks = [...container.querySelectorAll('.code-block')].map(codeText);
    const inventory = blocks.find(code => code.includes('class Device(BaseModel)'))!;
    const bearer = blocks.find(code => code.includes('def require_token('))!;
    const output = execFileSync(interpreter, ['-c', `
import json, os, sys
from fastapi.testclient import TestClient
inventory, bearer = json.load(sys.stdin)
ns = {'__name__': 'inventory_example'}
exec(inventory, ns)
client = TestClient(ns['app'])
for name in ('r/1', 'r\\\\1', 'r%2F1', '../r', 'r?x', '', 'x' * 64):
    assert client.post('/devices', json={'hostname': name, 'mgmt_ip': '192.0.2.10'}).status_code == 422, name
assert client.get('/devices').json() == []
for name in ('R1', 'edge-01', 'router.example.com', 'switch_1'):
    device = {'hostname': name, 'mgmt_ip': '192.0.2.10', 'role': 'access'}
    assert client.post('/devices', json=device).status_code == 201
    assert client.get('/devices/' + name).json() == device
    assert client.delete('/devices/' + name).status_code == 204
    assert client.get('/devices/' + name).status_code == 404
os.environ['API_TOKEN'] = 'private-test-token'
ns = {'__name__': 'bearer_example'}
exec(bearer, ns)
client = TestClient(ns['app'])
assert client.get('/devices', headers={'Authorization': 'Bearer private-test-token'}).status_code == 200
for token in (b'wrong-token', b'caf\\xe9'):
    response = client.get('/devices', headers={'Authorization': b'Bearer ' + token})
    assert response.status_code == 401
    assert response.json() == {'detail': 'invalid token'}
    assert response.headers['www-authenticate'] == 'Bearer'
print('validation passed')
`], { input: JSON.stringify([inventory, bearer]), encoding: 'utf8' });
    expect(output.trim()).toBe('validation passed');
});
