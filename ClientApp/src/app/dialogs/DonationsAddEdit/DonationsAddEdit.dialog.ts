import { DialogMode, Donation, DonationsDialogData } from '../../classes/classes';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarHelper } from '../../helpers/snackBar';
import { ConfirmationDialog } from '../confirmation/confirmation.dialog';
import { DonationsService } from 'src/app/services/donationsService';

@Component({
    selector: 'DonationsAddEdit',
    templateUrl: 'DonationsAddEdit.dialog.html',
    styleUrls: ['DonationsAddEdit.dialog.css']
})
export class DonationsAddEditDialog {

    @ViewChild('autoFocus', { static: false }) private amountInput: ElementRef;
    public isAdd: boolean = false;
    public isEdit: boolean = false;
    public data: Donation;

    constructor(public dialogRef: MatDialogRef<DonationsAddEditDialog>, @Inject(MAT_DIALOG_DATA) public dataIncoming: DonationsDialogData, public sbh: SnackBarHelper, private dialog: MatDialog, public donationsService: DonationsService) {
        this.data = JSON.parse(JSON.stringify(dataIncoming.data));

        if (this.dataIncoming.mode == DialogMode.edit) {
            this.isAdd = false;
            this.isEdit = true;
        } else if (this.dataIncoming.mode == DialogMode.add) {
            this.isAdd = true;
            this.isEdit = false;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.amountInput.nativeElement.focus();
        }, 250);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    verifyNumber() {
        if(this.data.amount <= 0) {
            this.sbh.openSnackBar("Donation amount must be more than $0", "Dismiss", 3000);
            return;
        }

        if (this.isAdd) {
            this.donationsService.Add(this.data).subscribe(result => {
                this.sbh.openSnackBar(result.body, "Dismiss", 3000);
                this.dialogRef.close("add");
            }, error => {
                this.sbh.openSnackBar("Failed to add donation of $" + this.data.amount, "Dismiss", 3000);
                console.error(error);
            });
        } else {
            this.donationsService.Edit(this.data).subscribe(result => {
                this.sbh.openSnackBar(result.body, "Dismiss", 3000);
                this.dialogRef.close("edit");
            }, error => {
                this.sbh.openSnackBar("Failed to add donation of $" + this.data.amount, "Dismiss", 3000);
                console.error(error);
            });
        }
    }

    onDeleteClick() {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: "Are you sure you want to delete donation of $'" + this.data.amount + "'?"
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.donationsService.DeleteSingle(this.data.id).subscribe(result => {
                    this.sbh.openSnackBar(result.body, "Dismiss", 3000);
                    this.dialogRef.close("delete");
                }, error => {
                    this.sbh.openSnackBar("Failed to delete donation", "Dismiss", 3000);
                    console.error(error);
                });
            }
        });
    }
}