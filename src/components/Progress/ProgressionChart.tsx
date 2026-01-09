import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { ExerciseHistory } from '../../types';
import './ProgressionChart.css';

interface ProgressionChartProps {
  history: ExerciseHistory;
}

const ProgressionChart: React.FC<ProgressionChartProps> = ({ history }) => {
  // Prepare data for the chart
  const chartData = history.sessions.map(session => ({
    date: new Date(session.date).getTime(),
    dateFormatted: format(new Date(session.date), 'MMM d'),
    maxWeight: session.maxWeight,
    totalVolume: session.totalVolume,
    sets: session.sets
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-date">{format(new Date(data.date), 'MMM d, yyyy')}</p>
          <p className="tooltip-weight">Max Weight: <strong>{data.maxWeight} lbs</strong></p>
          <p className="tooltip-volume">Total Volume: {data.totalVolume.toLocaleString()} lbs</p>
          <p className="tooltip-sets">{data.sets} sets</p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="progression-chart">
        <div className="no-data">No progression data available</div>
      </div>
    );
  }

  return (
    <div className="progression-chart">
      <h3 className="chart-title">Weight Progression</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="dateFormatted"
            stroke="#666666"
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis
            stroke="#666666"
            style={{ fontSize: '0.75rem' }}
            label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft', style: { fontSize: '0.875rem' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="maxWeight"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{ r: 4, fill: '#2563EB' }}
            activeDot={{ r: 6 }}
            name="Max Weight"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(ProgressionChart);
