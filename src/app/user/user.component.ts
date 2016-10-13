import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private userName;
  private formShowing = false;
  private userLoggedIn = false;


  constructor(private router: Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem('user-name');
    // if (this.currentUserName) {
    //   this.userLoggedIn = true;
    // }
  }

  logout() {
    localStorage.clear();
    this.formShowing = false;
    this.router.navigate(['/login']);
    this.userLoggedIn = false;
  }

}
