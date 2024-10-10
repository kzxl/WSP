import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-root', 
  standalone:true, 
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['../styles.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new  FormGroup({});

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

  ngOnInit():void {
    this.loginForm = new FormGroup({
      username: new FormGroup('', Validators.required),
      password: new FormGroup('', Validators.required)
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
    this.authService.login(formControls['username'].value,
    formControls['password'].value)
            .subscribe({
        next:(data) => {
          this.router.navigate([this.returnUrl]);
        },
        error:( error) => {
          this.error = error;
          this.loading = false;
        },
        complete:()=> {
            
        },
        });
  }
}