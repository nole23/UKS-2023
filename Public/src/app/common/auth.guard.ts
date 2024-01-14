import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isLoggedIn();
};

export const authGuardChild: CanActivateChildFn = (route, state) => {
  return !inject(AuthService).isLoggedIn();
}