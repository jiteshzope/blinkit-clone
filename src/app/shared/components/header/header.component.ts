import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { UserHelperService } from '../../services/user-helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showCartIcon: boolean = false;

  showUserLogin : boolean = true;
  showUserRegister : boolean = true;
  showUserLogout : boolean = false;

  showAdminLogin : boolean = false;
  showAdminLogout : boolean = false;

  constructor(private adminService: AdminService, private router: Router, private userHelperService: UserHelperService) { }

  ngOnInit(): void {

    this.adminService.adminLoginBehaviorSubject.subscribe((isAdminLoggedIn) => {
      console.log('Admin login status:', isAdminLoggedIn);
      if(isAdminLoggedIn) {
        localStorage.removeItem('user');
        this.showAdminLogin = false; // Hide admin login when admin is logged in
        this.showAdminLogout = true; // Show admin logout when admin is logged in
        this.showUserLogin = false; // Hide user login when admin is logged in
        this.showUserRegister = false; // Hide user register when admin is logged in
        this.showCartIcon = false; // Hide cart icon when admin is logged in
        this.showUserLogout = false; // Hide user logout when admin is logged in
      }else {
        this.showAdminLogin = true; // Show admin login when admin is logged out
        this.showAdminLogout = false; // Hide admin logout when admin is logged out
        this.showUserLogin = true; // Show user login when admin is logged out
        this.showUserRegister = true; // Show user register when admin is logged out
        this.showCartIcon = false; // Hide cart icon when admin is logged out
        this.showUserLogout = false; // Hide user logout when admin is logged out
      }
    });

    this.userHelperService.userLoginStatusBehaviorSubject.subscribe((isUserLoggedIn) => {
      console.log('User login status:', isUserLoggedIn);
      if(isUserLoggedIn) {
        this.showUserLogin = false; // Hide user login when user is logged in
        this.showUserRegister = false; // Hide user register when user is logged in
        this.showCartIcon = true; // Show cart icon when user is logged in
        this.showUserLogout = true; // Show user logout when user is logged in
        this.showAdminLogin = false; // Hide admin login when user is logged in
        this.showAdminLogout = false; // Hide admin logout when user is logged in
      } else {
        this.showUserLogin = true; // Show user login when user is logged out
        this.showUserRegister = true; // Show user register when user is logged out
        this.showCartIcon = false; // Hide cart icon when user is logged out
        this.showUserLogout = false; // Hide user logout when user is logged out

        this.showAdminLogin = true; // Show admin login when user is logged out
        this.showAdminLogout = false; // Hide admin logout when user is logged out
      }
    });

  }

  handleAdminLogout(): void {
    this.adminService.handleAdminLogout();
  }

  handleUserLogout(): void {
    this.userHelperService.handleUserLogout();
  }

}
