import { Component, Input, OnChanges, OnInit , SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CovidData } from '../../types/covid-data';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

interface Option {
  label: string;
  key: string;
  title: string;
}

@Component({
  selector: 'app-stat-graph',
  templateUrl: './stat-graph.component.html',
  styleUrls: ['./stat-graph.component.css'],
  standalone: true,
  imports: [FormsModule, CardModule, ChartModule, DropdownModule],
})

export class StatGraphComponent implements OnInit{
  @Input() stateData: any; 
  @Input() key: string; 
  @Input() loading: boolean = true; //use later if multiple api for graphs needed
  data: any;
  options: any;
  selectedOption:Option; 
  dropdownOptions: Option[] = [
    { label: 'Deaths', key: 'deathIncrease' , title: 'Rise in deaths'},
    { label: '+ve cases', key: 'positiveIncrease', title: 'Rise in Positive cases' }
  ];

  constructor() {
    this.selectedOption = this.dropdownOptions[0]; 
  }

  loadGraph() {
    // Update [key] binding based on selected option
    const deathIncreases = this.stateData.slice(0, 10).map(item => item[this.selectedOption.key]);
    const dateChecked = this.stateData.slice(0, 10).map(item => item.dateChecked.substring(5, 7) +"/"+ item.dateChecked.substring(8, 10));
    this.data = {
      labels: dateChecked,
      datasets: [
        {
          label: this.selectedOption.key,
          data: deathIncreases,
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    };
  }

  ngOnInit(): void {
    this.loadGraph()
    this.options = {
      responsive: true,
      title: {
        display: false,
        text: 'Line chart'
      },
      scales: {
        x: {
          // type: 'timeseries',
          // source: 'auto',
          autoSkip: true,
          labelString: 'Time'
        },
        y: {
          labelString: 'Count',
          beginAtZero: true
        }
      }
    };
  }

  onDropdownChange() {
    this.loadGraph()
  }


}
