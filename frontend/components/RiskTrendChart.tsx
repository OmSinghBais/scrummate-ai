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
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <span className="text-xl">📈</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            Sprint Risk Trend
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">No historical data available yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Data will appear as sprints are tracked</p>
        </div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    sprint: item.sprintName || `Sprint ${item.id}`,
    healthScore: item.healthScore || item.score || 0,
  }));

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <span className="text-xl">📈</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Sprint Risk Trend
        </h3>
        <span className="ml-auto px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">
          {data.length} sprints
        </span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <defs>
            <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis 
            dataKey="sprint" 
            stroke="#6b7280"
            style={{ fontSize: '12px', fontWeight: '500' }}
            tick={{ fill: '#6b7280' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px', fontWeight: '500' }}
            tick={{ fill: '#6b7280' }}
            domain={[0, 100]}
            label={{ value: 'Health Score', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              padding: '12px',
            }}
            formatter={(value: number) => [`${value}`, 'Health Score']}
            labelStyle={{ fontWeight: 'bold', color: '#374151' }}
          />
          <Line
            type="monotone"
            dataKey="healthScore"
            stroke="#f97316"
            strokeWidth={4}
            dot={{ fill: '#f97316', r: 6, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
            name="Health Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
