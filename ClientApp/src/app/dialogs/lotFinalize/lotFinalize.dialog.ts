import { Lot, Bidder } from '../../classes/classes';
import { Component, Inject, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarHelper } from '../../helpers/snackBar';
import { ConfirmationDialog } from '../confirmation/confirmation.dialog';
import { LotsService } from 'src/app/services/lotsService';
import { BiddersService } from 'src/app/services/biddersService';

@Component({
    selector: 'lotFinalize',
    templateUrl: 'lotFinalize.dialog.html',
    styleUrls: ['lotFinalize.dialog.css']
})
export class LotFinalizeDialog implements OnInit, AfterViewInit {

    @ViewChild('autoFocus', {static: false}) private autoFocus: ElementRef;
    public bidderNumbers: Array<number>;
    public data: Lot;

    constructor(public dialogRef: MatDialogRef<LotFinalizeDialog>, 
            @Inject(MAT_DIALOG_DATA) public dataIncoming: Lot, 
            public sbh: SnackBarHelper, 
            private dialog: MatDialog, 
            public lotsService: LotsService, 
            public biddersService: BiddersService) {

        this.data = JSON.parse(JSON.stringify(dataIncoming));
        this.bidderNumbers = new Array<number>();
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
        this.lotsService.Edit(this.data).subscribe(result => {
            this.sbh.openSnackBar(result.body, "Dismiss", 3000);
            this.dialogRef.close("edit");
        }, error => {
            this.sbh.openSnackBar("Failed to edit lot #" + this.data.lotNumber, "Dismiss", 3000);
            console.error(error);
        });
    }

    //Custom comparison for data objects
    compareObjects(bidderNumber1: number, bidderNumber2: number) {
        if(Number(bidderNumber1) === Number(bidderNumber2)) {
            return true;
        } else {
            return false;
        }
    }
}