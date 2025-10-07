import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Experience } from './components/experience/experience';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

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
export class App {
  protected readonly title = signal('Ronald Ricardo Leal Rodriguez');
}
