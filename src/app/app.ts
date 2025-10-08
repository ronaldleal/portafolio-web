import { Component, signal, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Experience } from './components/experience/experience';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { AnimationService } from './services/animation.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    Header,
    Hero,
    About,
    Projects,
    Skills,
    Experience,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('Ronald Ricardo Leal Rodriguez');
  
  // Carrusel properties
  currentSlide = 0;
  
  // Touch/Swipe properties
  private startX = 0;
  private currentX = 0;
  private isDragging = false;
  private threshold = 50; // Minimum swipe distance
  
  slides = [
    { label: 'Inicio', id: 'home' },
    { label: 'Sobre mí', id: 'about' },
    { label: 'Proyectos', id: 'projects' },
    { label: 'Habilidades', id: 'skills' },
    { label: 'Experiencia', id: 'experience' },
    { label: 'Contacto', id: 'contact' }
  ];

  constructor(private readonly animationService: AnimationService) {}

  ngOnInit() {
    // Configurar tema inicial del sistema (solo en browser)
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark && !localStorage.getItem('theme')) {
        document.body.classList.add('dark-theme');
      }
    }
  }

  ngAfterViewInit() {
    // Inicializar animaciones después de que la vista se haya renderizado
    setTimeout(() => {
      this.animationService.initScrollAnimations();
    }, 100);
  }

  // Navegación del carrusel
  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
      console.log('Next slide:', this.currentSlide, 'Transform:', -this.currentSlide * 100 + 'vw');
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      console.log('Prev slide:', this.currentSlide, 'Transform:', -this.currentSlide * 100 + 'vw');
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    console.log('Go to slide:', this.currentSlide, 'Transform:', -this.currentSlide * 100 + 'vw');
  }

  // Navegación con teclado
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prevSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case 'Home':
        event.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToSlide(this.slides.length - 1);
        break;
    }
  }

  // Touch events for mobile swipe
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.isDragging = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    this.currentX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    const deltaX = this.startX - this.currentX;
    
    if (Math.abs(deltaX) > this.threshold) {
      if (deltaX > 0) {
        // Swipe left - go to next slide
        this.nextSlide();
      } else {
        // Swipe right - go to previous slide
        this.prevSlide();
      }
    }
  }

  // Mouse events for desktop drag
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.startX = event.clientX;
    this.isDragging = true;
    event.preventDefault();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.currentX = event.clientX;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    const deltaX = this.startX - this.currentX;
    
    if (Math.abs(deltaX) > this.threshold) {
      if (deltaX > 0) {
        // Drag left - go to next slide
        this.nextSlide();
      } else {
        // Drag right - go to previous slide
        this.prevSlide();
      }
    }
  }
}
