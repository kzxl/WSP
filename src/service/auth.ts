// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as mssql from  'mssql';


@Injectable({ providedIn: 'root' })
export class AuthService {  
private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')??'{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }
private config = {
    user: 'testin',
    password: '268479#Kzx',
    server: '192.168.15.40\\SQLEXPRESS',
    database: 'MDSManagement'
  };
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }


  login(username: string, password: string) {
    const users = [
  { id: 1, username: 'MLG00859', password: 'MLG00859' },
  { id: 2, username: '1', password: '2' }
];
         const user = users.find(u => u.username === username && u.password === password);
        if(user)
        {
         localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        //console.log(user)
        return user;
        }
        //console.log("out")
        return null;
      
  }


  logout() {
    // xóa user khỏi local storage khi đăng xuất
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}