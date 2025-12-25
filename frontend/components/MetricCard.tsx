export default function MetricCard({ title, value }: any) {
    return (
      <div className="border rounded-lg p-4 shadow">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  }
  