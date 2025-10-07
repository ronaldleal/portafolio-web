# 🌟 Mi Portafolio Web

Un portafolio web moderno y responsivo desarrollado con Angular 18, diseñado para mostrar proyectos, habilidades y experiencia profesional de manera elegante y accesible.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con animaciones suaves
- 📱 **Completamente Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- ⚡ **Alto Rendimiento**: Built con Angular 18 y las mejores prácticas de optimización
- 🔍 **SEO Optimizado**: Server-Side Rendering (SSR) habilitado para mejor SEO
- 🎯 **Navegación Intuitiva**: Menú de navegación suave con scroll automático
- 🌈 **Animaciones Elegantes**: Transiciones y efectos CSS modernos

## 🏗️ Secciones Incluidas

- **Header/Navbar**: Navegación fija con enlaces a todas las secciones
- **Hero**: Presentación principal con llamada a la acción
- **Sobre Mí**: Información personal y estadísticas profesionales
- **Proyectos**: Galería de proyectos con tecnologías utilizadas
- **Habilidades**: Showcase de tecnologías y herramientas
- **Experiencia**: Timeline de experiencia laboral
- **Contacto**: Formulario de contacto e información de contacto
- **Footer**: Enlaces sociales y información adicional

## 🚀 Tecnologías Utilizadas

- **Angular 18**: Framework principal
- **TypeScript**: Lenguaje de programación
- **SCSS**: Preprocesador CSS para estilos avanzados
- **Angular SSR**: Para optimización SEO
- **CSS Grid & Flexbox**: Para layouts responsivos
- **Animaciones CSS**: Para efectos visuales

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js (v18 o superior)
- Angular CLI (`npm install -g @angular/cli`)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/portafolio-web.git
   cd portafolio-web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm start
   # o
   ng serve
   ```
   Navega a `http://localhost:4200/`

4. **Compilar para producción**
   ```bash
   npm run build
   # o
   ng build
   ```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Componente de navegación
│   │   ├── hero/            # Sección principal
│   │   ├── about/           # Sección sobre mí
│   │   ├── projects/        # Galería de proyectos
│   │   ├── skills/          # Habilidades técnicas
│   │   ├── experience/      # Experiencia laboral
│   │   ├── contact/         # Formulario de contacto
│   │   └── footer/          # Pie de página
│   ├── app.component.*      # Componente principal
│   └── app.config.ts        # Configuración de la app
├── assets/                  # Recursos estáticos
├── styles.scss             # Estilos globales
└── index.html              # Archivo HTML principal
```

## 🎨 Personalización

### Contenido Personal
1. **Información Personal**: Edita los componentes en `src/app/components/` para agregar tu información
2. **Imágenes**: Coloca tus imágenes en `src/assets/` y actualiza las rutas
3. **Colores**: Modifica las variables CSS en `src/styles.scss`
4. **Proyectos**: Actualiza el componente `projects` con tus proyectos reales

### Estilos
- Los estilos están organizados por componente
- Variables globales en `src/styles.scss`
- Cada componente tiene su propio archivo `.scss`

## 🚀 Despliegue

### GitHub Pages

1. **Instalar gh-pages**
   ```bash
   npm install --save-dev angular-cli-ghpages
   ```

2. **Build y deploy**
   ```bash
   ng build --output-path docs --base-href "/portafolio-web/"
   npx angular-cli-ghpages --dir=docs
   ```

### Otras plataformas
- **Netlify**: Conecta tu repositorio y usa `npm run build`
- **Vercel**: Importa el proyecto y despliega automáticamente
- **Firebase Hosting**: Usa `ng deploy`

## 📊 Rendimiento

- ⚡ Lazy loading de componentes
- 🗜️ Código optimizado y minificado
- 📱 Imágenes responsivas
- 🔄 Service workers para cache (opcional)

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este portafolio:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 📞 Contacto

**Tu Nombre** - [tu.email@ejemplo.com](mailto:tu.email@ejemplo.com)

Enlace del Proyecto: [https://github.com/tu-usuario/portafolio-web](https://github.com/tu-usuario/portafolio-web)

---

⭐ **¡No olvides darle una estrella al proyecto si te ha sido útil!** ⭐