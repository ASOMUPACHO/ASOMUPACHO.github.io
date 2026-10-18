// Carrusel de banners. Usa BANNERS de scripts/contenido.js
function iniciarBanner(el, banners, intervalo = 6000) {
  if (!el || !banners.length) return;
  let actual = 0, timer = null;

  el.innerHTML = `<div class="slides"></div>
    <button class="ctrl prev" aria-label="Anterior">←</button>
    <button class="ctrl next" aria-label="Siguiente">→</button>
    <div class="puntos" role="tablist"></div>`;
  const cont = el.querySelector('.slides');
  const puntos = el.querySelector('.puntos');

  banners.forEach((b, i) => {
    const s = document.createElement('div');
    s.className = 'slide sin-foto' + (i === 0 ? ' active' : '');
    s.setAttribute('role', 'group');
    s.setAttribute('aria-label', `${i + 1} de ${banners.length}`);
    const fondo = document.createElement('div');
    fondo.className = 'fondo';
    s.appendChild(fondo);
    if (b.foto) { // solo se usa la foto si realmente carga
      const img = new Image();
      img.onload = () => { fondo.style.backgroundImage = `url("${b.foto}")`; if (b.posicion) fondo.style.backgroundPosition = b.posicion; s.classList.remove('sin-foto'); s.classList.add('con-foto'); };
      img.src = b.foto;
    }
    const velo = document.createElement('div'); velo.className = 'velo'; s.appendChild(velo);
    const t = document.createElement('div'); t.className = 'texto';
    const h = document.createElement('h2'); h.textContent = b.titulo;
    const p = document.createElement('p'); p.textContent = b.texto;
    t.append(h, p);
    if (b.enlace) { const a = document.createElement('a'); a.className = 'btn'; a.href = b.enlace; a.textContent = b.boton || 'Conocer más'; t.appendChild(a); }
    s.appendChild(t);
    cont.appendChild(s);

    const d = document.createElement('button');
    d.className = 'punto' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Ir al banner ${i + 1}`);
    d.addEventListener('click', () => { ir(i); reiniciar(); });
    puntos.appendChild(d);
  });

  const slides = cont.querySelectorAll('.slide');
  const dots = puntos.querySelectorAll('.punto');
  function ir(n) {
    n = (n + banners.length) % banners.length;
    slides[actual].classList.remove('active'); dots[actual].classList.remove('active');
    slides[n].classList.add('active'); dots[n].classList.add('active');
    actual = n;
  }
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function iniciar() { if (!reducido && banners.length > 1) timer = setInterval(() => ir(actual + 1), intervalo); }
  function parar() { clearInterval(timer); }
  function reiniciar() { parar(); iniciar(); }

  el.querySelector('.prev').addEventListener('click', () => { ir(actual - 1); reiniciar(); });
  el.querySelector('.next').addEventListener('click', () => { ir(actual + 1); reiniciar(); });
  el.addEventListener('mouseenter', parar);
  el.addEventListener('mouseleave', iniciar);
  el.addEventListener('focusin', parar);
  el.addEventListener('focusout', iniciar);

  let x0 = 0;
  el.addEventListener('touchstart', e => { x0 = e.changedTouches[0].screenX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - x0;
    if (Math.abs(dx) > 50) { ir(actual + (dx < 0 ? 1 : -1)); reiniciar(); }
  }, { passive: true });

  if (banners.length < 2) el.querySelectorAll('.ctrl,.puntos').forEach(n => n.hidden = true);
  iniciar();
}
