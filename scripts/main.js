/* main.js - reveal, lightbox */
document.addEventListener('DOMContentLoaded', ()=>{
  // Intersection reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold: .18});
  document.querySelectorAll('.card').forEach(c => obs.observe(c));

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const closeBtn = lb.querySelector('.close');
  document.querySelectorAll('[data-full]').forEach(img => {
    img.addEventListener('click', ()=>{
      lbImg.src = img.dataset.full;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden','false');
    });
  });
  closeBtn.addEventListener('click', ()=>{ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); });
  lb.addEventListener('click', (e)=>{ if(e.target===lb) { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); } });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); } });
});