import fs from 'fs';

const [,, startLine, endLine, componentName] = process.argv;

if (!startLine || !endLine || !componentName) {
    console.error('Usage: bun scripts/convert-section-to-jsx.mjs <startLine> <endLine> <componentName>');
    process.exit(1);
}

const lines = fs.readFileSync('Aws-certified-ai-business-strategist-guide.html', 'utf-8').split('\n');
const sectionHtml = lines.slice(parseInt(startLine, 10) - 1, parseInt(endLine, 10)).join('\n');

let jsx = sectionHtml;

// 1. Convert <figure class="diagram"><div id="dgm-N"></div></figure> -> <Diagram id="dgm-N" />
jsx = jsx.replace(/<figure class="diagram"><div id="(dgm-\d+)"><\/div><\/figure>/g, '<Diagram id="$1" />');

// 2. Convert class -> className
jsx = jsx.replace(/\bclass="/g, 'className="');

// 3. Convert for -> htmlFor
jsx = jsx.replace(/\bfor="/g, 'htmlFor="');

// 4. Convert th -> th scope="col" (inside thead)
jsx = jsx.replace(/<th>/g, '<th scope="col">');
jsx = jsx.replace(/<th\s+className="([^"]*)">/g, '<th scope="col" className="$1">');

// 5. Convert self-closing tags
jsx = jsx.replace(/<br>/g, '<br />');
jsx = jsx.replace(/<hr>/g, '<hr />');
jsx = jsx.replace(/<input\s+([^>]*[^\/])>/g, '<input $1 />');

// 6. Fix comments
jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

const output = `import { Diagram } from '../Diagram';

export const ${componentName} = () => {
    return (
        <>
${jsx}
        </>
    );
};
`;

const targetPath = `app/aws/ai-business-strategist/sections/${componentName}.tsx`;
fs.writeFileSync(targetPath, output);
console.log(`Generated ${targetPath} successfully!`);
