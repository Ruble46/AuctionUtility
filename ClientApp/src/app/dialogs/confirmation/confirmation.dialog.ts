import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckoutDialog } from '../checkout/checkout.dialog';

@Component({
    selector: 'confirmationDialog',
    templateUrl: 'confirmation.dialog.html',
    styleUrls: ['../../../theme/theme.css', './confirmation.dialog.css']
  })
  export class ConfirmationDialog {
    public reportType: string;
    public startDate: Date;
    public endDate: Date;

    constructor(public dialogRef: MatDialogRef<ConfirmationDialog>, @Inject(MAT_DIALOG_DATA) public data: string) {

    }

    onNoClick() {
      this.dialogRef.close();
    }

    onYesClick() {
        this.dialogRef.close('yes');
    }
  }