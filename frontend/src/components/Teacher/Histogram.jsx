import React from 'react';
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

export const HistogramChart = ({data}) => {
  const labels = ['1', '2', '3', '4', '5', '6'];
  const backgroundColor = 'rgba(75, 192, 192, 0.5)';
  const borderColor = 'rgba(75, 192, 192, 1)';
  const borderWidth = 1;

  return (
    <div>
      <Bar data={{
          labels: labels,
          datasets: [{
            label: 'Roll Frequency',
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: borderWidth
          }]
        }}
        options={{
          responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true
              },
              y: {
                beginAtZero: true
              }
            }
          }}
            />
    </div>
  );
}

export default HistogramChart;
