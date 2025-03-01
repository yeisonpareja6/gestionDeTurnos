import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth.routes').then(a => a.authRoutes)
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
    // {
    // path: '',
    // loadComponent: () => import('./app.component')
    // children: [
    // {
    // path: '**',
    // redirectTo: 'dashboard'
    // }
    // ]
    // }
];
