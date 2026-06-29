import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showCartIcon: boolean = false;
  showUserLogin : boolean = true;
  showUserRegister : boolean = true;
  showAdminLogin : boolean = false;
  showAdminLogout : boolean = false;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {

    this.adminService.adminLoginBehaviorSubject.subscribe((isAdminLoggedIn) => {
      console.log('Admin login status:', isAdminLoggedIn);
      this.showAdminLogin = !isAdminLoggedIn; // Show admin login when admin is not logged in

      this.showUserLogin = !isAdminLoggedIn; // Hide user login when admin is logged in
      this.showUserRegister = !isAdminLoggedIn; // Hide user register when admin is logged in
      this.showAdminLogout = isAdminLoggedIn; // Show admin logout when admin is logged in
    });
  }

  handleAdminLogout(): void {
    this.adminService.handleAdminLogout();
  }

}
