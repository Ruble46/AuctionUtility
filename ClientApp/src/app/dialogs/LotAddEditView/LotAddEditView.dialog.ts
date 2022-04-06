import { Lot, Bidder, DialogMode, LotDialogData } from '../../classes/classes';
import { Component, Inject, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarHelper } from '../../helpers/snackBar';
import { ConfirmationDialog } from '../confirmation/confirmation.dialog';
import { LotsService } from 'src/app/services/lotsService';
import { BiddersService } from 'src/app/services/biddersService';

@Component({
  selector: 'LotAddEditView',
  templateUrl: 'LotAddEditView.dialog.html',
  styleUrls: ['LotAddEditView.dialog.css']
})
export class LotAddEditViewDialog implements OnInit {

  @ViewChild('autoFocus', {static: false}) private lotNumberInput: ElementRef;
  public bidderNumbers: Array<number>;
  public isAdd: boolean = false;
  public isEdit: boolean = false;
  public isView: boolean = false;
  public data: Lot;

  constructor(public dialogRef: MatDialogRef<LotAddEditViewDialog>, @Inject(MAT_DIALOG_DATA) public dataIncoming: LotDialogData, public sbh: SnackBarHelper, private dialog: MatDialog, public lotsService: LotsService, public biddersService: BiddersService) {
    this.data = JSON.parse(JSON.stringify(dataIncoming.data));
    this.bidderNumbers = new Array<number>();

    if(this.dataIncoming.mode == DialogMode.edit) {
      this.isAdd = false;
      this.isEdit = true;
      this.isView = false;
    } else if(this.dataIncoming.mode == DialogMode.add) {
      this.isAdd = true;
      this.isEdit = false;
      this.isView = false;
    } else if(this.dataIncoming.mode == DialogMode.view) {
      this.isAdd = false;
      this.isEdit = false;
      this.isView = true;
    }
  }

  ngOnInit() {
    this.biddersService.GetAll().subscribe(result => {
      let bidders: Array<Bidder> = result.body;

      for(let a = 0; a < bidders.length; a++) {
        this.bidderNumbers.push(bidders[a].number);
      }
    }, error => {
      this.sbh.openSnackBar("Failed to retrieve all bidder numbers from the server", "Dismiss", 3000);
      console.error(error);
    })
  }

  //Runs after the view is initialized. Used to focus the lot number input
  ngAfterViewInit() {
    setTimeout(() => {
      this.lotNumberInput.nativeElement.focus();
    }, 250);
  }

  //Used to simply close the dialog. This returns undefined for the result
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Button in view mode to switch to edit mode
  changeToEdit() {
    this.isAdd = false;
    this.isEdit = true;
    this.isView = false;
  }

  //Tracks the item index for data binding in an array
  trackByIndex(index, item) {
    return index;
  }

  //Adjusts the item count. Set to a (change) event
  itemCountAdjust() {
    this.data.items = new Array<string>(this.data.itemsCount);
  }

  onDeleteClick() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: "Are you sure you want to delete lot #" + this.data.lotNumber + "?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.lotsService.DeleteSingle(this.data.lotNumber).subscribe(result => {
          this.sbh.openSnackBar(result.body, "Dismiss", 3000);
          this.dialogRef.close("delete");
        }, error => {
          this.sbh.openSnackBar("Failed to delete lot #" + this.data.lotNumber, "Dismiss", 3000);
          console.error(error);
        })
      }
    });
  }

  verifyNumber(verifyLot: Lot) {
    if(this.isAdd) {
      this.lotsService.Add(this.data).subscribe(result => {
        this.sbh.openSnackBar(result.body, "Dismiss", 3000);
        this.dialogRef.close("add");
      }, error => {
        this.sbh.openSnackBar("Failed to add lot #" + this.data.lotNumber, "Dismiss", 3000);
        console.error(error);
      })
    } else {
      this.data.buyerNumber = Number(this.data.buyerNumber);
      this.lotsService.Edit(this.data).subscribe(result => {
        this.sbh.openSnackBar(result.body, "Dismiss", 3000);
        this.dialogRef.close("edit");
      }, error => {
        this.sbh.openSnackBar("Failed to edit lot #" + this.data.lotNumber, "Dismiss", 3000);
        console.error(error);
      });
    }
  }

  compareObjects(bidderNumber1: number, bidderNumber2: number) {
    if(Number(bidderNumber1) === Number(bidderNumber2)) {
      return true;
    } else {
      return false;
    }
  }
}