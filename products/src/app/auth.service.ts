import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUser(user:any){
    return this.http.post("http://localhost:3000/login", user)
  }

  constructor(private http:HttpClient) { }
}
