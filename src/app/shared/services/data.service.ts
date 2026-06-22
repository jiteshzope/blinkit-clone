import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService {
    private apiUrl = 'http://localhost:3000/';
    constructor(private http: HttpClient) {

    }

    adminLogin(username: string, password: string) {
        return this.http.post(`${this.apiUrl}admin/login`, {
            userName: username,
            password: password
        });
    }

    addCategory(categoryName: string, categoryDescription: string, categoryImage: string) {
        return this.http.post(`${this.apiUrl}add-category`, {
            categoryName,
            categoryDescription,
            categoryImage
        });
    }

    getCategories() {
        return this.http.get(`${this.apiUrl}categories`);
    }

}