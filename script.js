// If video fails to load, hide it and show image fallback
document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.hero__bg');
  const imgFallback = document.querySelector('.hero__img');
  const onFail = () => { if(video) video.style.display='none'; if(imgFallback) imgFallback.style.display='block'; };
  if (video) {
    video.addEventListener('error', onFail);
    // If video can't autoplay (mobile policies), show image fallback
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(onFail);
    }
  }
});
// Handle contact form submit to Formspree without page reload
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if(form){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const endpoint = form.getAttribute('action'); // replace with your Formspree endpoint
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
        if (res.ok) {
          form.reset();
          success.classList.remove('d-none');
        } else {
          alert('הייתה בעיה בשליחה. נסה שוב או צור קשר בטלפון/וואטסאפ.');
        }
      } catch (err) {
        alert('הייתה בעיה בשליחה. בדוק חיבור או נסה שוב.');
      }
    });
  }
});


// Handle top search to filter services
function handleTopSearch(form){
  const q = (form.querySelector('#topSearch')?.value || '').trim();
  if(document.getElementById('services-cards')){
    filterCardsByQuery(q);
    document.getElementById('services-cards').scrollIntoView({behavior:'smooth'});
    return false;
  } else {
    window.location.href = form.getAttribute('action') + (q? ('?q='+encodeURIComponent(q)):'') + '#services-cards';
    return false;
  }
}
function norm(s){ return (s||'').toLowerCase(); }
function filterCardsByQuery(q){
  const grid = document.querySelector('#services-cards .row');
  if(!grid) return;
  const cols = Array.from(grid.children);
  let shown=0; const n = norm(q);
  cols.forEach(col=>{ const match = !n || norm(col.textContent).includes(n); col.style.display = match? '' : 'none'; if(match) shown++; });
  let hint = document.getElementById('noResultsHint');
  if(!hint){ hint=document.createElement('div'); hint.id='noResultsHint'; hint.className='text-center text-muted py-4'; hint.style.display='none'; hint.textContent='לא נמצאו תוצאות.'; grid.parentElement.appendChild(hint); }
  hint.style.display = (shown===0)? '' : 'none';
}
document.addEventListener('DOMContentLoaded', ()=>{
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') || '';
  if(q){ const t=document.getElementById('topSearch'); if(t) t.value=q; filterCardsByQuery(q); }
});
