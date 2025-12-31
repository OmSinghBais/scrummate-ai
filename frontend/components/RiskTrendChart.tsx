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
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-blue-900/30 p-2">
            <span className="text-xl">📈</span>
          </div>
          <h3 className="text-lg font-bold text-white">Sprint Risk Trend</h3>
        </div>
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="mb-2 text-4xl">📊</div>
          <p className="font-medium text-gray-400">No historical data available yet</p>
          <p className="mt-1 text-sm text-gray-500">Data will appear as sprints are tracked</p>
        </div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    sprint: item.sprintName || `Sprint ${item.id}`,
    healthScore: item.healthScore || item.score || 0,
  }));

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg bg-blue-900/30 p-2">
          <span className="text-xl">📈</span>
        </div>
        <h3 className="text-lg font-bold text-white">Sprint Risk Trend</h3>
        <span className="ml-auto rounded-full bg-blue-900/30 px-3 py-1 text-xs font-bold text-blue-300">
          {data.length} sprints
        </span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <defs>
            <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis
            dataKey="sprint"
            stroke="#9ca3af"
            style={{ fontSize: '12px', fontWeight: '500' }}
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: '12px', fontWeight: '500' }}
            tick={{ fill: '#9ca3af' }}
            domain={[0, 100]}
            label={{
              value: 'Health Score',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#9ca3af' },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.98)',
              border: '2px solid #374151',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              padding: '12px',
              color: '#ffffff',
            }}
            formatter={(value: number | undefined) => [`${value ?? 0}`, 'Health Score']}
            labelStyle={{ fontWeight: 'bold', color: '#ffffff' }}
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
