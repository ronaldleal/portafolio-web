import { Component, HostListener, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  // Señales para reactividad
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal('home');
  isDarkMode = signal(false);

  ngOnInit() {
    // Solo ejecutar en el browser
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Cargar tema guardado
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkMode.set(true);
        document.body.classList.add('dark-theme');
      }
    }

    // Detectar sección activa al cargar (solo en browser)
    if (typeof window !== 'undefined') {
      this.updateActiveSection();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollPosition = window.scrollY;
    this.isScrolled.set(scrollPosition > 50);
    this.updateActiveSection();
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768 && this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
    }
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }

    // Cerrar menú móvil si está abierto
    this.isMobileMenuOpen.set(false);
    this.activeSection.set(sectionId);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(current => !current);
  }

  toggleTheme() {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);

    // Solo ejecutar en el browser
    if (typeof window !== 'undefined') {
      if (newTheme) {
        document.body.classList.add('dark-theme');
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('theme', 'dark');
        }
      } else {
        document.body.classList.remove('dark-theme');
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('theme', 'light');
        }
      }
    }
  }

  private updateActiveSection() {
    // Solo ejecutar en el browser
    if (typeof window === 'undefined') return;

    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100;

    const reversedSections = sections.slice().reverse();
    for (const sectionId of reversedSections) {
      const element = document.getElementById(sectionId);
      if (element && scrollPosition >= element.offsetTop) {
        this.activeSection.set(sectionId);
        break;
      }
    }
  }
}
