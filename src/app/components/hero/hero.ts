import { Component, OnInit, OnDestroy, ElementRef, ViewChild, signal } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit, OnDestroy {
  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;

  // Texto animado
  subtitleText = 'Desarrollador Full Stack especializado en Backend';
  displayedText = signal('');

  private typewriterInterval?: number;

  // Textos rotativos
  private readonly rotatingTexts = [
    'Desarrollador Full Stack especializado en Backend',
    'Experto en Java & Spring Boot'
  ];
  private currentTextIndex = 0;

  constructor(private readonly animationService: AnimationService) {}

  ngOnInit() {
    this.startTypewriter();
    this.initTechStackAnimation();
  }

  ngOnDestroy() {
    // Solo limpiar en el browser
    if (typeof window !== 'undefined' && this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
  }

  private startTypewriter() {
    // Solo ejecutar en el browser
    if (typeof window === 'undefined') return;

    // Efecto Slide & Reveal moderno
    this.slideRevealEffect();
  }

  private slideRevealEffect() {
    const showDuration = 4000; // Tiempo que se muestra cada texto  
    const animationDuration = 1200; // Duración de la animación de transición

    // Mostrar el primer texto con efecto
    this.revealText(this.rotatingTexts[this.currentTextIndex]);

    this.typewriterInterval = window.setInterval(() => {
      // Ocultar texto actual
      this.hideCurrentText();

      setTimeout(() => {
        // Cambiar al siguiente texto
        this.currentTextIndex = (this.currentTextIndex + 1) % this.rotatingTexts.length;
        this.revealText(this.rotatingTexts[this.currentTextIndex]);
      }, animationDuration / 2);
    }, showDuration);
  }

  private revealText(text: string) {
    // Crear HTML con palabras envueltas en spans
    const words = text.split(' ');
    const wrappedText = words.map((word, index) => 
      `<span class="word-reveal" style="animation-delay: ${index * 0.1}s">${word}</span>`
    ).join(' ');
    
    this.displayedText.set(text); // Fallback para SEO
    
    setTimeout(() => {
      const container = document.querySelector('.reveal-text');
      if (container) {
        container.innerHTML = wrappedText;
        container.classList.add('revealing');
      }
    }, 50);
  }

  private hideCurrentText() {
    const container = document.querySelector('.reveal-text');
    if (container) {
      container.classList.remove('revealing');
      container.classList.add('hiding');
      
      setTimeout(() => {
        container.classList.remove('hiding');
        container.innerHTML = '';
      }, 600);
    }
  }

  private initTechStackAnimation() {
    // Solo ejecutar en el browser
    if (typeof document === 'undefined') return;

    setTimeout(() => {
      const techItems = document.querySelectorAll('.tech-item');
      techItems.forEach((item, index) => {
        // Aplicar animación escalonada
        (item as HTMLElement).style.animationDelay = `${index * 0.15}s`;
        (item as HTMLElement).style.opacity = '1';
        (item as HTMLElement).style.transform = 'translateY(0)';
      });
    }, 500);
  }

  downloadCV(event: Event) {
    event.preventDefault();

    // Solo ejecutar en el browser
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Simular descarga (aquí pondrías la lógica real)
    const link = document.createElement('a');
    link.href = '#'; // Aquí iría la URL de tu CV
    link.download = 'Ronald_Leal_CV.pdf';

    // Animación de feedback
    const button = event.target as HTMLElement;
    const originalText = button.textContent;
    button.textContent = '✓ Descargando...';
    button.style.background = 'var(--success-gradient)';

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 2000);

    // link.click(); // Descomenta cuando tengas el CV real

    // Por ahora, mostrar mensaje
    alert('CV no disponible aún. Próximamente estará disponible para descarga.');
  }

  scrollToNextSection() {
    // Buscar la siguiente sección (normalmente es 'about')
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Si no existe 'about', scroll hacia abajo una pantalla completa
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }
}
