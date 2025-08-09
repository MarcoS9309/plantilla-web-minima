# Carpeta de Imágenes

Esta carpeta contiene todas las imágenes utilizadas en el sitio web.

## Estructura Recomendada

```
assets/img/
├── proyecto1.jpg          # Imagen del primer proyecto del portafolio
├── proyecto2.jpg          # Imagen del segundo proyecto del portafolio
├── proyecto3.jpg          # Imagen del tercer proyecto del portafolio
├── logo.png              # Logo del sitio (opcional)
├── hero-bg.jpg           # Imagen de fondo para la sección hero (opcional)
└── avatars/              # Carpeta para imágenes de perfil
    └── perfil.jpg        # Imagen de perfil personal
```

## Recomendaciones para Imágenes

### Formatos Optimizados
- **WebP**: Para la web moderna (mejor compresión)
- **JPEG**: Para fotografías con muchos colores
- **PNG**: Para imágenes con transparencia o pocos colores
- **SVG**: Para iconos y gráficos vectoriales

### Tamaños Recomendados
- **Proyectos de Portafolio**: 800x600px o 1200x900px
- **Imagen de Perfil**: 400x400px (cuadrada)
- **Logos**: 200x60px o similar (proporción 3:1)
- **Fondos**: 1920x1080px para pantallas grandes

### Optimización
- Comprimir las imágenes antes de subirlas
- Usar herramientas como TinyPNG, ImageOptim o Squoosh
- Considerar múltiples tamaños para responsive images

## Imágenes Placeholder

Mientras desarrollas, puedes usar servicios de imágenes placeholder:

- `https://picsum.photos/800/600` - Imágenes aleatorias
- `https://via.placeholder.com/800x600` - Placeholders simples
- `https://unsplash.it/800/600` - Imágenes de Unsplash

## Uso en HTML

```html
<!-- Imagen simple -->
<img src="./assets/img/proyecto1.jpg" alt="Descripción del proyecto" loading="lazy">

<!-- Imagen responsive -->
<img 
    src="./assets/img/proyecto1.jpg" 
    srcset="./assets/img/proyecto1-400w.jpg 400w, 
            ./assets/img/proyecto1-800w.jpg 800w"
    sizes="(max-width: 768px) 400px, 800px"
    alt="Descripción del proyecto" 
    loading="lazy">
```

## Notas Importantes

- Todas las rutas deben ser relativas (`./assets/img/`)
- Siempre incluir atributo `alt` descriptivo
- Usar `loading="lazy"` para imágenes no críticas
- Nombrar archivos de forma descriptiva y consistente