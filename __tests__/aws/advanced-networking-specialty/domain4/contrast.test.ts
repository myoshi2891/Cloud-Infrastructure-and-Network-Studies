import {readFileSync} from 'node:fs';
import postcss from 'postcss';
import {expect,it} from 'vitest';
const variables:Record<string,string>={};postcss.parse(readFileSync('app/globals.css','utf8')).walkDecls(d=>{variables[d.prop]=d.value;});
const source=postcss.parse(readFileSync('app/aws/advanced-networking-specialty/domain4/page.css','utf8'));
const color=(selector:string)=>{let value='';source.walkRules(r=>{if(r.selector===selector)r.walkDecls(d=>{if(d.prop==='color')value=d.value;});});return value.replace(/var\((--[\w-]+)\)/g,(_,k:string)=>variables[k]??'');};
function luminance(hex:string){const numbers=hex.slice(1).match(/../g)!.map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return .2126*numbers[0]!+.7152*numbers[1]!+.0722*numbers[2]!;}
it.each([['.ans-domain4-page .main code:not(.code-block code)','#f0f3fa'],['.ans-domain4-page .quiz-answer-label','#e6f6ec']])('keeps %s above AA on its source background',(selector,bg)=>{
 const text=color(selector);expect(text).toMatch(/^#[\da-f]{6}$/i);expect((Math.max(luminance(text),luminance(bg))+.05)/(Math.min(luminance(text),luminance(bg))+.05)).toBeGreaterThanOrEqual(4.5);
});
