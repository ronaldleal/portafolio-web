import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  initScrollAnimations() {
    // Solo ejecutar en el browser (no en SSR)
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    // Crear el Intersection Observer para detectar elementos en viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agregar clase de animación cuando el elemento es visible
          this.renderer.addClass(entry.target, 'animate-in');

          // Aplicar delay si está definido
          const delay = entry.target.getAttribute('data-delay');
          if (delay) {
            this.renderer.addClass(entry.target, `animate-delay-${delay}`);
          }

          // Opcional: dejar de observar el elemento una vez animado
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // Activar cuando el 10% del elemento sea visible
      rootMargin: '0px 0px -50px 0px' // Activar un poco antes de que sea completamente visible
    });

    // Observar todos los elementos con clases de animación
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in, .animate-bounce-in'
    );

    animatedElements.forEach(el => observer.observe(el));
  }

  // Método para agregar animaciones a elementos específicos
  addScrollAnimation(element: HTMLElement, animationType: string, delay?: number) {
    this.renderer.addClass(element, animationType);

    if (delay) {
      this.renderer.addClass(element, `animate-delay-${delay}`);
    }

    // Solo crear observer en el browser
    if (typeof window !== 'undefined' && typeof IntersectionObserver !== 'undefined') {
      // Crear observer para este elemento específico
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(element);
    }
  }

  // Animaciones programáticas
  fadeIn(element: HTMLElement, duration = 500) {
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transition', `opacity ${duration}ms ease`);

    setTimeout(() => {
      this.renderer.setStyle(element, 'opacity', '1');
    }, 50);
  }

  slideIn(element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'up', duration = 500) {
    const transforms = {
      left: 'translateX(-30px)',
      right: 'translateX(30px)',
      up: 'translateY(30px)',
      down: 'translateY(-30px)'
    };

    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', transforms[direction]);
    this.renderer.setStyle(element, 'transition', `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`);

    setTimeout(() => {
      this.renderer.setStyle(element, 'opacity', '1');
      this.renderer.setStyle(element, 'transform', 'translate(0, 0)');
    }, 50);
  }

  scaleIn(element: HTMLElement, duration = 500) {
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', 'scale(0.8)');
    this.renderer.setStyle(element, 'transition', `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`);

    setTimeout(() => {
      this.renderer.setStyle(element, 'opacity', '1');
      this.renderer.setStyle(element, 'transform', 'scale(1)');
    }, 50);
  }

  // Efecto de typing para texto
  typeWriter(element: HTMLElement, text: string, speed = 50) {
    element.innerHTML = '';
    let i = 0;

    const timer = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  // Contador animado
  animateCounter(element: HTMLElement, from: number, to: number, duration = 2000) {
    const start = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * (to - from) + from);
      element.textContent = value.toString();

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16); // ~60fps
  }
}
