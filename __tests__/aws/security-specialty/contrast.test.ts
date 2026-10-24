import {readFileSync} from 'node:fs';
import postcss from 'postcss';
import {expect,it} from 'vitest';
const variables:Record<string,string>={};postcss.parse(readFileSync('app/globals.css','utf8')).walkDecls(d=>{variables[d.prop]=d.value;});
const source=postcss.parse(readFileSync('app/aws/security-specialty/page.css','utf8'));
const color=(selector:string)=>{let value='';source.walkRules(r=>{if(r.selector===selector)r.walkDecls(d=>{if(d.prop==='color')value=d.value;});});return value.replace(/var\((--[\w-]+)\)/g,(_,k:string)=>variables[k]??'');};
function luminance(hex:string){const n=hex.slice(1).match(/../g)!.map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*n[0]!+.7152*n[1]!+.0722*n[2]!;}
it.each([['.scs-guide-page .main code:not(.code-block code)','#eef2f9'],['.scs-guide-page .codeblock code .c1','#f3f6fb'],['.scs-guide-page .q-mode-pill.multi','#fff3e0']])('keeps %s at AA contrast on the original background',(selector,bg)=>{
 const text=color(selector);expect(text).toMatch(/^#[\da-f]{6}$/i);expect((Math.max(luminance(text),luminance(bg))+.05)/(Math.min(luminance(text),luminance(bg))+.05)).toBeGreaterThanOrEqual(4.5);
});
