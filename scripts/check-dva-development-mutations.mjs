/** 本文・表行・図・リスト記号の欠落でテストが失敗することを確認し、必ず原状復帰する。 */
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
const section='app/aws/developer-associate/domain1/sections/Sec0.tsx';
const css='app/aws/developer-associate/domain1/page.css';
const mutations=[
    {name:'paragraph',path:section,pattern:/<p>[\s\S]*?<\/p>/,replacement:'',test:'本文・sidebar'},
    {name:'table-row',path:section,pattern:/<tr>\s*<td>[\s\S]*?<\/tr>/,replacement:'',test:'td 全件'},
    {name:'diagram',path:section,pattern:/<Diagram id="d01"[^>]*\/>/,replacement:'',test:'全図の原本DSL'},
    {name:'list-marker',path:css,pattern:/list-style-type: disc/,replacement:'list-style-type: none',test:'点・番号'},
];
for(const mutation of mutations) {
    const original=readFileSync(mutation.path,'utf8');
    const changed=original.replace(mutation.pattern,mutation.replacement);
    if(changed===original) throw new Error(`Mutation missed: ${mutation.name}`);
    try {
        writeFileSync(mutation.path,changed);
        let detected=false;
        try {
            execFileSync('bun',['run','test','--','__tests__/aws/developer-associate/domain1/page.test.tsx','-t',mutation.test],{encoding:'utf8',stdio:'pipe'});
        } catch(error) {
            const output=String(error.stdout)+String(error.stderr);
            if(!output.includes('AssertionError')) throw error;
            detected=true;
        }
        if(!detected) throw new Error(`Undetected omission: ${mutation.name}`);
        console.log(`Detected: ${mutation.name}`);
    } finally {
        writeFileSync(mutation.path,original);
    }
}
