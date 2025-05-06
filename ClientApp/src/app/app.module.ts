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

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { LotsComponent } from './components/auction/lots/lots.component';
import { BiddersComponent } from './components/auction/bidders/bidders.component';
import { DonationsComponent } from './components/auction/donations/donations.component';
import { FinalizeComponent } from './components/auction/finalize/finalize.component';
import { CheckoutComponent } from './components/auction/checkout/checkout.component';

import { ToolsComponent } from './components/utility/tools/tools.component';
import { PreferencesComponent } from './components/utility/preferences/preferences.component';

import { YearlyReportComponent } from './components/reports/yearly/yearly.component';
import { ComparisonReportComponent } from './components/reports/comparison/comparison.component';

//========================= Dialogs =========================
import { BidderAddEditDialog } from './dialogs/BidderAddEdit/BidderAddEdit.dialog';
import { LotAddEditDialog } from './dialogs/lotAddEdit/lotAddEdit.dialog';
import { DonationsAddEditDialog } from './dialogs/DonationsAddEdit/DonationsAddEdit.dialog';
import { LotFinalizeDialog } from './dialogs/lotFinalize/lotFinalize.dialog';
import { CheckoutDialog } from './dialogs/checkout/checkout.dialog';
import { ConfirmationDialog } from './dialogs/confirmation/confirmation.dialog';
import { PrintReceiptDialog } from './dialogs/printReceipt/printReceipt.dialog';

//========================= Helpers =========================
import { cookies } from './helpers/cookies';
import { Guid } from './helpers/guid';
import { ScreenSize } from './helpers/screenSize';
import { SnackBarHelper } from './helpers/snackBar';

//========================= Services =========================
import { SessionService } from './services/sessionService';
import { BiddersService } from './services/biddersService';
import { LotsService } from './services/lotsService';
import { PreferencesService } from './services/preferencesService';
import { DonationsService } from './services/donationsService';

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
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    LotsComponent,
    BiddersComponent,
    DonationsComponent,
    FinalizeComponent,
    CheckoutComponent,
    ToolsComponent,
    PreferencesComponent,
    YearlyReportComponent,
    ComparisonReportComponent,
    BidderAddEditDialog,
    LotAddEditDialog,
    DonationsAddEditDialog,
    LotFinalizeDialog,
    CheckoutDialog,
    ConfirmationDialog,
    PrintReceiptDialog
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
    MatGridListModule,
    MatPasswordStrengthModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'app', component: HomeComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
        { path: 'dashboard', component: DashboardComponent },

        { path: 'lots', component: LotsComponent },
        { path: 'bidders', component: BiddersComponent },
        { path: 'donations', component: DonationsComponent },
        { path: 'finalize', component: FinalizeComponent },
        { path: 'checkout', component: CheckoutComponent },
        
        { path: 'tools', component: ToolsComponent },
        { path: 'preferences', component: PreferencesComponent },

        { path: 'yearlyreport', component: YearlyReportComponent },
        { path: 'comparisonreport', component: ComparisonReportComponent }
      ]},
      { path: '**', redirectTo: 'app' }
    ], { useHash: true }),
  ],
  providers: [cookies, Guid, ScreenSize, SnackBarHelper, SessionService, BiddersService, LotsService, PreferencesService, DonationsService],
  entryComponents: [
    BidderAddEditDialog,
    LotAddEditDialog,
    DonationsAddEditDialog,
    LotFinalizeDialog,
    CheckoutDialog,
    ConfirmationDialog,
    PrintReceiptDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
