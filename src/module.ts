import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient  } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login';
import { DashboardComponent } from './component/dashboard';
import { AuthGuard } from './service/auth.guard';
import { NotFoundComponent } from './component/error/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // Thêm route mặc định cuối cùng để xử lý các URL không hợp lệ
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [     
    DashboardComponent,
    NotFoundComponent
  ],
  imports: [ 
    LoginComponent,   
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports:[LoginComponent],
  providers: [],
  bootstrap: []
})
export class AppModule { }