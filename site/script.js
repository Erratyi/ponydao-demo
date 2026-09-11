const buttons=[...document.querySelectorAll('[data-screen]')];
const screens=[...document.querySelectorAll('[data-view]')];

function show(name){
  screens.forEach(screen=>screen.classList.toggle('active',screen.dataset.view===name));
  buttons.forEach(button=>button.classList.toggle('active',button.dataset.screen===name));
  history.replaceState(null,'',`#${name}`);
  window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}

buttons.forEach(button=>button.addEventListener('click',()=>show(button.dataset.screen)));
document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.go)));

const initial=location.hash.slice(1);
if(screens.some(screen=>screen.dataset.view===initial))show(initial);
