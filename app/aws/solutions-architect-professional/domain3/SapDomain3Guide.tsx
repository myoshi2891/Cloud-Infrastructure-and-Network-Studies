'use client';
import { useState, type ChangeEvent } from 'react';
import NavBar from './NavBar';
import Foundation from './sections/foundation';
import Task31 from './sections/task31';
/** Domain 3本文と各タスクの独立したチェック進捗。 */
export default function SapDomain3Guide() {
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
 return <div className="sap-domain3-page"><div className="layout"><NavBar/><main className="main"><Foundation {...props}/><Task31 {...props}/></main></div></div>;
}
