import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import { CodeBlock } from '@/app/aws/developer-associate/domain4/CodeBlock';
import { codeLines } from '@/scripts/inventory-extraction.mjs';
import fixture from '@/docs/migration-inventory/aws-dva-domain4.fidelity.json';
it('JSON/Pythonの構文色と全25コードの全文・空行・字下げを同時に保持する', () => {
    for(const lines of fixture.structure.codes) {
        const {container,unmount} = render(<CodeBlock language="python" lines={lines}/>);
        expect(codeLines(container.querySelector('.code-block')!)).toEqual(lines);
        unmount();
    }
    const {container} = render(<><CodeBlock language="json" lines={['{"key": "value", "n": 42, "flag": true}']}/><CodeBlock language="python" lines={['def handler(event):', '    # comment', '    return "ok"']}/></>);
    for(const selector of ['.hljs-attr','.hljs-string','.hljs-number','.hljs-literal','.hljs-keyword','.hljs-title','.hljs-comment']) expect(container.querySelector(selector)).not.toBeNull();
});
