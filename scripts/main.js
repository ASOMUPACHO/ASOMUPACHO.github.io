document.addEventListener('DOMContentLoaded', () => {
  iniciarBanner(document.getElementById('inicio'), BANNERS);

  // Año del pie de página
  document.getElementById('anio').textContent = new Date().getFullYear();

  // Menú móvil
  const btn = document.getElementById('menu-btn'), menu = document.getElementById('menu');
  const cerrar = () => { menu.classList.remove('abierto'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    btn.setAttribute('aria-expanded', String(abierto));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrar));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });

  // Galería
  if (typeof GALERIA !== 'undefined' && GALERIA.length) {
    const g = document.getElementById('galeria-grid');
    GALERIA.forEach(f => { const i = document.createElement('img'); i.src = f.src; i.alt = f.alt || ''; i.loading = 'lazy'; if (f.posicion) i.style.objectPosition = f.posicion; g.appendChild(i); });
    document.getElementById('galeria').hidden = false;
  }
  // Testimonios
  if (typeof TESTIMONIOS !== 'undefined' && TESTIMONIOS.length) {
    const g = document.getElementById('testimonios-grid');
    TESTIMONIOS.forEach(t => {
      const q = document.createElement('blockquote'); q.className = 'testimonio';
      const p = document.createElement('p'); p.textContent = `“${t.texto}”`;
      const c = document.createElement('cite'); c.textContent = t.autora || '';
      q.append(p, c); g.appendChild(q);
    });
    document.getElementById('testimonios').hidden = false;
  }

  // Resaltar la sección activa en el menú
  const links = [...menu.querySelectorAll('a')];
  const obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('activo', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => obs.observe(s));

  // Formulario: abre el correo con el mensaje listo
  document.getElementById('form-contacto').addEventListener('submit', e => {
    e.preventDefault();
    const n = document.getElementById('nombre').value.trim(), m = document.getElementById('mensaje').value.trim();
    const asunto = encodeURIComponent('Mensaje desde la página de ASOMUPACHO');
    const cuerpo = encodeURIComponent(`${m}\n\n— ${n}`);
    window.location.href = `mailto:asocorazonespacho@gmail.com?subject=${asunto}&body=${cuerpo}`;
  });
});
