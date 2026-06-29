import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
    private apiUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) {}

    registerUser(userName: string, email: string, password: string, mobile: string, address: string) {
        return this.http.post(`${this.apiUrl}auth/user/register`, {
            userName,
            email,
            password,
            mobile,
            address
        });
    }
}