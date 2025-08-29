/* extras.js - back to top, typing demo */
document.addEventListener('DOMContentLoaded', ()=>{
  const back = document.getElementById('backToTop');
  const yElem = document.getElementById('y');
  if(yElem) yElem.textContent = new Date().getFullYear();

  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400) back.style.display = 'block'; else back.style.display = 'none';
  });
  back.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // typing effect (simple)
  const nameEl = document.getElementById('typed-name');
  const text = nameEl ? nameEl.textContent.trim() : '';
  if(!nameEl || !text) return;
  nameEl.textContent = '';
  let i=0;
  const tid = setInterval(()=>{
    if(i>=text.length){ clearInterval(tid); return; }
    nameEl.textContent += text.charAt(i); i++;
  }, 45);
});