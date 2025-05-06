import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { DialogMode, Donation, DonationsDialogData } from 'src/app/classes/classes';
import { DonationsService } from 'src/app/services/donationsService';
import { MatTableDataSource } from '@angular/material/table';
import { DonationsAddEditDialog } from 'src/app/dialogs/DonationsAddEdit/DonationsAddEdit.dialog';

@Component({
    selector: 'donations',
    templateUrl: './donations.component.html',
    styleUrls: ['../../../../theme/theme.css', './donations.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class DonationsComponent implements OnInit {
    donations: Array<Donation>;
    dataSourceDonations: any;
    public requestCount: number;

    displayedColumns: string[] = ['amount', 'actions'];

    constructor(public dialog: MatDialog, private donationsService: DonationsService, private sbh: SnackBarHelper) {
        this.donations = new Array<Donation>();
        this.requestCount = 0;
    }

    ngOnInit() {
        this.requestCount++;
        this.donationsService.GetAll().subscribe(result => {
            this.donations = result.body;
            this.dataSourceDonations = new MatTableDataSource(this.donations);
            this.requestCount--;
        }, error => {
            this.donations = new Array();
            this.dataSourceDonations = new MatTableDataSource(this.donations);
            this.sbh.openSnackBar("Failed to retrieve donations from the server", "Dismiss", 3000);
            console.error(error);
            this.requestCount--;
        });
    }

    addDonation() {
        var donation: Donation = new Donation();

        const dialogRef = this.dialog.open(DonationsAddEditDialog, {
            data: new DonationsDialogData(DialogMode.add, donation),
            position: {
                top: '10vh'
            },
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.requestCount++;
                this.donationsService.GetAll().subscribe(result => {
                    this.donations = result.body;
                    this.dataSourceDonations = new MatTableDataSource(this.donations);
                    this.requestCount--;
                }, error => {
                    this.donations = new Array();
                    this.dataSourceDonations = new MatTableDataSource(this.donations);
                    this.sbh.openSnackBar("Failed to retrieve donations from the server", "Dismiss", 3000);
                    console.error(error);
                    this.requestCount--;
                });
            }
        });
    }

    editDonation(donation: Donation) {
        const dialogRef = this.dialog.open(DonationsAddEditDialog, {
            data: new DonationsDialogData(DialogMode.edit, donation),
            position: {
                top: '10vh'
            },
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.requestCount++;
                this.donationsService.GetAll().subscribe(result => {
                    this.donations = result.body;
                    this.dataSourceDonations = new MatTableDataSource(this.donations);
                    this.requestCount--;
                }, error => {
                    this.donations = new Array();
                    this.dataSourceDonations = new MatTableDataSource(this.donations);
                    this.sbh.openSnackBar("Failed to retrieve donations from the server", "Dismiss", 3000);
                    console.error(error);
                    this.requestCount--;
                });
            }
        });
    }
}