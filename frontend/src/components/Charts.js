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

function Charts({ present = 95, absent = 25 }) {
  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [present, absent],
        backgroundColor: ['#10b981', '#ef4444'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 2,
      }
    ]
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <Pie data={data} />
    </div>
  );
}

export default Charts;