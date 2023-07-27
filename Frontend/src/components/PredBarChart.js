import React, { useState, useEffect, useContext } from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
} from '@chakra-ui/react';
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
        <Flex height="100%" alignItems="center" justifyContent="center">
          <CircularProgress isIndeterminate color="orange.400" size="100px" />
        </Flex>
      )}
    </div>
  );
}
