// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../service/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // đã đăng nhập nên return true
      return true;
    }

    // chưa đăng nhập nên chuyển hướng về trang login
    this.router.navigate(['/login']);
    return false;
  }
}