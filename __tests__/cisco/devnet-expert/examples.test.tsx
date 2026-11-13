import { execFileSync } from 'node:child_process';
import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Part6 from '@/app/cisco/devnet-expert/sections/Part6';
import Part8 from '@/app/cisco/devnet-expert/sections/Part8';

vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));

it('executes the displayed OSPF and ping validators against missing neighbors and option injection', () => {
    const { container } = render(<><Part6 /><Part8 /></>);
    const blocks = [...container.querySelectorAll('.code-block')].map(b => b.textContent ?? '');
    const ospf = blocks.find(b => b.startsWith('# test_ospf.py'))!;
    const ping = blocks.find(b => b.includes('def safe_ping('))!;
    const ios = blocks.find(b => b.includes('with ConnectHandler('))!;
    const bearer = blocks.find(b => b.includes('def require_token('))!;
    const result = execFileSync('python3', ['-c', `
import ast, json, os, sys, types
from unittest.mock import MagicMock, patch
ospf, ping, ios, bearer = json.load(sys.stdin)
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
check(valid, False)
for invalid in ({}, {'R1': valid['R1']},
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
`], { input: JSON.stringify([ospf, ping, ios, bearer]), encoding: 'utf8' });
    expect(result.trim()).toBe('validation passed');
});
