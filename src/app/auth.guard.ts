import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authServoce = inject(AuthService);
  const routes = inject(Router);
  if (authServoce.isAuthenticated()) {
    return true;
  } else {
    routes.navigate(['/']);
    return false;
  }
};
