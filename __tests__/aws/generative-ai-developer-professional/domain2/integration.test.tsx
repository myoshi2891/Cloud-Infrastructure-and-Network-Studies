import {expect,it} from 'vitest';
import {EXAMS} from '@/app/constants';
it('links the AIP Domain 2 detail page from the navigation source',()=>{expect(EXAMS.find(e=>e.id==='aws-aip')?.domains?.find(d=>d.label.startsWith('ドメイン2:'))?.href).toBe('/aws/generative-ai-developer-professional/domain2');});
