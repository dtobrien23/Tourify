import React, { useState, useEffect, useContext } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { APIContext } from './APIContext';
import { MapContext } from './MapContext';
// import { Chart, registerables } from 'chart.js';
// Chart.register(registerables);

export default function PredBarChart() {
  const { chartData } = useContext(APIContext);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    if (chartData) {
      console.log(chartData, 'CHART DATAAAAA');
    }
  }, [chartData]);

  return (
    <div style={{ width: '400px', height: '210px' }}>
      {chartData !== null ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
