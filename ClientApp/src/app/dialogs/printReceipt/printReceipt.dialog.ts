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
      this.currentDate = new Date();
    }

    onCancel() {
      this.dialogRef.close();
    }

    printReceipt() {
        var content = document.getElementById("TOPRINT").cloneNode(true);
        var myWindow = window.open('', 'my div', 'height=500,width=800');

        myWindow.document.write('<html><head><title>my div</title>');
        myWindow.document.write('</head><body >');
        myWindow.document.write('</body></html>');

        myWindow.document.head.innerHTML = document.getElementsByTagName("head")[0].innerHTML; //Copy existing document head to retain CSS
        myWindow.document.body.append(content);  
        myWindow.document.close(); // necessary for IE >= 10

        myWindow.onload = function() { // necessary if the div contain images

            myWindow.focus(); // necessary for IE >= 10
            myWindow.print();
            //myWindow.close();
        };
    }
  }