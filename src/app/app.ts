import { Component, signal, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
}
