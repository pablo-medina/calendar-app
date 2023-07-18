import { Component, OnDestroy, OnInit } from '@angular/core';
import { PwaService } from './services/pwa.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

const PWA_INSTALL_MESSAGE_MS = 10000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition('visible <=> hidden', animate('0.5s ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Calendario';
  showInstallMessage: boolean = false;

  constructor(
    protected pwaService: PwaService
  ) { }

  ngOnInit(): void {
    this.pwaService.installable$.subscribe(installable => {
      const showInstallMessage = installable && !this.pwaService.installed;
      this.showInstallMessage = showInstallMessage;
      
      // Mostrar el mensaje solo por el tiempo indicado en PWA_INSTALL_MESSAGE_MS
      if (showInstallMessage) {
        setTimeout(() => {
          this.showInstallMessage = false;
        }, PWA_INSTALL_MESSAGE_MS);
      }      
    });
  }

  ngOnDestroy(): void {
    this.pwaService.installable$.unsubscribe();
  }

  onInstallClick(): void {
    this.pwaService.install();
  }

  onDismissClick(): void {
    this.showInstallMessage = false;
  }

}
