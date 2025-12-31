# Guía de Imágenes - Milonga Empanadas

## 🎨 Estructura de Carpetas

```
public/images/
├── logos/
│   ├── logo-main.png          # Logo principal (navbar y menú)
│   ├── logo-dark.png          # Logo oscuro (reserva)
│   ├── logo-footer.png        # Logo para footer
│   └── empanada-icon.png      # Icono de empanada (decorativo)
├── backgrounds/
│   ├── hero-main.jpg          # Imagen principal del hero ✅
│   ├── artisanal.png          # Logo "ARTISANAL" overlay ✅
│   ├── order-online-bg.jpg    # Fondo Order Online con parallax ✅
│   ├── indoor.jpg             # Foto interior del local ✅
│   └── menu.jpg               # Imagen del menú completo ✅
├── features/
│   ├── horario.jpg            # Imagen de horarios ✅
│   ├── local.jpg              # Imagen del local ✅
│   └── delivery.jpg           # Imagen de delivery ✅
└── locations/
    └── fashion-valley.jpg     # Foto Fashion Valley ✅
```

## ✅ Imágenes Implementadas (TODAS)

### 1. Hero Component
**Archivo**: `src/components/Hero.jsx`
- ✅ **Fondo parallax**: `/images/backgrounds/hero-main.jpg` (scroll velocity 0.5x)
- ✅ **Logo ARTISANAL**: `/images/backgrounds/artisanal.png` con animación fadeInScale
- **Efectos**: Parallax suave + overlay gradient + animación de entrada

### 2. Features Component
**Archivo**: `src/components/Features.jsx`
- ✅ **Horarios**: `/images/features/horario.jpg`
- ✅ **Local**: `/images/features/local.jpg`
- ✅ **Delivery**: `/images/features/delivery.jpg`
- **Efectos**: Cards con imagen de fondo, overlay gradient, hover scale

### 3. OrderOnline Component
**Archivo**: `src/components/OrderOnline.jsx`
- ✅ **Fondo parallax**: `/images/backgrounds/order-online-bg.jpg` (scroll velocity 0.3x)
- **Efectos**: Parallax background + gradient overlay + text shadows

### 4. Menu Component
**Archivo**: `src/components/Menu.jsx`
- ✅ **Imagen del menú**: `/images/backgrounds/menu.jpg`
- **Efectos**: Hover shadow transition

### 5. Locations Component
**Archivo**: `src/components/Locations.jsx`
- ✅ **San Marcos**: `/images/backgrounds/indoor.jpg`
- ✅ **Fashion Valley**: `/images/locations/fashion-valley.jpg`
- **Efectos**: Cards con hover scale en imágenes

### 6. AboutUs Component
**Archivo**: `src/components/AboutUs.jsx`
- ✅ **Interior**: `/images/backgrounds/indoor.jpg`
- ✅ **Icono empanada**: `/images/logos/empanada-icon.png` (floating animation)
- **Efectos**: Hover scale + decorative blur elements + bounce animation

### 7. Navbar
**Archivo**: `src/components/Navbar.jsx`
- ✅ **Logo principal**: `/images/logos/logo-main.png`
- Usado en navbar central y sidebar menu

### 8. Footer
**Archivo**: `src/components/Footer.jsx`
- ✅ **Logo footer**: `/images/logos/logo-footer.png`

### 9. InstagramFeed
**Archivo**: `src/components/InstagramFeed.jsx`
- ✅ **6 Posts reales de Instagram** con links directos:
  - Post: `https://www.instagram.com/p/DQxWMMcEcm-/`
  - Reel: `https://www.instagram.com/reel/DO6vmqpEuMW/`
  - Post: `https://www.instagram.com/p/DJuvsXoBSdm/`
  - Post: `https://www.instagram.com/p/DJm9XxvhLiN/`
  - Post: `https://www.instagram.com/p/DIeuPu5zLiY/`
  - Post: `https://www.instagram.com/p/DIMnwyThmAf/`
- **Efectos**: Gradient placeholders estilo Instagram + hover scale arrow

## 🎯 Efectos y Animaciones Implementadas

### CSS Animations (en `src/index.css`)

```css
/* Fade In con movimiento vertical */
.fade-in {
  animation: fadeIn 1s ease-in;
}

/* Fade In con escala (usado en ARTISANAL) */
.animate-fade-in-scale {
  animation: fadeInScale 1.2s ease-out;
}

/* Bounce (usado en icono empanada) */
.animate-bounce {
  /* Tailwind built-in */
}
```

### JavaScript Effects

1. **Parallax Scroll**
   - Hero: velocidad 0.5x
   - OrderOnline: velocidad 0.3x con offset
   - useEffect + addEventListener con {passive: true}

2. **Hover Effects**
   - Scale on images (transform: scale(1.1))
   - Shadow transitions
   - Gradient overlays

## 📊 Resumen de Cambios

| Componente | Antes | Después | Mejoras |
|------------|-------|---------|---------|
| Hero | Unsplash genérico | Imagen real + ARTISANAL | ✅ Parallax + Logo overlay |
| Features | SVG icons | Imágenes reales | ✅ Visual cards con fotos |
| OrderOnline | Gradient estático | Parallax background | ✅ Efecto depth |
| Menu | Unsplash genérico | Menú real | ✅ Imagen auténtica |
| Locations | Unsplash genérico | Fotos reales | ✅ Fashion Valley + Indoor |
| AboutUs | Unsplash genérico | Indoor + icon | ✅ Floating empanada |
| Navbar/Footer | /logo.png | Logos organizados | ✅ Estructura clara |
| InstagramFeed | Unsplash genérico | Links reales IG | ✅ 6 posts/reels reales |

## 🚀 Performance

**Optimizaciones aplicadas:**
- ✅ `loading="lazy"` en todas las imágenes
- ✅ `willChange: 'transform'` en parallax
- ✅ `{passive: true}` en scroll listeners
- ✅ Imágenes locales (no external URLs)
- ✅ CSS transforms (GPU acceleration)

## 📝 Notas Técnicas

### Parallax Implementation
```jsx
const [scrollY, setScrollY] = useState(0)

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY)
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// En el style:
transform: `translateY(${scrollY * 0.5}px)`
```

### Image Overlay Pattern
```jsx
<div className="relative">
  <img src="..." className="..." />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
</div>
```

## 🎨 Imágenes de Reserva

Estas imágenes están descargadas pero disponibles para uso futuro:
- `/images/logos/logo-dark.png` - Para temas oscuros
- `/images/logos/empanada-icon.png` - Usado en AboutUs, disponible para otros componentes

## 📌 URLs Originales

Todas las imágenes fueron descargadas de:
- `https://milongaempanadas.com/wp-content/uploads/...`

Ahora están alojadas localmente en `/public/images/` para:
- ✅ Mejor performance (no external requests)
- ✅ Control total sobre las imágenes
- ✅ Offline support
- ✅ Optimización futura (compression, webp, etc.)

## ✨ Próximas Mejoras Posibles

1. **Image Optimization**: Convertir JPG a WebP para menor peso
2. **Responsive Images**: Múltiples tamaños con srcset
3. **Lazy Loading**: Intersection Observer personalizado
4. **Preload**: Critical images en `<head>`
5. **CDN**: Considerar CDN para imágenes en producción
