import { Component } from '@angular/core';
//import { ChartOptions, ChartType, ChartData } from 'chart.js';
//import { PluginOptionsByType } from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';
//import { Chart } from 'chart.js';

// Registrar plugin
//Chart.register(ChartDataLabels);

/*type BarChartOptions = ChartOptions<'bar'> & {
  plugins: PluginOptionsByType<'bar'> & {
    datalabels?: any;
  };
};*/

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  /*
  confusionData: ChartData<'bar'> = {
    labels: ['MiniDonuts', 'Rosquillas', 'Croissant'],
    datasets: [{
      label: 'Predicciones Correctas',
      data: [95, 88, 76],
      backgroundColor: ['#4caf50', '#2196f3', '#ff9800']
    }]
  };

  confusionOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        align: 'center',
        labels: {
          color: '#000'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value: number) => `${value}%`,
        color: '#000'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };


  accuracyData: ChartData<'line'> = {
    labels: ['Época 1', 'Época 2', 'Época 3', 'Época 4', 'Época 5'],
    datasets: [{
      label: 'Precisión',
      data: [60, 70, 78, 85, 88],
      fill: false,
      borderColor: '#0d6efd',
      tension: 0.3
    }]
  };

  accuracyOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };*/
}
