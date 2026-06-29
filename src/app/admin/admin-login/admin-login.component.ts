import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { DataService } from 'src/app/shared/services/admin-data.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.dataService.adminLogin(username, password).subscribe({
        next: (response) => {
          console.log('Admin login successful:', response);
          this.adminService.adminLoginBehaviorSubject.next(true); // Set the admin login status to true
          this.router.navigate(['/admin/add-category']);
        },
        error: (error) => {
          console.error('Admin login failed:', error);
        }
      });
    }
  }

}
