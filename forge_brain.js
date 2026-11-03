"use strict";
/* ============ FORGE v0.10 AI Brain: real LLM in the browser ============
   Runs a small open model locally with transformers.js (Hugging Face).
   Free, no API key, no server: everything runs on your device.
   The pattern builder (forge_ai.js) still builds real systems; the brain
   answers anything else and suggests what to add next. */
var BRAIN={lib:false,model:false,loading:false,pct:0,err:null};
function brainLog(t,c){out('AI Brain: '+t,c||'sys');}
function brainLoadLib(){
 if(BRAIN.lib)return Promise.resolve(true);
 if(!window.TRNSFM){
  var s=document.createElement('script');s.type='module';
  s.textContent="import {pipeline,env} from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js';window.TRNSFM={pipeline:pipeline,env:env};window.dispatchEvent(new Event('forge-brain-lib'));";
  document.head.appendChild(s);
 }
 return new Promise(function(res,rej){
  if(BRAIN.lib||window.TRNSFM){BRAIN.lib=true;return res(true);}
  var done=false;
  window.addEventListener('forge-brain-lib',function(){if(!done){done=true;BRAIN.lib=true;res(true);}},{once:true});
  setTimeout(function(){if(!done){done=true;rej(new Error('library download timed out'));}},60000);
 });
}
function brainLoad(){
 if(BRAIN.model)return Promise.resolve(true);
 if(BRAIN.loading)return BRAIN.loading;
 BRAIN.pct=0;
 BRAIN.loading=brainLoadLib().then(function(){
  var T=window.TRNSFM;
  T.env.allowLocalModels=false;
  var gpu=(typeof navigator!=='undefined'&&navigator.gpu)?'q4f16':'int8';
  brainLog('downloading the local model (~120 MB, one time only, cached after)...');
  return T.pipeline('text-generation','onnx-community/SmolLM2-135M-Instruct-ONNX',{dtype:gpu,progress_callback:function(p){
   if(p&&p.status==='progress'&&typeof p.progress==='number'){
    var b=Math.floor(p.progress/25)*25;
    if(b>BRAIN.pct){BRAIN.pct=b;brainLog('model download '+b+'%');}
   }
  }});
 }).then(function(pipe){
  BRAIN.gen=pipe;BRAIN.model=true;BRAIN.loading=null;
  brainLog('local AI ready'+((typeof navigator!=='undefined'&&navigator.gpu)?' (webgpu accelerated)':' (running on cpu)')+'. type: ask <question>','sys');
  return true;
 }).catch(function(e){
  BRAIN.loading=null;BRAIN.err=(e&&e.message)?e.message:String(e);
  brainLog('could not start the local AI ('+BRAIN.err+'). the pattern builder still works','err');
  return false;
 });
 return BRAIN.loading;
}
function brainAsk(q){
 if(!BRAIN.model){
  brainLog('waking up the local AI...');
  brainLoad().then(function(ok){if(ok)brainAsk(q);});
  return;
 }
 var sys='You are the built-in AI helper inside FORGE, a free web-based Roblox Studio replica that runs on phones. You help the user build Roblox games. Keep answers short (under 80 words), practical, plain text, no markdown.';
 var msgs=[{role:'system',content:sys},{role:'user',content:String(q)}];
 BRAIN.gen(msgs,{max_new_tokens:180,do_sample:false}).then(function(r){
  var t=r&&r[0]&&r[0].generated_text;
  if(Array.isArray(t))t=t[t.length-1]&&t[t.length-1].content;
  t=String(t==null?'':t).trim();
  out('AI Brain: '+(t||'(empty answer)'),'sys');
 }).catch(function(e){brainLog('answer failed ('+((e&&e.message)||e)+')','err');});
}
var _aiRun0=aiRun;
aiRun=function(raw){
 var o=document.getElementById('output');var before=o?o.children.length:0;
 _aiRun0(raw);
 var last=o?o.lastElementChild:null;
 if(last&&/no system matched/.test(last.textContent)){
  last.remove();
  brainAsk(raw);
 }
};
var _runCmd4=runCmd;
runCmd=function(s){if(!s)return _runCmd4(s);
 var t=s.trim();
 if(/^brain$/i.test(t)){
  if(BRAIN.model)brainLog('ready. type: ask <question>');
  else if(BRAIN.loading)brainLog('loading ('+BRAIN.pct+'%)...');
  else brainLoad();
  return;}
 if(/^brain off$/i.test(t)){brainLog('note: the model stays in memory until you reload the page','warn');return;}
 var m=t.match(/^ask\s+(.+)/i);
 if(m){brainAsk(m[1]);return;}
 _runCmd4(s);};
if(typeof AI_BTNS!=='undefined'){
 AI_BTNS.push(['icon-cyl','AI Brain',function(){
  if(BRAIN.model){brainLog('ready. type: ask <question> in the command bar');}
  else{brainLoad();}
 }]);
 AI_BTNS.push(['icon-help','Ask AI',function(){
  var q=prompt('Ask the local AI anything about building your game:');
  if(q)brainAsk(q);
 }]);
 buildTabs();
}
out('FORGE v0.10 AI brain loaded — local LLM: type brain to start it (one ~120 MB download, then cached), ask <question> to use it, ai <build> still builds real systems','sys');
