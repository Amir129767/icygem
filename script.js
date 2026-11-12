(() => {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    stars = Array.from({length: Math.min(180, Math.floor(window.innerWidth/6))}, () => ({
      x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
      r: Math.random()*1.2+.2, a: Math.random()*.7+.15, speed: Math.random()*.006+.002
    }));
  }
  function draw(t) {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    stars.forEach(s => {
      const alpha = s.a * (.65 + .35*Math.sin(t*s.speed));
      ctx.fillStyle = `rgba(205,225,255,${alpha})`;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  resize(); requestAnimationFrame(draw); window.addEventListener('resize',resize);
  const links = {
    soundcloud: {title:'SOUNDCLOUD', text:'Listen to ICYGEM on SoundCloud.', url:'https://on.soundcloud.com/maDo3tNgAXLrQLBBHP'},
    youtube: {title:'YOUTUBE', text:'Discover ICYGEM on YouTube.', url:'https://youtube.com/@icygemm?si=W-091MKSS5qzBIuQ'}
  };
  const panel = document.getElementById('linkPanel');
  document.querySelectorAll('[data-platform]').forEach(btn => btn.addEventListener('click', () => {
    const item = links[btn.dataset.platform];
    document.getElementById('panelTitle').textContent = item.title;
    document.getElementById('panelText').textContent = item.text;
    const link = document.getElementById('panelLink'); link.href = item.url;
    link.textContent = 'OPEN ' + item.title + ' ↗';
    panel.classList.add('show');
    panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  }));
  document.getElementById('panelClose').addEventListener('click', () => panel.classList.remove('show'));
  document.getElementById('year').textContent = new Date().getFullYear();
})();
