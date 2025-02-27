import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')
    },
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
