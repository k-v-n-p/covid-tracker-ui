import { Component, Input, OnInit } from '@angular/core';
import { CovidDataService } from '../../services/covid-data.service'

interface Option {
  state: string;
  key: string;
}

@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.css'],
})

export class CovidStatsComponent implements OnInit {
  stateData: any[] = [];
  loading: boolean = true;
  data: any;
  options: any;
  selectedOption:Option={state: "Arizona", key:"az"};//default option 
  dropdownOptions: Option[] = [];


  constructor(private covidDataService: CovidDataService) { }

  ngOnInit(): void {
    this.loadStateInfo();
    this.loadStateData(this.selectedOption.key);
  }

  loadStateInfo(){
    this.covidDataService.getStateInfo().subscribe(
      (data: any[]) => {
        // Assuming the data is already sorted by date descending
        data.map((info, index) => 
          this.dropdownOptions.push({state:info.name, key:info.state})
        );
      },
      error => {
        console.error('Error fetching states information: ', error);
      }
    );

  }

  loadStateData(key:string) {
    this.covidDataService.getDailyData(key).subscribe(
      (data: any[]) => {
        // Assuming the data is already sorted by date descending
        this.stateData = data.map((day, index) => ({
          ...day,
          increaseDecreaseIcon: this.calculateIncreaseDecreaseIcon(index, data)
        }));
        if (data) {this.loading=false;}
      },
      error => {
        console.error('Error fetching Arizona data: ', error);
      }
    );
  }

  calculateIncreaseDecreaseIcon(index: number, data: any[]): string { 
    //icon to determine rise or fall, but made no sense as it is is almost always rising
    if (index === 0) {
      return ''; 
    }
    const positiveIncreaseCases = data[index].positiveIncrease;
    if (positiveIncreaseCases > 0) {
      return 'pi pi-arrow-up'; 
    } else if (positiveIncreaseCases < 0) {
      return 'pi pi-arrow-down'; 
    } else {
      return ''; 
    }
  }
  onDropdownChange() {
    this.loading = true;
    this.loadStateData(this.selectedOption.key.toLowerCase());
  }
}