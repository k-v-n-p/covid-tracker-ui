import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { CovidStatsComponent } from './components/covid-stats/covid-stats.component';
import { CovidDataService } from './services/covid-data.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import {StatGraphComponent} from './components/stat-graph/stat-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    CovidStatsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    ButtonModule,
    DatePipe,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    CardModule,
    StatGraphComponent,
    ProgressSpinnerModule,
    DropdownModule,
  ],
  providers: [CovidDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
