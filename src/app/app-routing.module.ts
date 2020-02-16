import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionSalesComponent } from './sessions/session-sales/session-sales.component';
import { SessionOrdersComponent } from './sessions/session-orders/session-orders.component';
import { SessionHealthComponent } from './sessions/session-health/session-health.component';


const routes: Routes = [
  { path: 'sales', component: SessionSalesComponent },
  { path: 'orders', component: SessionOrdersComponent },
  { path: 'health', component: SessionHealthComponent },

  { path: '', redirectTo: '/sales', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
