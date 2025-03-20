import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLogin = signal(false);
  selectedMenuItem: string = 'home';
  router = inject(Router);

  ngOnInit(): void {
    this.validateRoute();
    this.routerEvent();
  }

  routerEvent(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.validateRoute();
    })
  }

  validateRoute() {
    const currenRoute = this.router.url;
    this.selectedMenuItem = currenRoute.split("/")[1] || 'workArea';
  }

  redirect(item: string): void {
    this.router.navigate([item]);
  }

  selectMenuItem(item: string) {
    this.selectedMenuItem = item;
    this.redirect(item);
  }
}
