import { Component } from '@angular/core';
import { AdminService } from './shared/services/admin.service';
import { UserHelperService } from './shared/services/user-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blinkit-clone';

  displayData: any;

  constructor(private adminService: AdminService, private userHelperService: UserHelperService) {
    console.log('AppComponent initialized');
  }

  ngOnInit() {
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      this.adminService.adminLoginBehaviorSubject.next(true);
    }

    const user = localStorage.getItem('user');
    if (user) {
      this.userHelperService.userLoginStatusBehaviorSubject.next(true);
    }
  }
}
