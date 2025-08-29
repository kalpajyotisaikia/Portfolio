/* theme.js - dark/light mode toggle */
(function(){
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const KEY = 'ks_theme';

  function applyTheme(t){
    if(t==='light'){
      root.style.setProperty('--bg','#f7fafc');
      root.style.setProperty('--card','#ffffff');
      root.style.setProperty('--text','#0b1220');
      root.style.setProperty('--muted','#475569');
      btn.textContent = '☀️';
    } else {
      root.style.setProperty('--bg','#0b1220');
      root.style.setProperty('--card','#0f172a');
      root.style.setProperty('--text','#e2e8f0');
      root.style.setProperty('--muted','#94a3b8');
      btn.textContent = '🌙';
    }
  }

  const saved = localStorage.getItem(KEY) || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', ()=>{
    const current = localStorage.getItem(KEY) || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(KEY, next);
    applyTheme(next);
  });
})();