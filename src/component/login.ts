import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-root', 
  standalone: true, 
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['../styles.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Khai báo không khởi tạo ngay
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
    //console.log(this.authService.currentUserValue)
    if (this.authService.currentUserValue) { 
    this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ // Sử dụng FormBuilder
      username: ['', Validators.required], // Sử dụng FormControl
      password: ['', Validators.required]  // Sử dụng FormControl
    });
    // Lấy URL trả về sau khi đăng nhập
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // Xử lý đăng nhập
  onSubmit() {
    this.submitted = true; // Đánh dấu là đã gửi biểu mẫu
    if (this.loginForm.invalid) {
      return; // Nếu biểu mẫu không hợp lệ thì thoát
    }
    
    this.loading = true; // Bắt đầu quá trình đăng nhập
    const formControls = this.loginForm.controls as {
      [key: string]: AbstractControl;
    };
    //console.log(formControls['username'].value)
    // Xử lý đăng nhập
    if(this.authService.login(formControls['username'].value, formControls['password'].value)!=null)
    {    
      //console.log(this.authService.currentUserValue)
     this.router.navigate(['/dashboard']);
     //this.router.navigate([this.returnUrl]);
    }
    else
    {
        this.error="Login fail"
           this.loading = false;
    }
    // .subscribe({
      //   next: (data) => {
      //     this.router.navigate([this.returnUrl]);
      //   },
      //   error: (error) => {
      //     this.error = error;
      //     this.loading = false; // Đặt lại trạng thái loading
      //   },
      //   complete: () => {
      //     this.loading = false; // Đặt lại trạng thái loading
      //   },
      // });
  }
}