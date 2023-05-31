import { Component } from '@angular/core';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { BiddersService } from 'src/app/services/biddersService';
import { LotsService } from 'src/app/services/lotsService';

@Component({
  selector: 'yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['../../../../theme/theme.css', './yearly.component.css'],
})

export class YearlyReportComponent {
  constructor(public biddersService: BiddersService, public lotsService: LotsService, public sbh: SnackBarHelper) {
    
  }
}