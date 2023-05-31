import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BidderAddEditDialog } from '../../../dialogs/BidderAddEdit/BidderAddEdit.dialog';
import { Bidder, DialogMode, BidderDialogData } from '../../../classes/classes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BiddersService } from 'src/app/services/biddersService';
import { SnackBarHelper } from 'src/app/helpers/snackBar';

@Component({
    selector: 'bidders',
    templateUrl: './bidders.component.html',
    styleUrls: ['../../../../theme/theme.css', './bidders.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class BiddersComponent implements OnInit {
    bidders: Array<Bidder>;
    dataSourceBidders: any;
    public requestCount: number;

    displayedColumns: string[] = ['number', 'name', 'actions'];

    constructor(public dialog: MatDialog, public bidderService: BiddersService, public sbh: SnackBarHelper) {
        this.bidders = new Array<Bidder>();
        this.requestCount = 0;
    }

    ngOnInit() {
        this.requestCount++;
        this.bidderService.GetAll().subscribe(result => {
            this.bidders = result.body;
            this.dataSourceBidders = new MatTableDataSource(this.bidders);
            this.requestCount--;
        }, error => {
            this.bidders = new Array();
            this.dataSourceBidders = new MatTableDataSource(this.bidders);
            this.sbh.openSnackBar("Failed to retrieve bidders from the server", "Dismiss", 3000);
            console.error(error);
            this.requestCount--;
        });
    }

    getBidderNextNumber(): number {
        if(this.bidders.length == 0) {
            return 1;
        }
        
        let last: number = this.bidders[this.bidders.length - 1].number;

        this.bidders.sort((a, b) => (a.number > b.number) ? 1 : -1);

        if(this.bidders.length != last) { //Missing bidder numbers in sequence
            for(let i = 0; i < this.bidders.length; i++) {
                if(this.bidders[i].number != i + 1) {
                    return i + 1;
                }
            }
        } else { //No missing bidder numbers in sequence
            return this.bidders[this.bidders.length - 1].number + 1;
        }

        return 0;
    }

    addBidder() {
        var bidder: Bidder = {
            name: "",
            number: this.getBidderNextNumber(),
            hasPaid: false,
            auctionYear: undefined
        }

        const dialogRef = this.dialog.open(BidderAddEditDialog, {
            data: new BidderDialogData(DialogMode.add, bidder),
            position: {
                top: '10vh'
            },
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.requestCount++;
                this.bidderService.GetAll().subscribe(result => {
                    this.bidders = result.body;
                    this.dataSourceBidders = new MatTableDataSource(this.bidders);
                    this.requestCount--;
                }, error => {
                    this.bidders = new Array();
                    this.dataSourceBidders = new MatTableDataSource(this.bidders);
                    this.sbh.openSnackBar("Failed to retrieve bidders from the server", "Dismiss", 3000);
                    console.error(error);
                    this.requestCount--;
                });
            }
        });
    }

    editBidder(bidder: Bidder) {
        const dialogRef = this.dialog.open(BidderAddEditDialog, {
            data: new BidderDialogData(DialogMode.edit, bidder),
            position: {
                top: '10vh'
            },
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.requestCount++;
                this.bidderService.GetAll().subscribe(result => {
                    this.bidders = result.body;
                    this.dataSourceBidders = new MatTableDataSource(this.bidders);
                    this.requestCount--;
                }, error => {
                    this.bidders = new Array();
                    this.dataSourceBidders = new MatTableDataSource(this.bidders);
                    this.sbh.openSnackBar("Failed to retrieve bidders from the server", "Dismiss", 3000);
                    console.error(error);
                    this.requestCount--;
                });
            }
        });
    }

    getBidderInfo(buyerNumber: number): string {
        if (buyerNumber == null || buyerNumber == undefined) {
            return "";
        }

        for (let i = 0; i < this.bidders.length; i++) {
            if (this.bidders[i].number == buyerNumber) {
                return this.bidders[i].name + " (#" + buyerNumber + ")";
            }
        }

        return "";
    }
}