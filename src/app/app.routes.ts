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
        path: 'WorkArea',
        loadChildren: () => import('./components/work-area/work-area.routes').then(w => w.routesWorkAreas)
    },
    {
        path: 'Workstation',
        loadChildren: () => import('./components/work-station/work-station.routes').then(w => w.routesWorkStation)
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
