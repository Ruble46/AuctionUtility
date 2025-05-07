import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Lot, Bidder, FinalizeDialogResponse, FinalizeStepChoice } from '../../../classes/classes';
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
    bidders: Array<Bidder>;
    lots: Array<Lot>;
    dataSourceLots: any;
    public requestCount: number;

    displayedColumns: string[] = ['lotNumber', 'buyer', 'finalBid', 'actions'];

    constructor(public dialog: MatDialog, public bidderService: BiddersService, public lotsService: LotsService, public sbh: SnackBarHelper) {
        this.bidders = new Array<Bidder>();
        this.lots = new Array<Lot>();
        this.requestCount = 0;
    }

    ngOnInit() {
        this.requestCount++;
        this.lotsService.GetAll().subscribe(result => {
            this.lots = result.body;
            let sum: number = 0;
            
            for(let i = 0; i < this.lots.length; i++) {
                if(this.lots[i].finalBid != 0) {
                    sum += this.lots[i].finalBid;
                }
            }
            
            this.dataSourceLots = new MatTableDataSource(this.lots);
            this.requestCount--;
        }, error => {
            this.lots = new Array();
            this.dataSourceLots = new MatTableDataSource(this.lots);
            this.sbh.openSnackBar("Failed to retrieve lots from the server", "Dismiss", 3000);
            console.error(error);
            this.requestCount--;
        })

        this.requestCount++;
        this.bidderService.GetAll().subscribe(result => {
            this.bidders = result.body;
            this.requestCount--;
        }, error => {
            this.bidders = new Array();
            this.sbh.openSnackBar("Failed to retrieve bidders from the server", "Dismiss", 3000);
            console.error(error);
            this.requestCount--;
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
                let savedData = result as FinalizeDialogResponse;
                let indexOfEntry = this.lots.findIndex(lot => lot.lotNumber == savedData.lot.lotNumber);
                this.lots[indexOfEntry] = savedData.lot;
                this.dataSourceLots = new MatTableDataSource(this.lots);

                if(savedData.choice == FinalizeStepChoice.Next) {
                    if(indexOfEntry < this.lots.length - 1) {
                        this.finalizeLot(this.lots[indexOfEntry + 1]);
                    }
                } else if(savedData.choice == FinalizeStepChoice.Previous) {
                    if(indexOfEntry > 0) {
                        this.finalizeLot(this.lots[indexOfEntry - 1]);
                    }
                }
            }
        });
    }
}