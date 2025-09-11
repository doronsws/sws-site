
(function(){
  function countUp(el){
    var target = parseInt(el.getAttribute('data-target') || '0', 10);
    var now = 0;
    var dur = 1200; // ms
    var steps = 60;
    var inc = Math.max(1, Math.ceil(target/steps));
    var start = null;
    function step(ts){
      if(!start) start = ts;
      var p = (ts - start)/dur;
      now = Math.min(target, Math.floor(p*target));
      if(now < target) {
        el.textContent = now.toLocaleString('he-IL');
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('he-IL');
      }
    }
    requestAnimationFrame(step);
  }
  var done=false;
  var band = document.getElementById('kpi-band');
  if(!band) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting && !done){
        done = true;
        band.querySelectorAll('.kpi-number').forEach(countUp);
        obs.disconnect();
      }
    });
  }, {threshold: 0.3});
  obs.observe(band);
})();
