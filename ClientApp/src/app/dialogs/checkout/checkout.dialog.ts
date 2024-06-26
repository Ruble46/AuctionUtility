import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { Checkout } from '../../classes/classes';
import { ConfirmationDialog } from '../confirmation/confirmation.dialog';
import { PrintReceiptDialog } from '../printReceipt/printReceipt.dialog';

@Component({
    selector: 'checkoutDialog',
    templateUrl: 'checkout.dialog.html',
    styleUrls: ['../../../theme/theme.css', './checkout.dialog.css']
  })
  export class CheckoutDialog implements OnInit {
    public checkout: Checkout;
    public expandAll: Boolean;

    constructor(public dialogRef: MatDialogRef<CheckoutDialog>, @Inject(MAT_DIALOG_DATA) public data: Checkout, public dialog: MatDialog, public sbh: SnackBarHelper) {
      this.checkout = JSON.parse(JSON.stringify(data));
      this.expandAll = false;
    }

    ngOnInit() {
      
    }

    onNoClick() {
      this.dialogRef.close();
    }

    completeCheckout() {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: "Has the bidder paid for all lots?",
        position: {
          top: '10vh'
        },
        minWidth: '450px',
        maxWidth: '500px'
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined) {
          this.dialogRef.close(this.checkout);
        }
      });
    }

    printReceiptDialog() {
        this.dialog.open(PrintReceiptDialog, {
            data: this.data,
            position: {
              top: '10vh'
            },
            minWidth: '500px',
            maxWidth: '750px'
        });
    }
  }