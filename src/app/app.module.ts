import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatSidenavModule, MatGridListModule, MatListModule, MatCardModule,
         MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule,
         MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SessionHealthComponent } from './sessions/session-health/session-health.component';
import { SessionOrdersComponent } from './sessions/session-orders/session-orders.component';
import { SessionSalesComponent } from './sessions/session-sales/session-sales.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { ServerComponent } from './server/server.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SessionHealthComponent,
    SessionOrdersComponent,
    SessionSalesComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
