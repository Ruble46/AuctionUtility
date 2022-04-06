import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BidderAddEditViewDialog } from '../../../dialogs/BidderAddEditView/BidderAddEditView.dialog';
import { Lot, Bidder, LotDialogData, DialogMode, BidderDialogData } from '../../../classes/classes';
import { LotAddEditViewDialog } from '../../../dialogs/LotAddEditView/LotAddEditView.dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BiddersService } from 'src/app/services/biddersService';
import { LotsService } from 'src/app/services/lotsService';
import { SnackBarHelper } from 'src/app/helpers/snackBar';

@Component({
  selector: 'auction',
  templateUrl: './auction.component.html',
  styleUrls: ['../../../../theme/theme.css', './auction.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AuctionComponent implements OnInit {
  bidders: Array<Bidder>;
  lots: Array<Lot>;
  dataSourceBidders: any;
  dataSourceLots: any;
  expandedLot: Lot = null;

  displayedColumns: string[] = ['number', 'name', 'actions'];
  displayedColumns2: string[] = ['lotNumber', 'itemsCount', 'finalBid', 'buyerNumber', 'actions'];

  constructor(public dialog: MatDialog, public bidderService: BiddersService, public lotsService: LotsService, public sbh: SnackBarHelper) {
    this.bidders = new Array<Bidder>();
    this.lots = new Array<Lot>();
  }

  ngOnInit() {
    this.lotsService.GetAll().subscribe(result => {
      this.lots = result.body;
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
  addBidder() {
    var bidder: Bidder = {
      name: "",
      number: undefined,
      hasPaid: false
    }

    const dialogRef = this.dialog.open(BidderAddEditViewDialog, {
      data: new BidderDialogData(DialogMode.add, bidder),
      position: {
        top: '10vh'
      },
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
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

  viewBidder(bidder: Bidder, location: number) {
    const dialogRef = this.dialog.open(BidderAddEditViewDialog, {
      data: new BidderDialogData(DialogMode.view, bidder),
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
        })
      }
    });
  }

  //-------------------- LOT LOGIC --------------------
  addLot() {
    var lot: Lot = {
      lotNumber: undefined,
      items: new Array<string>(1),
      itemsCount: 1,
      finalBid: undefined,
      buyerNumber: undefined,
    }

    const dialogRef = this.dialog.open(LotAddEditViewDialog, {
       data: new LotDialogData(DialogMode.add, lot),
       position: {
         top: '10vh'
       },
       width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
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

  viewLot(lot: Lot, location: number) {
    console.log(location);

    const dialogRef = this.dialog.open(LotAddEditViewDialog, {
      data: new LotDialogData(DialogMode.view, lot),
      position: {
        top: '10vh'
      },
      width: '600px'
    });

    //result will be undefined for close on view or cancel on edit
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
}