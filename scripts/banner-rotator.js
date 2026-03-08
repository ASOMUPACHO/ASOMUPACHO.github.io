// Configuración de banners institucionales con las imágenes que ya tienes
const banners = [
  {
    url: 'assets/images/banners/Día de la mujer.png',
    titulo: '8M · Día de la Mujer',
    descripcion: 'Mírate con amor. Mereces un amor que cuide, no que lastime.',
    link: '#nosotras'
  },
  {
    url: 'assets/images/banners/WhatsApp Image 2026-02-04 at 8.03.51 AM.jpeg',
    titulo: 'Mujeres Pachunas Tejiendo Esperanza',
    descripcion: 'Fortaleciendo nuestras tradiciones y creando redes de apoyo',
    link: '#proyectos'
  },
  {
    url: 'assets/images/banners/WhatsApp Image 2026-02-06 at 8.34.06 AM.jpeg',
    titulo: 'Huertas Comunitarias',
    descripcion: 'Cultivando alimentos sanos para nuestras familias',
    link: '#huertas'
  },
  {
    url: 'assets/images/banners/WhatsApp Image 2026-02-19 at 5.35.02 PM.jpeg',
    titulo: 'Encuentros de Sororidad',
    descripcion: 'Compartiendo saberes y fortaleciendo nuestra comunidad',
    link: '#encuentros'
  },
  {
    url: 'assets/images/banners/WhatsApp Image 2026-02-26 at 2.49.33 PM.jpeg',
    titulo: 'Talleres de Emprendimiento',
    descripcion: 'Desarrollando habilidades para nuestra autonomía económica',
    link: '#emprendimiento'
  },
  {
    url: 'assets/images/banners/WhatsApp Image 2026-03-03 at 9.00.06 AM.jpeg',
    titulo: 'Mujeres que Inspiran',
    descripcion: 'Reconociendo la fuerza y el valor de cada mujer pachuna',
    link: '#testimonios'
  }
];

// Configuración del rotador
const config = {
  intervalo: 5000, // 5 segundos entre cada banner
  autoInicio: true,
  pausaOnHover: true,
  mostrarIndicadores: true,
  mostrarControles: true,
  efecto: 'fade' // Puede ser 'fade' o 'slide'
};

// Función para inicializar el rotador
function initBannerRotator(containerId, banners, config) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Contenedor no encontrado:', containerId);
    return;
  }

  let indiceActual = 0;
  let intervaloRotador;
  
  // Crear estructura del banner
  container.innerHTML = `
    <div class="banner-rotator">
      <div class="banner-slides"></div>
      ${config.mostrarIndicadores ? '<div class="banner-indicadores"></div>' : ''}
      ${config.mostrarControles ? `
        <button class="banner-control prev" aria-label="Anterior">❮</button>
        <button class="banner-control next" aria-label="Siguiente">❯</button>
      ` : ''}
    </div>
  `;

  const slidesContainer = container.querySelector('.banner-slides');
  
  // Crear slides para cada banner
  banners.forEach((banner, index) => {
    const slide = document.createElement('div');
    slide.className = `banner-slide ${index === 0 ? 'active' : ''}`;
    
    // Determinar descripción alternativa si no hay
    const descripcion = banner.descripcion || 'ASOMUPACHO - Mujeres Pachunas con Corazones Generosos';
    
    slide.innerHTML = `
      <img src="${banner.url}" alt="${banner.titulo}" 
           onerror="this.src='https://via.placeholder.com/1200x400?text=ASOMUPACHO'">
      <div class="banner-caption">
        <h2>${banner.titulo}</h2>
        <p>${descripcion}</p>
        ${banner.link ? '<a href="' + banner.link + '" class="banner-btn">Conocer más</a>' : ''}
      </div>
    `;
    slidesContainer.appendChild(slide);
  });

  // Crear indicadores (puntos de navegación)
  if (config.mostrarIndicadores) {
    const indicadores = container.querySelector('.banner-indicadores');
    banners.forEach((_, index) => {
      const indicador = document.createElement('span');
      indicador.className = `indicador ${index === 0 ? 'active' : ''}`;
      indicador.setAttribute('aria-label', `Ir al banner ${index + 1}`);
      indicador.addEventListener('click', () => cambiarSlide(index));
      indicadores.appendChild(indicador);
    });
  }

  // Función para cambiar de slide
  function cambiarSlide(nuevoIndice) {
    const slides = container.querySelectorAll('.banner-slide');
    const indicadores = container.querySelectorAll('.indicador');
    
    // Validar índice
    if (nuevoIndice < 0) nuevoIndice = banners.length - 1;
    if (nuevoIndice >= banners.length) nuevoIndice = 0;
    
    // Quitar clase active del slide actual
    slides[indiceActual].classList.remove('active');
    // Agregar clase active al nuevo slide
    slides[nuevoIndice].classList.add('active');
    
    // Actualizar indicadores
    if (indicadores.length) {
      indicadores[indiceActual].classList.remove('active');
      indicadores[nuevoIndice].classList.add('active');
    }
    
    indiceActual = nuevoIndice;
  }

  // Configurar controles de navegación
  if (config.mostrarControles) {
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        cambiarSlide(indiceActual - 1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        cambiarSlide(indiceActual + 1);
      });
    }
  }

  // Auto rotación
  if (config.autoInicio) {
    intervaloRotador = setInterval(() => {
      cambiarSlide(indiceActual + 1);
    }, config.intervalo);
  }

  // Pausa en hover
  if (config.pausaOnHover) {
    container.addEventListener('mouseenter', () => {
      clearInterval(intervaloRotador);
    });
    
    container.addEventListener('mouseleave', () => {
      if (config.autoInicio) {
        intervaloRotador = setInterval(() => {
          cambiarSlide(indiceActual + 1);
        }, config.intervalo);
      }
    });
  }

  // Soporte para navegación táctil (swipe)
  let touchStartX = 0;
  let touchEndX = 0;
  
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe izquierda -> siguiente
      cambiarSlide(indiceActual + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe derecha -> anterior
      cambiarSlide(indiceActual - 1);
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Verificar que el contenedor existe
  const bannerContainer = document.getElementById('banner-container');
  if (bannerContainer) {
    initBannerRotator('banner-container', banners, config);
  } else {
    console.warn('No se encontró el contenedor con id "banner-container". Creándolo automáticamente...');
    // Crear el contenedor si no existe
    const mainContent = document.querySelector('main') || document.body;
    const newContainer = document.createElement('section');
    newContainer.id = 'banner-container';
    newContainer.className = 'banner-container';
    mainContent.insertBefore(newContainer, mainContent.firstChild);
    initBannerRotator('banner-container', banners, config);
  }
});
