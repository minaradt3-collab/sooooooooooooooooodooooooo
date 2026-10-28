// 🎵 SONG: put your audio file in the same folder, then write its name here ('' = no song)
const SONG_FILE='ssstik.io_1793146942257.mp3';
const song=SONG_FILE?new Audio(SONG_FILE):null;
if(song){song.loop=true;song.volume=0.6}

// ✏️ Edit your words here
const NAME="Sodo", LINE="Every light in this sky is for you.";
const $=id=>document.getElementById(id);
$('name').textContent=NAME;$('line').textContent=LINE;
const cv=$('c'),g=cv.getContext('2d');let W,H,D=Math.min(devicePixelRatio||1,2);
function size(){W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;g.setTransform(D,0,0,D,0,0)}
addEventListener('resize',size);size();

/* lantern sprite (drawn once) */
const spr=document.createElement('canvas');spr.width=128;spr.height=160;
(()=>{const s=spr.getContext('2d');
 let r=s.createRadialGradient(64,80,6,64,80,64);r.addColorStop(0,'rgba(255,130,60,.7)');r.addColorStop(1,'rgba(255,60,40,0)');
 s.fillStyle=r;s.fillRect(0,0,128,160);
 s.beginPath();s.moveTo(46,52);s.quadraticCurveTo(64,40,82,52);s.lineTo(90,108);s.quadraticCurveTo(64,118,38,108);s.closePath();
 let b=s.createLinearGradient(0,50,0,112);b.addColorStop(0,'#e0182d');b.addColorStop(.6,'#ff4a2e');b.addColorStop(1,'#ffb347');
 s.fillStyle=b;s.fill();s.strokeStyle='rgba(255,225,190,.55)';s.lineWidth=1.5;s.stroke();
 s.beginPath();s.moveTo(64,44);s.lineTo(64,114);s.moveTo(55,47);s.quadraticCurveTo(50,80,42,110);s.moveTo(73,47);s.quadraticCurveTo(78,80,86,110);s.stroke();
 s.fillStyle='#7a0f1f';s.fillRect(52,46,24,6);s.fillRect(42,108,44,5);
})();

/* world */
const stars=Array.from({length:110},()=>({x:Math.random(),y:Math.random()*.8,r:Math.random()*1.4+.3,p:Math.random()*6}));
const L=[];let phase=0,T0=0,nHeart=0;const NH=130;
const hx=()=>W/2, hy=()=>H*.4, hs=()=>Math.min(W,H)*.026;
function heartPt(i){const O=84,outer=i<O,j=outer?i:i-O,t=j/(outer?O:NH-O)*6.283,k=outer?1:.55,s=hs()*k,
 x=16*Math.pow(Math.sin(t),3),y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
 return[hx()+x*s,hy()-(y+2.5)*s]}
function towerSpot(){return{x:W*.5,y:H*.83,u:Math.min(W,H)*.02}}
function release(){
 if(phase)return;phase=1;enableShake();if(song)song.play().catch(()=>{});T0=performance.now();$('hint').classList.remove('on');$('hint').style.animation='none';$('hint').style.opacity=0;
 const b=towerSpot();L.push({x:b.x,y:b.y-b.u*19,vx:0,vy:-.7,s:1.15,p:0,free:1});
 navigator.vibrate&&navigator.vibrate(30);
 let n=0;setTimeout(()=>{const id=setInterval(()=>{if(nHeart>=NH){clearInterval(id);return}
  const q=heartPt(nHeart++);L.push({x:Math.random()*W,y:H+80,vx:0,vy:-2.5-Math.random()*2,s:.28+Math.random()*.25,p:Math.random()*6,tx:q[0],ty:q[1],heart:1});
 },55)},1800);
 setTimeout(()=>{$('name').classList.add('on');setTimeout(()=>$('line').classList.add('on'),1500);setTimeout(()=>$('cue').classList.add('on'),3000)},11000);
}
addEventListener('click',e=>{if(e.target.closest('main'))return;
 if(!phase){release();return}
 L.push({x:e.clientX,y:H+60,vx:(Math.random()-.5)*.4,vy:-(1+Math.random()),s:.45+Math.random()*.35,p:Math.random()*6,free:1});
 navigator.vibrate&&navigator.vibrate(12);
});

/* little tower on the hill, one glowing window */
function tower(t){
 const b=towerSpot(),u=b.u,x=b.x,y=b.y;
 g.save();g.translate(x,y);
 g.fillStyle='#0d0418';
 g.beginPath();g.moveTo(-u*2.6,u*.6);g.lineTo(-u*1.7,-u*10);g.lineTo(u*1.7,-u*10);g.lineTo(u*2.6,u*.6);g.fill();
 g.fillRect(-u*2.3,-u*10.8,u*4.6,u*.9);
 g.beginPath();g.moveTo(-u*2.1,-u*10.8);g.lineTo(0,-u*14);g.lineTo(u*2.1,-u*10.8);g.fill();
 const f=.8+.2*Math.sin(t/180);
 const r=g.createRadialGradient(0,-u*6,0,0,-u*6,u*5);r.addColorStop(0,`rgba(255,150,70,${.55*f})`);r.addColorStop(1,'rgba(255,90,40,0)');
 g.fillStyle=r;g.fillRect(-u*5,-u*11,u*10,u*10);
 g.fillStyle=`rgba(255,200,120,${f})`;g.beginPath();g.moveTo(-u*.55,-u*4.6);g.lineTo(-u*.55,-u*6.4);g.quadraticCurveTo(0,-u*7.4,u*.55,-u*6.4);g.lineTo(u*.55,-u*4.6);g.fill();
 g.restore();
 return{x:x,y:y-u*16};
}

/* loop */
function frame(t){
 let bg=g.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#07041a');bg.addColorStop(.65,'#2a0f3d');bg.addColorStop(1,'#5a1730');
 g.fillStyle=bg;g.fillRect(0,0,W,H);
 for(const s of stars){g.globalAlpha=.4+.6*Math.abs(Math.sin(t/900+s.p));g.fillStyle='#fff';g.beginPath();g.arc(s.x*W,s.y*H,s.r,0,6.283);g.fill()}
 g.globalAlpha=1;
 g.save();g.translate(0,-scrollY*.5);const beat=1+.022*Math.pow(Math.sin(t/330),6)*3;
 for(let i=L.length-1;i>=0;i--){const l=L[i];
  if(l.heart){
   const tx=hx()+(l.tx-hx())*beat+Math.sin(t/900+l.p)*5,ty=hy()+(l.ty-hy())*beat+Math.sin(t/700+l.p)*5;
   l.vx=(l.vx+(tx-l.x)*.006)*.93;l.vy=(l.vy+(ty-l.y)*.006)*.93;
  }else{l.vx+=Math.sin(t/800+l.p)*.004;l.vy+=-.003}
  l.x+=l.vx;l.y+=l.vy;
  if(l.free&&l.y<-120){L.splice(i,1);continue}
  g.globalAlpha=Math.min(1,.8+.2*Math.sin(t/160+l.p*3));
  const w=128*l.s,h=160*l.s;g.drawImage(spr,l.x-w/2,l.y-h/2,w,h);
 }
 g.globalAlpha=1;
 g.restore();g.save();g.translate(0,-scrollY);
 g.fillStyle='#14071f';g.beginPath();g.moveTo(0,H);g.lineTo(0,H*.86);g.quadraticCurveTo(W*.5,H*.8,W,H*.86);g.lineTo(W,H);g.fill();
 const p=tower(t);
 if(!phase){ // lantern held above the tower
  const lx=p.x,ly=p.y-towerSpot().u*3.2+Math.sin(t/600)*4;
  g.strokeStyle='rgba(255,230,200,.7)';g.lineWidth=1;g.beginPath();g.moveTo(p.x,towerSpot().y-towerSpot().u*14);g.lineTo(lx,ly+70);g.stroke();
  g.globalAlpha=.85+.15*Math.sin(t/160);const w=128*1.15,h=160*1.15;g.drawImage(spr,lx-w/2,ly-h/2,w,h);g.globalAlpha=1;
 }
 g.restore();
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
setTimeout(()=>$('hint').classList.add('on'),1200);

/* below the sky */
// ✏️ Edit the notes here
const NOTES=["I love seeing you well and happy.","You're the most beautiful girl my eyes have ever seen."];
const iconHTML=w=>'<img src="'+spr.toDataURL()+'" width="'+w+'" alt="">';
const cards=$('cards');
NOTES.forEach((n,i)=>{const d=document.createElement('div');d.className='card';d.style.transitionDelay=(i%2*.1)+'s';d.innerHTML=iconHTML(56)+'<span></span>';d.querySelector('span').textContent=n;cards.appendChild(d)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.35});
document.querySelectorAll('.card').forEach(c=>io.observe(c));
function wish(){const v=$('wishin').value.trim();if(!v)return;
 const d=document.createElement('div');d.className='wl';d.innerHTML='<img src="'+spr.toDataURL()+'" alt=""><span></span>';
 d.querySelector('span').textContent=v;d.style.left=(20+Math.random()*60)+'vw';document.body.appendChild(d);
 setTimeout(()=>d.remove(),10500);$('wishin').value='';navigator.vibrate&&navigator.vibrate(20)}
$('wishbtn').addEventListener('click',wish);
$('wishin').addEventListener('keydown',e=>{if(e.key==='Enter')wish()});
const SPR=spr.toDataURL(),GAME_END="You caught {n} lights. You're still my favorite one.",FLOWER_TXT="There. It opened just for you."; // ✏️ edit these two lines

/* flower that blooms with the scroll */
$('fcap').textContent=FLOWER_TXT;
$('petals').innerHTML=Array(7).fill('<path class="pt" d="M150 230C126 192 130 146 150 112C170 146 174 192 150 230Z" fill="url(#pg)" fill-opacity=".88"/>').join('');
const pts=[...document.querySelectorAll('.pt')],fl=$('flower');
function bloom(){const r=fl.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight))),e=p*p*(3-2*p);
 pts.forEach((el,i)=>el.setAttribute('transform',`translate(150 230) rotate(${(i-3)*e*27}) scale(${.55+.45*e}) translate(-150 -230)`));
 $('fglow').setAttribute('opacity',e);$('fcap').style.opacity=e>.9?1:0}
addEventListener('scroll',bloom,{passive:true});bloom();

/* catch-the-lanterns game */
let score=0,running=false;
function catchIt(d){score++;$('score').textContent='Caught '+score;navigator.vibrate&&navigator.vibrate(10);
 const m=getComputedStyle(d).transform;d.style.animation='none';d.style.transform=m;void d.offsetWidth;
 d.style.transition='transform .3s,opacity .3s';d.style.transform=m+' scale(1.7)';d.style.opacity=0;setTimeout(()=>d.remove(),320)}
function spawn(){const a=$('arena'),d=document.createElement('div');d.className='gl';d.style.left=(10+Math.random()*80)+'%';
 d.style.setProperty('--h',-(a.clientHeight+240)+'px');d.style.setProperty('--d',(3.2+Math.random()*2.6)+'s');
 d.innerHTML='<img src="'+SPR+'" alt="">';
 d.addEventListener('animationend',e=>{if(e.animationName==='rise')d.remove()});
 d.addEventListener('pointerdown',()=>{if(!running||d.dataset.x)return;d.dataset.x=1;catchIt(d)});
 a.appendChild(d)}
$('play').addEventListener('click',()=>{if(running)return;running=true;score=0;$('score').textContent='Caught 0';$('play').style.display='none';
 const sp=setInterval(spawn,560);setTimeout(()=>clearInterval(sp),22000);
 setTimeout(()=>{running=false;$('score').textContent=GAME_END.replace('{n}',score);$('play').textContent='Play again';$('play').style.display=''},26500)});

/* scratch card */
const SCRATCH_TXT="You're my favorite person."; // ✏️ edit
$('smsg').textContent=SCRATCH_TXT;
(function(){const c=$('sc'),x=c.getContext('2d'),r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);
 c.width=r.width*d;c.height=r.height*d;x.scale(d,d);
 const gr=x.createLinearGradient(0,0,r.width,r.height);gr.addColorStop(0,'#8e0f1f');gr.addColorStop(.5,'#e0182d');gr.addColorStop(1,'#ff7a4a');
 x.fillStyle=gr;x.fillRect(0,0,r.width,r.height);
 for(let i=0;i<160;i++){x.fillStyle=`rgba(255,230,200,${Math.random()*.6})`;x.fillRect(Math.random()*r.width,Math.random()*r.height,2,2)}
 x.fillStyle='rgba(255,233,207,.9)';x.font='italic 22px Fraunces,Georgia,serif';x.textAlign='center';x.fillText('scratch here',r.width/2,r.height/2+7);
 let down=false,done=false;
 function scr(e){if(!down||done)return;const b=c.getBoundingClientRect();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(e.clientX-b.left,e.clientY-b.top,26,0,6.283);x.fill()}
 c.addEventListener('pointerdown',e=>{down=true;c.setPointerCapture(e.pointerId);scr(e)});
 c.addEventListener('pointermove',scr);
 c.addEventListener('pointerup',()=>{down=false;if(done)return;
  const dt=x.getImageData(0,0,c.width,c.height).data;let n=0,tot=0;
  for(let i=3;i<dt.length;i+=64){tot++;if(dt[i]<128)n++}
  if(n/tot>.5){done=true;c.style.opacity=0;navigator.vibrate&&navigator.vibrate([20,40,20])}});
})();

/* keep the name locked to the middle of the heart, even while scrolling */
function par(){const y=scrollY*.5;$('name').style.top=innerHeight*.4+'px';$('name').style.transform='translateY(calc(-50% + '+y+'px))';$('line').style.transform='translateY('+y+'px)'}
addEventListener('scroll',par,{passive:true});addEventListener('resize',par);par();

/* shake the phone: it rains lanterns and hearts */
function rain(){for(let i=0;i<56;i++){const e=document.createElement('div');e.className='fall';e.style.left=Math.random()*96+'vw';
 e.style.setProperty('--d',(3+Math.random()*3.5)+'s');e.style.setProperty('--r',(Math.random()*160-80)+'deg');e.style.animationDelay=Math.random()*1.4+'s';
 if(i%2){const s=40+Math.random()*30;e.innerHTML='<img src="'+SPR+'" width="'+s+'" alt="">'}else{e.textContent='❤️';e.style.fontSize=(18+Math.random()*18)+'px'}
 document.body.appendChild(e);setTimeout(()=>e.remove(),9000)}
 navigator.vibrate&&navigator.vibrate([30,40,30,40,60])}
let lastShake=0;
function enableShake(){let px=0,py=0,pz=0;
 const go=()=>addEventListener('devicemotion',e=>{const a=e.accelerationIncludingGravity;if(!a)return;
  const x=a.x||0,y=a.y||0,z=a.z||0,d=Math.abs(x-px)+Math.abs(y-py)+Math.abs(z-pz);px=x;py=y;pz=z;
  if(d>28&&performance.now()-lastShake>5000){lastShake=performance.now();rain()}});
 if(typeof DeviceMotionEvent!=='undefined'&&typeof DeviceMotionEvent.requestPermission==='function'){DeviceMotionEvent.requestPermission().then(r=>{if(r==='granted')go()}).catch(()=>{})}else go()}

/* finale: lanterns explode, then gather into words */
const FINALE_TXT="Love you"; // ✏️ edit
(function(){
 const sec=$('finale'),c=$('fin'),x=c.getContext('2d');let W,H,D,F=[],on=false,t0=0,raf=0,formed=false,started=false;
 function size(){const r=sec.getBoundingClientRect();D=Math.min(devicePixelRatio||1,2);W=Math.round(r.width);H=Math.round(r.height);c.width=W*D;c.height=H*D;x.setTransform(D,0,0,D,0,0)}
 function targets(){
  const o=document.createElement('canvas');o.width=W;o.height=H;const g2=o.getContext('2d'),f=s=>`900 ${s}px system-ui,Arial,sans-serif`;
  let fs=Math.min(H*.3,W*.4);g2.font=f(fs);fs=fs*Math.min(1,(W*.86)/g2.measureText(FINALE_TXT).width);g2.font=f(fs);
  g2.textAlign='center';g2.textBaseline='middle';g2.fillStyle='#fff';g2.fillText(FINALE_TXT,W/2,H*.46);
  const d=g2.getImageData(0,0,W,H).data,st=Math.max(7,Math.round(fs/9)),out=[];
  for(let y=0;y<H;y+=st)for(let xx=0;xx<W;xx+=st)if(d[(y*W+xx)*4+3]>128)out.push([xx,y]);
  out.sort(()=>Math.random()-.5);
  F=out.slice(0,380).map(q=>({x:W/2,y:H*.46,vx:0,vy:0,tx:q[0],ty:q[1],s:.17+Math.random()*.05,p:Math.random()*6}));
 }
 function burst(){formed=false;$('top').classList.remove('on');t0=performance.now();
  for(const p of F){const a=Math.random()*6.283,s=5+Math.random()*13;p.x=W/2;p.y=H*.46;p.vx=Math.cos(a)*s;p.vy=Math.sin(a)*s-2}}
 function frame(t){
  x.clearRect(0,0,W,H);x.globalCompositeOperation='lighter';
  const age=t-t0,form=age>1400;
  for(const p of F){
   if(form){p.vx=(p.vx+(p.tx-p.x)*.022)*.88;p.vy=(p.vy+(p.ty-p.y)*.022)*.88}else{p.vx*=.965;p.vy=p.vy*.965+.04}
   p.x+=p.vx;p.y+=p.vy;
   x.globalAlpha=.75+.25*Math.sin(t/200+p.p*3);
   const w=128*p.s,h=160*p.s,sw=formed?Math.sin(t/700+p.p)*1.2:0;x.drawImage(spr,p.x+sw-w/2,p.y-h/2,w,h)}
  x.globalAlpha=1;
  if(!formed&&age>3600){formed=true;$('top').classList.add('on')}
  raf=on?requestAnimationFrame(frame):0}
 new IntersectionObserver(es=>es.forEach(e=>{on=e.isIntersecting;
  if(on){if(!started){started=true;size();targets();burst();navigator.vibrate&&navigator.vibrate([40,60,40])}
   if(!raf)raf=requestAnimationFrame(frame)}}),{threshold:.55}).observe(sec);
 c.addEventListener('click',()=>{if(started)burst()});
 addEventListener('resize',()=>{if(started){size();targets();burst()}});
})();

$('top').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
