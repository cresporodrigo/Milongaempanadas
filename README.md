# Milonga Empanadas Website

A modern, responsive website for an authentic Argentine empanadas restaurant built with React, Vite, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach ensuring perfect display on all devices
- **Smooth Scrolling**: Seamless navigation between sections
- **Dynamic Navbar**: Transparent navbar that becomes solid on scroll with hamburger menu for mobile
- **Performance Optimized**: Fast loading with lazy-loaded images and code splitting
- **SEO Ready**: Basic meta tags included for search engine optimization
- **Modern Stack**: Built with React 18, Vite, and Tailwind CSS 3

## Tech Stack

- **React 18.3.1**: UI library
- **Vite 6.0**: Build tool and dev server
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **React Scroll 1.9**: Smooth scrolling navigation

## Getting Started

### Prerequisites

- Node.js 16+ and npm installed on your machine

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Empanadas
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Empanadas/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── AboutUs.jsx
│   │   ├── OrderOnline.jsx
│   │   ├── Menu.jsx
│   │   ├── Features.jsx
│   │   ├── Locations.jsx
│   │   ├── InstagramFeed.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## Sections

1. **Hero Section**: Full-height banner with call-to-action
2. **About Us**: Restaurant history and philosophy
3. **Order Online**: Highlighted ordering section
4. **Menu**: Complete menu with pricing
5. **Features**: Three-column feature highlights
6. **Locations**: Two location cards with hours and directions
7. **Instagram Feed**: 6-image grid from Instagram
8. **Footer**: Contact information and social links

## Customization

### Colors

The color palette is based on the Milonga logo (turquoise/teal). Edit `tailwind.config.js` to customize:

```js
colors: {
  accent: '#1BA9A9',      // Main turquoise (from logo)
  teal: {
    500: '#1BA9A9',       // Primary turquoise
    600: '#138A8A',       // Darker turquoise
    400: '#4DD4D4'        // Lighter turquoise
  },
  cream: '#FFF9F0',       // Warm cream background
  footer: '#1A1A1A'       // Footer background
}
```

### Content

- Update images in each component (currently using Unsplash placeholders)
- Modify text content in component files
- Update location details in `Locations.jsx`
- Change menu items and prices in `Menu.jsx`

### Google Fonts

The project uses Playfair Display (serif) and Inter (sans-serif). To change fonts, update the link in `index.html` and the font families in `tailwind.config.js`.

## Performance Optimization

- Images use lazy loading (`loading="lazy"`)
- Code splitting configured in Vite
- Tailwind CSS purges unused styles in production
- Smooth scroll behavior with CSS

## License

All Rights Reserved © 2025 Milonga Empanadas

## Contact

For questions or support, contact info@milongaempanadas.com
