
import { Routes } from "@angular/router";
import { AuthComponent } from "./features/log-in/auth.component";
import { RecoverPasswordComponent } from "./features/recover-password/recover-password.component";

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent
    }
];