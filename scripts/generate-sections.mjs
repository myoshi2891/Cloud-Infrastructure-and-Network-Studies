// scripts/generate-sections.mjs
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { nodeToJsx } from './convert-html-section-to-jsx.mjs';

// 移行元は .gitignore 済みの archive/ にあり CI に存在しないため、追跡済みの固定リビジョンから直接読む
const SOURCE_COMMIT = '8206deff71f84e27ab7c12230d1be3adf0e08e6d';
const SOURCE_PATH = 'archive/Aws/html/cloudops/Aws-soa-c03-guide.html';
const html = execFileSync('git', ['show', `${SOURCE_COMMIT}:${SOURCE_PATH}`], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
const doc = new JSDOM(html).window.document;

function generateSection(start, stopId, outPath, componentName, imports, context = { codeBlockIndex: 0 }) {
    const elements = [];
    let current = typeof start === 'string' ? doc.getElementById(start) : start;
    const stopAt = stopId ? doc.getElementById(stopId) : null;

    while (current && current !== stopAt) {
        elements.push(current);
        current = current.nextElementSibling;
    }

    const jsxBody = elements.map(el => nodeToJsx(el, context)).join('\n');
    const content = `${imports}

/**
 * ${componentName}
 */
export default function ${componentName}() {
    return (
        <>
${jsxBody}
        </>
    );
}
`;
    fs.writeFileSync(outPath, content, 'utf8');
    console.log(`${componentName} written to ${outPath} (${elements.length} elements)`);
}

// 1. SectionIntro: .content firstElementChild -> s-h1-1
generateSection(
    doc.querySelector('.content').firstElementChild,
    's-h1-1',
    'app/aws/cloudops-engineer-associate/sections/SectionIntro.tsx',
    'SectionIntro',
    'import { Diagram } from "../Diagram";\n',
    { codeBlockIndex: 0 }
);

// 2. SectionDomain1: s-h1-1 -> s-h1-2
generateSection(
    's-h1-1',
    's-h1-2',
    'app/aws/cloudops-engineer-associate/sections/SectionDomain1.tsx',
    'SectionDomain1',
    'import { Diagram } from "../Diagram";\nimport CodeBlock from "../CodeBlock";\n',
    { codeBlockIndex: 0 }
);

// 3. SectionDomain2: s-h1-2 -> s-h1-3
generateSection(
    's-h1-2',
    's-h1-3',
    'app/aws/cloudops-engineer-associate/sections/SectionDomain2.tsx',
    'SectionDomain2',
    'import { Diagram } from "../Diagram";\n',
    { codeBlockIndex: 5 }
);

// 4. SectionDomain3: s-h1-3 -> s-h1-4
generateSection(
    's-h1-3',
    's-h1-4',
    'app/aws/cloudops-engineer-associate/sections/SectionDomain3.tsx',
    'SectionDomain3',
    'import { Diagram } from "../Diagram";\nimport CodeBlock from "../CodeBlock";\n',
    { codeBlockIndex: 5 }
);

// 5. SectionDomain4: s-h1-4 -> s-h1-5
generateSection(
    's-h1-4',
    's-h1-5',
    'app/aws/cloudops-engineer-associate/sections/SectionDomain4.tsx',
    'SectionDomain4',
    'import { Diagram } from "../Diagram";\nimport CodeBlock from "../CodeBlock";\n',
    { codeBlockIndex: 6 }
);

// 6. SectionDomain5: s-h1-5 -> s-h1-6
generateSection(
    's-h1-5',
    's-h1-6',
    'app/aws/cloudops-engineer-associate/sections/SectionDomain5.tsx',
    'SectionDomain5',
    'import { Diagram } from "../Diagram";\nimport CodeBlock from "../CodeBlock";\n',
    { codeBlockIndex: 8 }
);

// 7. SectionAppendix: s-h1-6 -> end
generateSection(
    's-h1-6',
    null,
    'app/aws/cloudops-engineer-associate/sections/SectionAppendix.tsx',
    'SectionAppendix',
    '',
    { codeBlockIndex: 10 }
);
