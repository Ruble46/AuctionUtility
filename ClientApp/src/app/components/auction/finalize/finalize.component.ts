import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BidderAddEditDialog } from '../../../dialogs/BidderAddEdit/BidderAddEdit.dialog';
import { Lot, Bidder, LotDialogData, DialogMode, BidderDialogData } from '../../../classes/classes';
import { LotAddEditDialog } from '../../../dialogs/lotAddEdit/lotAddEdit.dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BiddersService } from 'src/app/services/biddersService';
import { LotsService } from 'src/app/services/lotsService';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { LotFinalizeDialog } from 'src/app/dialogs/lotFinalize/lotFinalize.dialog';

@Component({
    selector: 'finalize',
    templateUrl: './finalize.component.html',
    styleUrls: ['../../../../theme/theme.css', './finalize.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class FinalizeComponent implements OnInit {
    @ViewChild('scrollToMeLots') public myScrollLotsTable: ElementRef;
    bidders: Array<Bidder>;
    lots: Array<Lot>;
    dataSourceBidders: any;
    dataSourceLots: any;
    expandedLot: Lot = null;

    displayedColumns: string[] = ['number', 'name', 'actions'];
    displayedColumns2: string[] = ['lotNumber', 'itemsCount', 'items', 'actions'];
    displayedColumns3: string[] = ['lotNumber', 'buyer', 'finalBid', 'actions'];

    constructor(public dialog: MatDialog, public bidderService: BiddersService, public lotsService: LotsService, public sbh: SnackBarHelper) {
        this.bidders = new Array<Bidder>();
        this.lots = new Array<Lot>();
    }

    ngOnInit() {
        this.lotsService.GetAll().subscribe(result => {
            this.lots = result.body;
            let sum: number = 0;
            
            for(let i = 0; i < this.lots.length; i++) {
                if(this.lots[i].finalBid != 0) {
                    sum += this.lots[i].finalBid;
                }
            }
            
            this.dataSourceLots = new MatTableDataSource(this.lots);
        }, error => {
            this.lots = new Array();
            this.dataSourceLots = new MatTableDataSource(this.lots);
            this.sbh.openSnackBar("Failed to retrieve lots from the server", "Dismiss", 3000);
            console.error(error);
        })

        this.bidderService.GetAll().subscribe(result => {
            this.bidders = result.body;
            this.dataSourceBidders = new MatTableDataSource(this.bidders);
        }, error => {
            this.bidders = new Array();
            this.dataSourceBidders = new MatTableDataSource(this.bidders);
            this.sbh.openSnackBar("Failed to retrieve bidders from the server", "Dismiss", 3000);
            console.error(error);
        });
    }

    //-------------------- BIDDER LOGIC --------------------
    getBidderNextNumber(): number {
        if(this.bidders.length == 0) {
            return 1;
        }
        
        let last: number = this.bidders[this.bidders.length - 1].number;

        this.bidders.sort((a, b) => (a.number > b.number) ? 1 : -1);

        if(this.bidders.length != last) { //Missing lot numbers in sequence
            for(let i = 0; i < this.bidders.length; i++) {
                if(this.bidders[i].number != i + 1) {
                    return i + 1;
                }
            }
        } else { //No missing lot numbers in sequence
            return this.bidders[this.bidders.length - 1].number + 1;
        }

        return 0;
    }

    addBidder() {
        var bidder: Bidder = {
            name: "",
            number: this.getBidderNextNumber(),
            hasPaid: false
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
                this.bidderService.GetAll().subscribe(result => {
                    this.bidders = result.body;
                    this.dataSourceBidders = new MatTableDataSource(this.bidders);
                }, error => {
                    this.bidders = new Array();
                    this.dataSourceBidders = new MatTableDataSource(this.bidders);
                    this.sbh.openSnackBar("Failed to retrieve bidders from the server", "Dismiss", 3000);
                    console.error(error);
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
                this.bidderService.GetAll().subscribe(result => {
                    this.bidders = result.body;
                    this.dataSourceBidders = new MatTableDataSource(this.bidders);
                }, error => {
                    this.bidders = new Array();
                    this.dataSourceBidders = new MatTableDataSource(this.bidders);
                    this.sbh.openSnackBar("Failed to retrieve bidders from the server", "Dismiss", 3000);
                    console.error(error);
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

    //-------------------- LOT LOGIC --------------------
    getNextLotNumber(): number {
        if(this.lots.length ==0) {
            return 1;
        }

        let last: number = this.lots[this.lots.length - 1].lotNumber;

        this.lots.sort((a, b) => (a.lotNumber > b.lotNumber) ? 1 : -1);

        if(this.lots.length != last) { //Missing lot numbers in sequence
            for(let i = 0; i < this.lots.length; i++) {
                if(this.lots[i].lotNumber != i + 1) {
                    return i + 1;
                }
            }
        } else { //No missing lot numbers in sequence
            return this.lots[this.lots.length - 1].lotNumber + 1;
        }

        return 0;
    }

    addLot() {
        var lot: Lot = {
            lotNumber: this.getNextLotNumber(),
            items: new Array<string>(0),
            finalBid: undefined,
            buyerNumber: undefined,
        }

        const dialogRef = this.dialog.open(LotAddEditDialog, {
            data: new LotDialogData(DialogMode.add, lot),
            position: {
                top: '10vh'
            },
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.lotsService.GetAll().subscribe(result => {
                    this.lots = result.body;
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                    setTimeout(() => {
                        this.scrollToLotBottom();
                    }, 200);
                }, error => {
                    this.lots = new Array();
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                    this.sbh.openSnackBar("Failed to retrieve lots from the server", "Dismiss", 3000);
                    console.error(error);
                });
            }
        });
    }

    editLot(lot: Lot) {
        const dialogRef = this.dialog.open(LotAddEditDialog, {
            data: new LotDialogData(DialogMode.edit, lot),
            position: {
                top: '10vh'
            },
            width: '600px'
        });

        //result will be undefined for close or cancel
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.lotsService.GetAll().subscribe(result => {
                    this.lots = result.body;
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                }, error => {
                    this.lots = new Array();
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                    this.sbh.openSnackBar("Failed to retrieve lots from the server", "Dismiss", 3000);
                    console.error(error);
                });
            }
        });
    }

    finalizeLot(lot: Lot) {
        const dialogRef = this.dialog.open(LotFinalizeDialog, {
            data: lot,
            position: {
                top: '10vh'
            },
            width: '600px'
        });

        //result will be undefined for close or cancel
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.lotsService.GetAll().subscribe(result => {
                    this.lots = result.body;
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                }, error => {
                    this.lots = new Array();
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                    this.sbh.openSnackBar("Failed to retrieve lots from the server", "Dismiss", 3000);
                    console.error(error);
                });
            }
        });
    }

    scrollToLotBottom() {
        try {
            this.myScrollLotsTable.nativeElement.scrollTop = this.myScrollLotsTable.nativeElement.scrollHeight;
        } catch(err) {
            console.error(err);
        }
    }
}