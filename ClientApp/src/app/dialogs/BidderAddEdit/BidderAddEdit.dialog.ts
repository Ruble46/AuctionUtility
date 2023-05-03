import { Bidder, BidderDialogData, DialogMode, LotDialogData } from '../../classes/classes';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarHelper } from '../../helpers/snackBar';
import { ConfirmationDialog } from '../confirmation/confirmation.dialog';
import { BiddersService } from 'src/app/services/biddersService';

@Component({
    selector: 'BidderAddEdit',
    templateUrl: 'BidderAddEdit.dialog.html',
    styleUrls: ['BidderAddEdit.dialog.css']
  })
  export class BidderAddEditDialog {
  
    @ViewChild('autoFocus', {static: false}) private nameInput: ElementRef;
    public isAdd: boolean = false;
    public isEdit: boolean = false;
    public data: Bidder;
  
    constructor(public dialogRef: MatDialogRef<BidderAddEditDialog>, @Inject(MAT_DIALOG_DATA) public dataIncoming: BidderDialogData, public sbh: SnackBarHelper, private dialog: MatDialog, public biddersService: BiddersService) {
      this.data = JSON.parse(JSON.stringify(dataIncoming.data));

      if(this.dataIncoming.mode == DialogMode.edit) {
        this.isAdd = false;
        this.isEdit = true;
      } else if(this.dataIncoming.mode == DialogMode.add) {
        this.isAdd = true;
        this.isEdit = false;
      }
    }
  
    ngAfterViewInit() {
      setTimeout(() => {
        this.nameInput.nativeElement.focus();
      }, 250);
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    verifyNumber(verifyBidder: Bidder) {
      if(this.isAdd) {
        this.biddersService.Add(this.data).subscribe(result => {
          this.sbh.openSnackBar(result.body, "Dismiss", 3000);
          this.dialogRef.close("add");
        }, error => {
          this.sbh.openSnackBar("Failed to add bidder #" + this.data.number, "Dismiss", 3000);
          console.error(error);
        });
      } else {
        this.biddersService.Edit(this.data).subscribe(result => {
          this.sbh.openSnackBar(result.body, "Dismiss", 3000);
          this.dialogRef.close("edit");
        }, error => {
          this.sbh.openSnackBar("Failed to edit bidder #" + this.data.number, "Dismiss", 3000);
          console.error(error);
        });
      }
    }

    onDeleteClick() {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: "Are you sure you want to delete bidder '" + this.data.name + "'?"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined) {
          this.biddersService.DeleteSingle(this.data.number).subscribe(result => {
            this.sbh.openSnackBar(result.body, "Dismiss", 3000);
            this.dialogRef.close("delete");
          }, error => {
            this.sbh.openSnackBar("Failed to delete bidder #" + this.data.number, "Dismiss", 3000);
            console.error(error);
          });
        }
      });
    }
  }