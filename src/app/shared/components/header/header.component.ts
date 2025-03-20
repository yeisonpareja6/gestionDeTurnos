import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthSharedService } from '../../services/auth-shared.service';
import { TokenDecode } from '../../interfaces/interface-shared';
import { MenuOption } from '../header';

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
  authShared = inject(AuthSharedService);

  filteredMenuOptions: MenuOption[] = [];
  menuOptions: MenuOption[] = [
    { label: 'Áreas de trabajo', permission: 'WorkArea', route: '/WorkArea' }
  ];

  ngOnInit(): void {
    this.validOptionsMenu();
    this.routerEvent();
  }

  validOptionsMenu(): void {
    const token = this.authShared.getDecodeToken();
    if (token) {
      this.filteredMenuOptions = this.getFilteredMenuOptions(token);
    }
  }

  getFilteredMenuOptions(token: TokenDecode): MenuOption[] {
    const userPermissions = token.Permissions.split(',');
    return this.menuOptions.filter(option => userPermissions.includes(option.permission));
  }

  routerEvent(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.validateRoute();
    });
  }

  validateRoute() {
    const currenRoute = this.router.url;
    this.selectedMenuItem = currenRoute || '/WorkArea';
  }

  redirect(item: string): void {
    this.router.navigate([item]);
  }

  selectMenuItem(item: string) {
    this.selectedMenuItem = item;
    this.redirect(item);
  }
}
