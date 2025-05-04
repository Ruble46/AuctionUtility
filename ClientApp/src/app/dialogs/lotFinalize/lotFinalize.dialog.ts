import { Lot, Bidder } from '../../classes/classes';
import { Component, Inject, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SnackBarHelper } from '../../helpers/snackBar';
import { LotsService } from 'src/app/services/lotsService';
import { BiddersService } from 'src/app/services/biddersService';
import { ConfirmationDialog } from '../confirmation/confirmation.dialog';

@Component({
    selector: 'lotFinalize',
    templateUrl: 'lotFinalize.dialog.html',
    styleUrls: ['lotFinalize.dialog.css']
})
export class LotFinalizeDialog implements OnInit, AfterViewInit {

    @ViewChild('autoFocus', {static: false}) private autoFocus: ElementRef;
    public data: Lot;
    private bidders: Array<Bidder>;
    public bidderName: string;
    public itemString: string = "";

    constructor(public dialogRef: MatDialogRef<LotFinalizeDialog>, 
            @Inject(MAT_DIALOG_DATA) public dataIncoming: Lot, 
            public sbh: SnackBarHelper, 
            public lotsService: LotsService, 
            public biddersService: BiddersService,
            private dialog: MatDialog, ) {

        this.data = JSON.parse(JSON.stringify(dataIncoming));
        this.bidders = new Array<Bidder>();
        this.bidderName = "";
        
        for(let i = 0; i < this.data.items.length; i++)  {
            this.itemString += this.data.items[i];
            
            if(i != this.data.items.length - 1) {
                this.itemString += ", ";
            }
        }
    }

    ngOnInit() {
        this.biddersService.GetAll().subscribe(result => {
            this.bidders = result.body;
            this.buyerNumberChanged();
        }, error => {
            this.sbh.openSnackBar("Failed to retrieve all bidder numbers from the server", "Dismiss", 3000);
            console.error(error);
        });
    }

    //Runs after the view is initialized. Used to focus the lot number input
    ngAfterViewInit() {
        setTimeout(() => {
            this.autoFocus.nativeElement.focus();
        }, 250);
    }

    //Used to simply close the dialog. This returns undefined for the result
    onNoClick(): void {
        this.dialogRef.close();
    }

    //Form submission function
    submitData() {
        let result = this.bidders.find(bidder => {
            return bidder.number == this.data.buyerNumber;
        });

        if(result == null || result == undefined) {
            this.sbh.openSnackBar("Invalid bidder number.", "Dismiss", 3000);
            return;
        }

        this.lotsService.Edit(this.data).subscribe(result => {
            this.sbh.openSnackBar(result.body, "Dismiss", 3000);
            this.dialogRef.close("edit");
        }, error => {
            this.sbh.openSnackBar("Failed to edit lot #" + this.data.lotNumber, "Dismiss", 3000);
            console.error(error);
        });
    }

    buyerNumberChanged() {
        let result = this.bidders.find(bidder => {
            return bidder.number == this.data.buyerNumber;
        });

        (result == undefined || result == null) ? this.bidderName = "" : this.bidderName = result.name;
    }

    clearData() {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: "Are you sure you want to clear this data?"
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result !== undefined) {
                this.data.buyerNumber = undefined;
                this.data.finalBid = undefined;
                this.itemString = "";
                
                this.lotsService.Edit(this.data).subscribe(result => {
                    this.sbh.openSnackBar(result.body, "Dismiss", 3000);
                    this.dialogRef.close("edit");
                }, error => {
                    this.sbh.openSnackBar("Failed to clear data", "Dismiss", 3000);
                    console.error(error);
                });
            }
        });
    }
}