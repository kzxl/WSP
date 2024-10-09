import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth';

@Component({ ... })
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Chuyển hướng đến dashboard nếu đã đăng nhập
    if (this.authService.currentUserValue) { 
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });// lấy URL trả về sau khi đăng nhập
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // Xử lý đăng nhập
  onSubmit() {
    if (this.loginForm.invalid) {
    return;
  }
  const formControls = this.loginForm.controls as {
    [key: string]: AbstractControl;
  };
    // Xử lý đăng nhập thành công
    this.authService.login(formControls.username.value,
    formControls.password.value)
            .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}