import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { Checkout } from '../../classes/classes';

@Component({
    selector: 'printReceipt',
    templateUrl: 'printReceipt.dialog.html',
    styleUrls: ['../../../theme/theme.css', './printReceipt.dialog.css']
  })
  export class PrintReceiptDialog {
    public checkout: Checkout;
    public currentDate: Date;

    constructor(public dialogRef: MatDialogRef<PrintReceiptDialog>, @Inject(MAT_DIALOG_DATA) public data: Checkout, public dialog: MatDialog, public sbh: SnackBarHelper) {
      this.checkout = JSON.parse(JSON.stringify(data));
      console.log(this.checkout);
      this.currentDate = new Date();
    }

    onCancel() {
      this.dialogRef.close();
    }

    printReceipt() {
        
    }
  }