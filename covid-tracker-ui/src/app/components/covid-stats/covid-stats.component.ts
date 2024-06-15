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
  selectedOption:Option; 
  dropdownOptions: Option[] = [];


  constructor(private covidDataService: CovidDataService) { }

  ngOnInit(): void {
    this.loadStateInfo();
    this.loadStateData('az');
  }

  loadStateInfo(){
    this.covidDataService.getStateInfo().subscribe(
      (data: any[]) => {
        // Assuming the data is already sorted by date descending
        data.map((info, index) => 
          this.dropdownOptions.push({state:info.name, key:info.state})
        );
        if (data) {this.loading=false;}
        console.log(this.dropdownOptions);
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
    if (index === 0) {
      return ''; // No previous day to compare with for the first day
    }
    const positiveIncreaseCases = data[index].positiveIncrease;
    if (positiveIncreaseCases > 0) {
      return 'pi pi-arrow-up'; // Rise compared to previous day
    } else if (positiveIncreaseCases < 0) {
      return 'pi pi-arrow-down'; // Fall compared to previous day
    } else {
      return ''; // No change compared to previous day
    }
  }
  onDropdownChange() {
    this.loading = true;
    this.loadStateData(this.selectedOption.key.toLowerCase());
  }
}