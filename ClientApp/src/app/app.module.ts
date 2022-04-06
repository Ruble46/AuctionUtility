//========================= Core =========================
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//========================= Components =========================
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './components/home/home.component';
import { AuctionComponent } from './components/home/auction/auction.component';
import { CheckoutComponent } from './components/home/checkout/checkout.component';
import { ToolsComponent } from './components/home/tools/tools.component';

//========================= Dailogs =========================
import { BidderAddEditViewDialog } from './dialogs/BidderAddEditView/BidderAddEditView.dialog';
import { LotAddEditViewDialog } from './dialogs/LotAddEditView/LotAddEditView.dialog';
import { CheckoutDialog } from './dialogs/checkout/checkout.dialog';
import { ConfirmationDialog } from './dialogs/confirmation/confirmation.dialog';

//========================= Helpers =========================
import { cookies } from './helpers/cookies';
import { Guid } from './helpers/guid';
import { ScreenSize } from './helpers/screenSize';
import { SnackBarHelper } from './helpers/snackBar';

//========================= Services =========================
import { SessionService } from './services/sessionService';
import { BiddersService } from './services/biddersService';
import { LotsService } from './services/lotsService';

//========================= Material =========================
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AuctionComponent,
    CheckoutComponent,ToolsComponent,
    BidderAddEditViewDialog,
    LotAddEditViewDialog,
    CheckoutDialog,
    ConfirmationDialog,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,

    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    MatExpansionModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatStepperModule,
    MatChipsModule,
    MatPasswordStrengthModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'app', component: HomeComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'auction' },
        { path: 'auction', component: AuctionComponent },
        { path: 'checkout', component: CheckoutComponent },
        { path: 'tools', component: ToolsComponent }
      ]},
      { path: '**', redirectTo: 'app' }
    ], { useHash: true }),
  ],
  providers: [cookies, Guid, ScreenSize, SnackBarHelper, SessionService, BiddersService, LotsService],
  entryComponents: [
    BidderAddEditViewDialog,
    LotAddEditViewDialog,
    CheckoutDialog,
    ConfirmationDialog,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
