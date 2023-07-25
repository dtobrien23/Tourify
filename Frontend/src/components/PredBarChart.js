import React, { useState, useEffect, useContext } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { APIContext } from './APIContext';
import { MapContext } from './MapContext';
// import { Chart, registerables } from 'chart.js';
// Chart.register(registerables);

export default function PredBarChart() {
  const {
    apiAttractions,
    fetchBusynessPredictions,
    day1BusynessPred,
    chartData,
  } = useContext(APIContext);
  const { attractionsWithBusyness, map } = useContext(MapContext);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  //   useEffect(() => {
  //     if (day1BusynessPred !== null) {
  //       setChartData({
  //         labels: day1BusynessPred[0].map(hour => hour.hour),
  //         datasets: [
  //           {
  //             label: 'Busyness Rate',
  //             data: day1BusynessPred.map(hour => hour.businessRate),
  //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //             borderColor: 'rgba(75, 192, 192, 1)',
  //             borderWidth: 1,
  //           },
  //         ],
  //       });
  //       console.log('well???');
  //     }
  //   }, [day1BusynessPred]);

  useEffect(() => {
    if (chartData) {
      console.log(chartData, 'CHART DATAAAAA');
    }
  }, [chartData]);

  return (
    <div style={{ width: '400px', height: '300px' }}>
      {chartData !== null ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
