import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Lot, LotDialogData, DialogMode } from '../../../classes/classes';
import { LotAddEditDialog } from '../../../dialogs/lotAddEdit/lotAddEdit.dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LotsService } from 'src/app/services/lotsService';
import { SnackBarHelper } from 'src/app/helpers/snackBar';

@Component({
    selector: 'lots',
    templateUrl: './lots.component.html',
    styleUrls: ['../../../../theme/theme.css', './lots.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class LotsComponent implements OnInit {
    @ViewChild('scrollToMeLots') public myScrollLotsTable: ElementRef;
    lots: Array<Lot>;
    dataSourceLots: any;
    public requestCount: number;

    displayedColumns: string[] = ['lotNumber', 'itemsCount', 'items', 'actions'];

    constructor(public dialog: MatDialog, public lotsService: LotsService, public sbh: SnackBarHelper) {
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
        });
    }

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
            auctionYear: undefined
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
                this.requestCount++;
                this.lotsService.GetAll().subscribe(result => {
                    this.lots = result.body;
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                    this.requestCount--;

                    setTimeout(() => {
                        this.scrollToLotBottom();
                    }, 200);
                }, error => {
                    this.lots = new Array();
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                    this.sbh.openSnackBar("Failed to retrieve lots from the server", "Dismiss", 3000);
                    console.error(error);
                    this.requestCount--;
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
                this.requestCount++;
                this.lotsService.GetAll().subscribe(result => {
                    this.lots = result.body;
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                    this.requestCount--;
                }, error => {
                    this.lots = new Array();
                    this.dataSourceLots = new MatTableDataSource(this.lots);
                    this.sbh.openSnackBar("Failed to retrieve lots from the server", "Dismiss", 3000);
                    console.error(error);
                    this.requestCount--;
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