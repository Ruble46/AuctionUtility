import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { SessionService } from 'src/app/services/sessionService';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../theme/theme.css', './home.component.css'],
})

export class HomeComponent implements OnInit {
  public isOwner: boolean;
  public routeTitle: string;

  constructor(public sessionService: SessionService, public router: Router, public sbh: SnackBarHelper) {
    this.isOwner = false;
    this.routeTitle = "Auction";
  }

  ngOnInit() {
    this.sessionService.Validate().subscribe(result => {
      if(result.body.indexOf("ruble46") != -1) {
        this.isOwner = true;
      }
    }, error => {
      this.sbh.openSnackBar("Your session has expired. Please sign back in", "Dismiss", 4000);
      this.router.navigateByUrl("/login");
    });

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.setTitleByUrl(event.url);
      }
    });

    this.setTitleByUrl(this.router.url);
  }

  setTitleByUrl(url: string) {
    if(url.indexOf("auction") != -1) {
      this.routeTitle = "Auction";
    } else if(url.indexOf("checkout") != -1) {
      this.routeTitle = "Checkout";
    } else if(url.indexOf("tools") != -1) {
      this.routeTitle = "Tools";
    }
  }

  logout() {
    this.sessionService.Logout().subscribe(result => {
      this.sbh.openSnackBar("You have been successfully logged out", "Dismiss", 4000);
      this.router.navigateByUrl("/login");
    }, error => {
      this.sbh.openSnackBar("Failed to logout. Please try again in a few minutes", "Dismiss", 4000);
    });
  }
}