'use client';
import { useState, type ChangeEvent } from 'react';
import NavBar from './NavBar';
import Foundation from './sections/foundation';
import Task21 from './sections/task21';
import Task22 from './sections/task22';
import Task23 from './sections/task23';
import Task24 from './sections/task24';
/** Domain 2本文と各タスクの独立したチェック進捗。 */
export default function SapDomain2Guide() {
 const [progress,setProgress]=useState<Record<string,number>>({});
 function updateProgress(event:ChangeEvent<HTMLInputElement>){
  const input=event.currentTarget;
  const card=input.closest('.checklist-card');
  const cards=[...(input.closest('main')?.querySelectorAll('.checklist-card')??[])];
  if(!card)return;
  const index=cards.indexOf(card);
  setProgress(previous=>({...previous,[index]:card.querySelectorAll('input:checked').length}));
 }
 const props={progress,updateProgress};
 return <div className="sap-domain2-page"><div className="layout"><NavBar/><main className="main"><Foundation {...props}/><Task21 {...props}/><Task22 {...props}/><Task23 {...props}/><Task24 {...props}/></main></div></div>;
}
