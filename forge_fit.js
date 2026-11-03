"use strict";
/* ============ FORGE v1.2 fit layer: makes the whole studio fit any frame ============
   Auto-shrinks the chrome on small or short windows (phones, split view, small
   in-app frames), lets the tab strip scroll, keeps output text from clipping,
   and adds a Fit button on the Home tab to force the compact layout. */
(function(){
 var css=[
 '#app{height:100dvh!important}',
 '#tabs{overflow-x:auto;scrollbar-width:none;flex:none}',
 '#tabs::-webkit-scrollbar{display:none}',
 '#output .ln{overflow-wrap:anywhere}',
 'body.compact #app{grid-template-rows:24px 18px 62px minmax(0,1fr) clamp(64px,18vh,110px) 16px!important}',
 'body.compact .rbtn{width:44px;height:40px;gap:1px}',
 'body.compact .rbtn .ic{font-size:12px}',
 'body.compact .rbtn .lb{font-size:8px}',
 'body.compact #tabs .tab{padding:2px 8px;font-size:10px}',
 'body.compact #dock{grid-template-rows:1fr 20px}',
 'body.compact #output{font-size:10px}',
 '@media(max-width:900px){',
 ' #app{grid-template-rows:26px 20px 70px minmax(0,1fr) clamp(80px,22vh,150px) 18px!important}',
 ' .rbtn{width:50px;height:46px;gap:1px}',
 ' .rbtn .ic{font-size:14px}',
 ' .rbtn .lb{font-size:9px}',
 ' #tabs .tab{padding:3px 9px;font-size:11px}',
 ' .panel h3{padding:4px 8px;font-size:10px}',
 ' body.forge-mobile .panel{max-width:76vw}',
 '}',
 ].join('\n');
 var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 function applyFit(){
  var h=window.innerHeight||screen.height;
  var w=window.innerWidth||screen.width;
  var compact=(h<640||w<430)&&document.body.getAttribute('data-fit-user')!=='off';
  document.body.classList.toggle('compact',compact);
  if(compact)document.body.setAttribute('data-fit-auto','on');}
 window.addEventListener('resize',applyFit);
 window.addEventListener('orientationchange',function(){setTimeout(applyFit,250);});
 applyFit();
 if(typeof TABS!=='undefined'&&TABS[1]){
  TABS[1][1]=TABS[1][1].concat([null,
   ['icon-fit','Fit',function(){
    if(document.body.classList.contains('compact')){
     document.body.setAttribute('data-fit-user','off');document.body.classList.remove('compact');
     out('Fit: roomy layout back. tap Fit again to compact it','sys');}
    else{
     document.body.setAttribute('data-fit-user','on');document.body.classList.add('compact');
     out('Fit: compact layout on — smaller ribbon, output and bars so everything fits your frame','sys');}}]]);
  buildTabs();}
 out('FORGE v1.2 fit layer loaded — the studio auto-shrinks to fit small frames, tabs scroll sideways, and the Fit button on Home toggles compact by hand','sys');
})();
