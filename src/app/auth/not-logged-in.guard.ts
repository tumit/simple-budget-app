import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export function notLoggedIn(next: ActivatedRouteSnapshot) {
  const loggedInUser = inject(AuthService).getLoggedInUser();
  return loggedInUser
    ? createUrlTreeFromSnapshot(next, ['/requirement-list'])
    : true;
};
