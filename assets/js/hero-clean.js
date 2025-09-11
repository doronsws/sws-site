
(function(){
  function normalize(t){ return (t||"").replace(/\s+/g," ").trim(); }
  function overlap(a,b){ return !(b.right < a.left || b.left > a.right || b.bottom < a.top || b.top > a.bottom); }
  function hideDupes(sec){
    var h1 = sec.querySelector("h1"); if(!h1) return;
    var title = normalize(h1.textContent);
    var heroRect = sec.getBoundingClientRect();
    // inside hero
    sec.querySelectorAll("*").forEach(function(el){
      if(el === h1) return;
      var t = normalize(el.textContent);
      if(t && t === title){ el.style.display="none"; }
    });
    // around hero (siblings/nearby)
    var root = sec.parentElement || document.body;
    root.querySelectorAll("*").forEach(function(el){
      if(sec.contains(el) || el === h1) return;
      var t = normalize(el.textContent);
      if(!t || t !== title) return;
      try{
        var r = el.getBoundingClientRect();
        // hide if visually overlapping OR extremely large headline-like element
        var isBig = parseFloat(getComputedStyle(el).fontSize) >= 26;
        if(overlap(heroRect, r) || isBig){ el.style.display="none"; }
      }catch(e){}
    });
  }
  function cleanAll(){
    document.querySelectorAll(".service-hero").forEach(hideDupes);
  }
  // initial + delayed passes
  document.addEventListener("DOMContentLoaded", function(){
    cleanAll();
    setTimeout(cleanAll, 60);
    setTimeout(cleanAll, 180);
    setTimeout(cleanAll, 500);
    requestAnimationFrame(cleanAll);
  });
  // react to late injections
  var mo = new MutationObserver(function(){ cleanAll(); });
  mo.observe(document.documentElement, {childList:true, subtree:true});
})();
