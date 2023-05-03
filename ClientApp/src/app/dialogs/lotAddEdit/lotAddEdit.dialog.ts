import { Lot, Bidder, DialogMode, LotDialogData } from '../../classes/classes';
import { Component, Inject, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarHelper } from '../../helpers/snackBar';
import { ConfirmationDialog } from '../confirmation/confirmation.dialog';
import { LotsService } from 'src/app/services/lotsService';
import { BiddersService } from 'src/app/services/biddersService';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, TAB } from '@angular/cdk/keycodes';

@Component({
    selector: 'lotAddEdit',
    templateUrl: 'lotAddEdit.dialog.html',
    styleUrls: ['lotAddEdit.dialog.css']
})
export class LotAddEditDialog implements OnInit {

    @ViewChild('autoFocus', {static: false}) private autoFocus: ElementRef;
    public bidderNumbers: Array<number>;
    public isAdd: boolean = false;
    public isEdit: boolean = false;
    public data: Lot;
    public addOnBlur = true;
    public readonly separatorKeysCodes = [ENTER, TAB] as const;

    constructor(public dialogRef: MatDialogRef<LotAddEditDialog>, 
            @Inject(MAT_DIALOG_DATA) public dataIncoming: LotDialogData, 
            public sbh: SnackBarHelper, 
            private dialog: MatDialog, 
            public lotsService: LotsService, 
            public biddersService: BiddersService) {

        this.data = JSON.parse(JSON.stringify(dataIncoming.data));
        this.bidderNumbers = new Array<number>();

        if(this.dataIncoming.mode == DialogMode.edit) {
            this.isAdd = false;
            this.isEdit = true;
        } else if(this.dataIncoming.mode == DialogMode.add) {
            this.isAdd = true;
            this.isEdit = false;
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

    //Delete button click event
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

    //Form submission function
    submitData() {
        if(this.isAdd) {
            this.lotsService.Add(this.data).subscribe(result => {
                this.sbh.openSnackBar(result.body, "Dismiss", 3000);
                this.dialogRef.close("add");
            }, error => {
                this.sbh.openSnackBar("Failed to add lot #" + this.data.lotNumber, "Dismiss", 3000);
                console.error(error);
            })
        } else {
            this.lotsService.Edit(this.data).subscribe(result => {
                this.sbh.openSnackBar(result.body, "Dismiss", 3000);
                this.dialogRef.close("edit");
            }, error => {
                this.sbh.openSnackBar("Failed to edit lot #" + this.data.lotNumber, "Dismiss", 3000);
                console.error(error);
            });
        }
    }

    //Custom comparison for data objects
    compareObjects(bidderNumber1: number, bidderNumber2: number) {
        if(Number(bidderNumber1) === Number(bidderNumber2)) {
            return true;
        } else {
            return false;
        }
    }

    addItem(event: MatChipInputEvent): void {
        const value = (event.value || '');

        if (value) {
            this.data.items.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    removeItem(item: string): void {
        const index = this.data.items.indexOf(item);

        if (index >= 0) {
            this.data.items.splice(index, 1);
        }
    }
}