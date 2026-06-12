import React from 'react';
import {
  Pie
} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Charts() {

  const data = {

    labels: [
      'Present',
      'Absent'
    ],

    datasets: [
      {

        data: [
          95,
          25
        ]

      }
    ]

  };

  return (

    <div
      style={{
        width: '400px'
      }}
    >

      <Pie data={data} />

    </div>

  );

}

export default Charts;