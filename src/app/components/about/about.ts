import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  scrollToNextSection() {
    // Buscar la siguiente sección (normalmente es 'projects')
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Si no existe 'projects', buscar 'skills' como alternativa
      const skillsSection = document.querySelector('#skills');
      if (skillsSection) {
        skillsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Fallback: scroll hacia abajo una pantalla completa
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    }
  }
}
