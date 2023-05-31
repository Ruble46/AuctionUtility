import { Component } from '@angular/core';
import { SnackBarHelper } from 'src/app/helpers/snackBar';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../theme/theme.css', './dashboard.component.css'],
})

export class DashboardComponent {
  constructor(public sbh: SnackBarHelper) {
    
  }
}