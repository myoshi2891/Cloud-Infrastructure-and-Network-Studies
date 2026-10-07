// scripts/generate-sections.mjs
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { nodeToJsx } from './convert-html-section-to-jsx.mjs';

const doc = new JSDOM(fs.readFileSync('Aws-soa-c03-guide.html', 'utf8')).window.document;

function generateSection(startId, stopId, outPath, componentName, imports, context = { codeBlockIndex: 0 }) {
    const elements = [];
    let current = doc.getElementById(startId);
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

// 1. SectionIntro: s-h2-1 -> s-h1-1
generateSection(
    's-h2-1',
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
