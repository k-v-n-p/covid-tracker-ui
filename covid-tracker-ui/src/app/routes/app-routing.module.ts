import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidStatsComponent } from '../components/covid-stats/covid-stats.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'stats', component: CovidStatsComponent },
  { path: '', redirectTo: '/stats', pathMatch: 'full' },
  { path: 'covid-stats', component: CovidStatsComponent }, //added in case of on click modal for graphs&stats

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
