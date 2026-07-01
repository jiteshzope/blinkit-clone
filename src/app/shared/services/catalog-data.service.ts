import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatalogDataService {
    private apiUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {
        return this.http.get(`${this.apiUrl}categories`);
    }

    getProductsByCategory(categoryId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}products/${categoryId}`);
    }
}