import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    selectedCategory: any;

    // Subject is used to emit data from one component using next() method, which can be received in another component by subscribing to the subject.
    // adminLoginSubject = new Subject();

    // BehaviorSubject is used to emit data from one component using next() method, which can be received in another component by subscribing to the BehaviorSubject. The difference between Subject and BehaviorSubject is that BehaviorSubject stores the last emitted value
    // BehaviorSubject is a type of Subject that is capable of storing the last emitted value, initially it stores the initial value. Then when we call the next() method on it, it will store that new value. This value can be accessed using behaviorSubject.value property
    adminLoginBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private router: Router) { }

    handleAdminLogout(): void {
      this.adminLoginBehaviorSubject.next(false);
      this.router.navigate(['/']);
    }

}