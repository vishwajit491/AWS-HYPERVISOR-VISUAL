/* Cloud Messenger™ – UI controller */
(function(){
  const $=s=>document.querySelector(s);
  let cur=0,playing=false,timer=null,pt=null;
  const stepsEl=$('#steps');
  function renderSide(){
    stepsEl.innerHTML=STEPS.map((s,i)=>`<button class="st ${i===cur?'act':''} ${i<cur?'done':''}" data-i="${i}" aria-current="${i===cur}"><i>${i<cur?'✔':String(i+1).padStart(2,'0')}</i><span>${s.t}</span></button>`).join('');
    $('#bar').style.width=((cur+1)/STEPS.length*100)+'%';
    $('#ptxt').textContent=`Step ${cur+1} of ${STEPS.length}`;
    $('#prev').disabled=cur===0;$('#next').disabled=cur===STEPS.length-1;
    $('#play').textContent=playing?'⏸ Pause':(cur>0?'▶ Resume':'▶ Autoplay');
  }
  function render(){
    const s=STEPS[cur];
    $('#stitle').textContent=`Step ${String(cur+1).padStart(2,'0')} – ${s.t}`;
    const sc=$('#scene');sc.style.animation='none';void sc.offsetHeight;sc.style.animation='';
    sc.innerHTML=SCENES[cur]();
    $('#cap').innerHTML=`<div><h3>Simple Explanation</h3><p>${s.simple}</p></div><div><h3>Technical Explanation</h3><p>${s.tech}</p></div><div><h3>Real-World Scenario</h3><p>${s.real}</p></div><div><h3>Interview Preparation</h3><p><b>Q:</b> ${s.q}<br><b>A:</b> ${s.a}</p></div>`;
    const f=FOCUS[cur];
    document.querySelectorAll('#diagram .comp').forEach(g=>{const on=f.includes(g.dataset.id);g.classList.toggle('hl',on);g.classList.toggle('dim',f.length>0&&!on)});
    renderSide();
  }
  function go(i){cur=Math.max(0,Math.min(STEPS.length-1,i));render()}
  function stop(){playing=false;clearInterval(timer);renderSide()}
  function start(){playing=true;clearInterval(timer);timer=setInterval(()=>{if(cur<STEPS.length-1)go(cur+1);else stop()},5000);renderSide()}
  stepsEl.addEventListener('click',e=>{const b=e.target.closest('.st');if(b)go(+b.dataset.i)});
  $('#prev').onclick=()=>go(cur-1);$('#next').onclick=()=>go(cur+1);
  $('#play').onclick=()=>{if(playing)stop();else{if(cur===STEPS.length-1)go(0);start()}};
  $('#reset').onclick=()=>{stop();go(0)};
  const modal=$('#modal');
  function open(html){$('#mbody').innerHTML=html;modal.hidden=false;$('#mclose').focus()}
  function close(){modal.hidden=true;clearInterval(pt)}
  $('#mclose').onclick=close;modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  function info(id){const c=COMPONENTS.find(x=>x.id===id);open(`<h3>${c.name}</h3><dl><dt>Simple explanation</dt><dd>${c.simple}</dd><dt>Technical explanation</dt><dd>${c.tech}</dd><dt>Real-world example</dt><dd>${c.example}</dd><dt>Relevant AWS service</dt><dd>${c.service}</dd><dt>Interview question</dt><dd>${c.q}</dd></dl>`)}
  const dg=$('#diagram');dg.innerHTML=buildDiagram();
  dg.addEventListener('click',e=>{const g=e.target.closest('.comp');if(g)info(g.dataset.id)});
  dg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const g=e.target.closest('.comp');if(g){e.preventDefault();info(g.dataset.id)}}});
  function showSite(cat){$('#site').innerHTML=buildSite(cat)}
  function player(i){const m=MOVIES[i];open(`<h3>Now playing: ${m.t}</h3><div class="pl"><div><div style="font-size:48px">▶</div><b>${m.t}</b><br><small>Demo player – no real video</small></div></div><div class="pb"><i id="pbi"></i></div>`);let p=0;clearInterval(pt);pt=setInterval(()=>{p=(p+2)%101;const b=$('#pbi');if(b)b.style.width=p+'%'},200)}
  $('#site').addEventListener('click',e=>{
    const c=e.target.closest('[data-cat]');if(c){showSite(c.dataset.cat);return}
    const inf=e.target.closest('[data-info]');if(inf){const m=MOVIES[+inf.dataset.info];open(`<h3>${m.t} (${m.y})</h3><p>${m.d}</p>`);return}
    const m=e.target.closest('[data-m]');if(m)player(+m.dataset.m)});
  $('#site').addEventListener('keydown',e=>{if(e.key==='Enter'){const m=e.target.closest('.poster');if(m)player(+m.dataset.m)}});
  const root=document.documentElement;
  try{const t=localStorage.getItem('cm-theme');if(t)root.dataset.theme=t}catch(e){}
  $('#theme').onclick=()=>{const t=root.dataset.theme==='light'?'dark':'light';root.dataset.theme=t;try{localStorage.setItem('cm-theme',t)}catch(e){}};
  showSite('home');render();
})();
