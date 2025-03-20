import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'gestionTurnos';

  isLogin = signal(false);
  router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (this.router.url === '/auth') {
        this.isLogin.set(false);
      } else {
        this.isLogin.set(true);
      }
    });
  }

}
