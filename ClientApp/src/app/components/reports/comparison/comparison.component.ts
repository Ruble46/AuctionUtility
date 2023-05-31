import { Component } from '@angular/core';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { BiddersService } from 'src/app/services/biddersService';
import { LotsService } from 'src/app/services/lotsService';

@Component({
  selector: 'comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['../../../../theme/theme.css', './comparison.component.css'],
})

export class ComparisonReportComponent {
  constructor(public biddersService: BiddersService, public lotsService: LotsService, public sbh: SnackBarHelper) {
    
  }
}