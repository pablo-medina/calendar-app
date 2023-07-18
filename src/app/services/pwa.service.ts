import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private installPromptEvent!: Event;

  public installable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      if (event) {
        event.preventDefault();
        this.installPromptEvent = event;
        this.installable$.next(true);
      }
    })
  }

  get installed(): boolean {
    return window.matchMedia('(display-mode: standalone').matches || (navigator as any).standalone === true;
  }

  install(): boolean {
    if (this.installPromptEvent) {
      const ev = this.installPromptEvent as any;
      ev.prompt();
      ev.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.debug('El usuario aceptó instalar la aplicación');
          return true;
        } else {
          console.debug('El usuario rechazó la instalación de la aplicación')
          return false;
        }
      })
    }
    return false;
  }
}
