import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

// requirement-approval => next
// next ?
// user.role === 'A' => true => next ได้ไปต่อ => requirement-approval
// user.role != 'A => routing ใหม่จาก next แต่ตัวสุดท้ายที่ต้องไปคือ /auth/login

export const adminGuard = (next: ActivatedRouteSnapshot) => {
  const loggedInUser = inject(AuthService).getLoggedInUser();
  return loggedInUser?.user.role === 'A'
    ? true
    : createUrlTreeFromSnapshot(next, ['/auth', 'login']);
};

