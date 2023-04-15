import React, { Component } from 'react';
import Chart from 'chart.js/auto';

class HistogramChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  renderChart() {
    const { data, labels, backgroundColor, borderColor, borderWidth } = this.props;

    // Destroy the existing chart instance, if any
    this.destroyChart();

    // Create a new Chart instance with the updated data and options
    this.chart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Roll Frequency',
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth
        }]
      },
      options: {
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
      }
    });
  }

  destroyChart() {
    // Destroy the Chart instance, if exists
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}

export default HistogramChart;
