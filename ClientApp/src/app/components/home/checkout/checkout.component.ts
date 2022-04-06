import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Bidder, Checkout, Lot } from 'src/app/classes/classes';
import { CheckoutDialog } from 'src/app/dialogs/checkout/checkout.dialog';
import { ConfirmationDialog } from 'src/app/dialogs/confirmation/confirmation.dialog';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { BiddersService } from 'src/app/services/biddersService';
import { LotsService } from 'src/app/services/lotsService';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../../../../theme/theme.css', './checkout.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class CheckoutComponent implements OnInit {
  bidders: Bidder[];
  lots: Lot[];
  checkouts: Checkout[];
  displayedColumns: string[] = ['buyerNumber', 'buyerName', 'totalItems', 'total', 'actions'];
  dataSource: MatTableDataSource<Checkout>;

  constructor(public dialog: MatDialog, public biddersService: BiddersService, public lotsService: LotsService, public sbh: SnackBarHelper) {
    
  }

  ngOnInit() {
    this.RetrieveData();
  }

  RetrieveData() {
    this.biddersService.GetAll().subscribe(result => {
      this.bidders = result.body;

      this.lotsService.GetAll().subscribe(result => {
        this.lots = result.body;
        this.InitializeCheckouts();
      }, error => {
        this.lots = new Array();
        this.sbh.openSnackBar("Failed to retrieve all lots from the server", "Dismiss", 3000);
        console.error(error);
      })
    }, error => {
      this.bidders = new Array();
      this.sbh.openSnackBar("Failed to retrieve all bidders from the server", "Dismiss", 3000);
      console.error(error);
    });
  }

  InitializeCheckouts() {
    this.checkouts = new Array<Checkout>();

    for(let a = 0; a < this.bidders.length; a++) {
      let tempCheckout: Checkout = {
        bidder: {
            name: '',
            number: undefined,
            hasPaid: false
        },
        lots: new Array<Lot>(),
        total: 0.00,
        totalItems: 0,
      }

      for(let b = 0; b < this.lots.length; b++) {
        if(this.bidders[a].number == this.lots[b].buyerNumber) {
          tempCheckout.bidder = this.bidders[a];
          tempCheckout.lots.push(this.lots[b]);
          tempCheckout.total += this.lots[b].finalBid;
          tempCheckout.totalItems += this.lots[b].itemsCount;
        }
      }
      if(tempCheckout.lots.length > 0) {
        this.checkouts.push(tempCheckout);
      }
    }

    this.dataSource = new MatTableDataSource(this.checkouts);
  }

  checkoutBidder(checkout: Checkout) {
    const dialogRef = this.dialog.open(CheckoutDialog, {
      data: checkout,
      position: {
        top: '10vh'
      },
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        checkout.bidder.hasPaid = true;

        this.biddersService.Edit(checkout.bidder).subscribe(result => {
          this.sbh.openSnackBar("Bidder '" + checkout.bidder.name + "' has been checked out successfully", "Dismiss", 3000);
          this.RetrieveData();
        }, error => {
          console.error(error);
          this.sbh.openSnackBar("Failed to checkout the user '" + checkout.bidder.name + "'", "Dismiss", 3000);
          checkout.bidder.hasPaid = false;
        });
      }
    });
  }

  undoCheckout(checkout: Checkout) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: "Are you sure you want to undo the checkout for bidder #" + checkout.bidder.number + "?",
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        checkout.bidder.hasPaid = false;

        this.biddersService.Edit(checkout.bidder).subscribe(result => {
          this.sbh.openSnackBar("Bidder '" + checkout.bidder.name + "' checkout has been reverted successfully", "Dismiss", 3000);
          this.RetrieveData();
        }, error => {
          console.error(error);
          this.sbh.openSnackBar("Failed to undo checkout for user '" + checkout.bidder.name + "'", "Dismiss", 3000);
          checkout.bidder.hasPaid = true;
        });
      }
    });
  }
}