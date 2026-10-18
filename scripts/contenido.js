// ============================================================
//  CONTENIDO EDITABLE DEL SITIO (no hace falta tocar el HTML)
// ============================================================

// BANNERS: si la foto no existe, se muestra un fondo oscuro automáticamente.
// Usa fotos horizontales SIN texto escrito encima (el título se pone solo; la foto se oscurece para que el texto blanco se lea; mejor si es una foto oscura y sobria).
// "posicion" (opcional) elige qué parte de la foto se ve, ej. '50% 30%' (horizontal vertical).
// Para agregar una foto: súbela a assets/images/banners/ y escribe su nombre en "foto".
const BANNERS = [
  { foto: 'assets/images/banners/banner1-web.jpg', posicion: '50% 42%',
    titulo: 'Mujeres Pachunas con Corazones Generosos',
    texto: 'Una asociación de mujeres rurales de Pacho, Cundinamarca.',
    enlace: '#nosotras', boton: 'Conócenos' },
  { foto: 'assets/images/banners/banner3-web.jpg', posicion: '50% 75%',
    titulo: 'Mujeres Pachunas tejiendo esperanza',
    texto: 'Fortalecemos nuestras tradiciones y creamos redes de apoyo.',
    enlace: '#proyectos', boton: 'Ver proyectos' },
  { foto: 'assets/images/banners/banner2-web.jpg', posicion: '50% 40%',
    titulo: 'Huertas comunitarias',
    texto: 'Cultivamos alimentos sanos para nuestras familias.',
    enlace: '#metodologia', boton: 'Nuestra metodología' },
  { foto: 'assets/images/banners/banner4-web.jpg', posicion: '55% 40%',
    titulo: 'Emprendimiento y liderazgo',
    texto: 'Desarrollamos habilidades para nuestra autonomía económica.',
    enlace: '#impacto', boton: 'Ver impacto' }
];

// GALERÍA: lista de fotos (si está vacía, la sección no aparece).
// Ejemplo: { src: 'assets/images/proyectos/huerta1.jpg', alt: 'Huerta comunitaria', posicion: '50% 30%' }
const GALERIA = [
  { src: 'assets/images/testimonios/2.jpeg',
    alt: 'Dos mujeres sonríen y muestran sobres decorados hechos a mano' },
  { src: 'assets/images/testimonios/3.jpeg', posicion: '50% 25%',
    alt: 'Dos mujeres muestran sobres de papel decorados con un pequeño detalle rosado' },
  { src: 'assets/images/testimonios/1.jpeg',
    alt: 'Tres jóvenes sentadas en una banca revisan juntas sobres y papeles; una sostiene una guitarra' },
  { src: 'assets/images/proyectos/huerta1-web.jpg',
    alt: 'Dos mujeres sostienen con las manos granos de café rojos entre las plantas de un cultivo' }
];

// TESTIMONIOS: (si está vacía, la sección no aparece).
// Ejemplo: { texto: 'Aquí aprendí a creer en mí.', autora: 'Nombre, vereda' }
const TESTIMONIOS = [];
