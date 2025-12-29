'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function RiskTrendChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          📈 Sprint Risk Trend
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No historical data available yet
        </div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    sprint: item.sprintName || `Sprint ${item.id}`,
    healthScore: item.healthScore || item.score || 0,
  }));

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        📈 Sprint Risk Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="sprint" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
            label={{ value: 'Health Score', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [`${value}`, 'Health Score']}
          />
          <Line
            type="monotone"
            dataKey="healthScore"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ fill: '#f97316', r: 5 }}
            activeDot={{ r: 7 }}
            name="Health Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
