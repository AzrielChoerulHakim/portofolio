const body=document.body;
const ring=document.querySelector('.cursor-ring');
const dot=document.querySelector('.cursor-dot');
const progress=document.querySelector('.progress');

window.addEventListener('pointermove',e=>{
  document.documentElement.style.setProperty('--mx',((e.clientX/window.innerWidth)-.5)*35+'px');
  document.documentElement.style.setProperty('--my',((e.clientY/window.innerHeight)-.5)*35+'px');
  if(ring){ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px'}
  if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}
});

document.querySelectorAll('[data-magnetic]').forEach(el=>{
  el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect(), x=e.clientX-(r.left+r.width/2), y=e.clientY-(r.top+r.height/2);
    el.style.transform=`translate(${x*.16}px,${y*.16}px)`;
  });
  el.addEventListener('pointerleave',()=>el.style.transform='');
});

document.querySelectorAll('a,.discipline').forEach(el=>{
  el.addEventListener('pointerenter',()=>{ if(ring){ring.style.width='58px';ring.style.height='58px'} });
  el.addEventListener('pointerleave',()=>{ if(ring){ring.style.width='38px';ring.style.height='38px'} });
});

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')})
},{threshold:.18});
document.querySelectorAll('.hero-content').forEach(el=>observer.observe(el));

const caption=document.getElementById('discipline-caption');
const texts={
 law:'Researching the space between rules, institutions, power and human behavior.',
 writing:'Turning observations into arguments, essays and stories worth revisiting.',
 business:'Exploring how ideas become products, brands, incentives and economic systems.',
 digital:'Building interfaces where technology becomes an instrument of expression.',
 culture:'Looking at memory, behavior, symbols and the systems people build around them.'
};
document.querySelectorAll('.discipline').forEach(item=>{
 item.addEventListener('mouseenter',()=>{
   document.querySelectorAll('.discipline').forEach(x=>x.classList.remove('active'));
   item.classList.add('active'); body.className='theme-'+item.dataset.theme; caption.textContent=texts[item.dataset.theme];
 })
});

window.addEventListener('scroll',()=>{
 const max=document.documentElement.scrollHeight-window.innerHeight;
 progress.style.width=(window.scrollY/max*100)+'%';
});

const revealGroups=['.statement-wrap','.discipline-list','.discipline-caption','.work-head','.project','.archive-layout','.ideas-top','.idea-grid article','.about-grid','.contact-inner'];
revealGroups.forEach(sel=>document.querySelectorAll(sel).forEach((el,i)=>{
 el.classList.add('reveal');
 el.style.transitionDelay=Math.min(i*70,350)+'ms';
 observer.observe(el);
}));

// Tiny visual heartbeat: cards lift into place as they enter.
const cards=document.querySelectorAll('.project,.idea-grid article,.timeline-item');
const cardObserver=new IntersectionObserver(entries=>{
 entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('in-view');cardObserver.unobserve(target)}})
},{threshold:.1});
cards.forEach(c=>cardObserver.observe(c));
