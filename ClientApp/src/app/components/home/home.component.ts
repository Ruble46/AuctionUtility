import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { SessionService } from 'src/app/services/sessionService';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../theme/theme.css', './home.component.css'],
})

export class HomeComponent implements OnInit {
    openState: boolean;
    route: string;

    constructor(public sessionService: SessionService, public router: Router, public sbh: SnackBarHelper) {
        this.openState = false;
        this.route = "";
    }

    ngOnInit() {
        this.sessionService.Validate().subscribe(result => {
        
        }, error => {
        this.sbh.openSnackBar("Your session has expired. Please sign back in", "Dismiss", 4000);
        this.router.navigateByUrl("/login");
        });

        setTimeout(() => {
            this.openState = true;
        }, 100);

        this.setRouteSegment(this.router.url);

        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.setRouteSegment(event.url);
            }
        });
    }

    //Gets the last segment from the url and caches it
    setRouteSegment(route: string) {
        this.route = route.substring(route.lastIndexOf('/') + 1);
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