import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/classes';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { SessionService } from 'src/app/services/sessionService';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  @ViewChild('autoFocus', { static: true }) private firstInput: ElementRef;

  constructor(private router: Router, public sessionService: SessionService, public sbh: SnackBarHelper) {

  } 

  ngOnInit() {
    setTimeout(() => {
      this.firstInput.nativeElement.focus();
    }, 500);
  }

  onSubmit() {
    this.sessionService.Login(new User(this.email, this.password)).subscribe(result => {
      this.router.navigateByUrl("app");
    }, error => {
      this.sbh.openSnackBar(error.error, "Dismiss", 3000);
      console.error(error);
    });
  }

  register() {
    this.sessionService.Register(new User(this.email, this.password)).subscribe(result => {
      this.router.navigateByUrl("app");
    }, error => {
      this.sbh.openSnackBar(error.error, "Dismiss", 3000);
      console.error(error);
    });
  }
}
