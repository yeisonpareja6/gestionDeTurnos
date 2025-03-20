import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth.routes').then(a => a.authRoutes)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.routes').then(d => d.dashboardRoute)
    },
    {
        path: 'workArea',
        loadChildren: () => import('./components/work-area/work-area.routes').then(w => w.routesWorkAreas)
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
