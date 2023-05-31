import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/dialogs/confirmation/confirmation.dialog';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { BiddersService } from 'src/app/services/biddersService';
import { LotsService } from 'src/app/services/lotsService';

@Component({
  selector: 'tools',
  templateUrl: './tools.component.html',
  styleUrls: ['../../../../theme/theme.css', './tools.component.css'],
})

export class ToolsComponent {
  public adminKey: string;

  constructor(public dialog: MatDialog, public biddersService: BiddersService, public lotsService: LotsService, public sbh: SnackBarHelper) {
    
  }

  deleteAllLots() {
    if(this.adminKey == null || this.adminKey == undefined || this.adminKey == "") {
      this.sbh.openSnackBar("Please enter a security key for this request", "Dismiss", 4000);
      return;
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: "Are you sure you want to delete all lots?",
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined) {
          this.lotsService.DeleteAll(this.adminKey).subscribe(result => {
            this.sbh.openSnackBar(result.body, "Dismiss", 3000);
          }, error => {
            console.error(error);
            this.sbh.openSnackBar(error.error, "Dismiss", 3000);
          })
        }
      });
    }
  }

  deleteAllBidder() {
    if(this.adminKey == null || this.adminKey == undefined || this.adminKey == "") {
      this.sbh.openSnackBar("Please enter a security key for this request", "Dismiss", 4000);
      return;
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: "Are you sure you want to delete all bidders?",
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined) {
          this.biddersService.DeleteAll(this.adminKey).subscribe(result => {
            this.sbh.openSnackBar(result.body, "Dismiss", 3000);
          }, error => {
            console.error(error);
            this.sbh.openSnackBar(error.error, "Dismiss", 3000);
          })
        }
      });
    }
  }
}