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
  private currentIndex = 0;
  private isDeleting = false;

  // Textos rotativos
  private readonly rotatingTexts = [
    'Desarrollador Full Stack especializado en Backend',
    'Experto en Java & Spring Boot'
  ];
  private currentTextIndex = 0;

  constructor(private readonly animationService: AnimationService) {}

  ngOnInit() {
    this.startTypewriter();
    this.animateCounters();
    this.initFloatingElements();
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
    
    this.typewriterInterval = window.setInterval(() => {
      const currentText = this.rotatingTexts[this.currentTextIndex];

      if (!this.isDeleting) {
        // Escribiendo
        if (this.currentIndex < currentText.length) {
          this.displayedText.set(currentText.substring(0, this.currentIndex + 1));
          this.currentIndex++;
        } else {
          // Pausa antes de empezar a borrar
          setTimeout(() => {
            this.isDeleting = true;
          }, 2000);
        }
      } else if (this.currentIndex > 0) {
        // Borrando
        this.displayedText.set(currentText.substring(0, this.currentIndex - 1));
        this.currentIndex--;
      } else {
        // Cambiar al siguiente texto
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.rotatingTexts.length;
      }
    }, this.isDeleting ? 50 : 100);
  }

  private animateCounters() {
    // Solo ejecutar en el browser
    if (typeof document === 'undefined') return;
    
    setTimeout(() => {
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        this.animationService.animateCounter(counter as HTMLElement, 0, target, 2000);
      });
    }, 1500);
  }

  private initFloatingElements() {
    // Solo ejecutar en el browser
    if (typeof document === 'undefined') return;
    
    // Agregar movimiento aleatorio a elementos flotantes
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      const randomDelay = Math.random() * 2;
      const randomDuration = 3 + Math.random() * 2;

      (element as HTMLElement).style.animationDelay = `${randomDelay}s`;
      (element as HTMLElement).style.animationDuration = `${randomDuration}s`;
    });
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
}
