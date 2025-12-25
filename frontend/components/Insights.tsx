export default function Insights({ items }: { items: string[] }) {
    return (
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">🔍 Risk Insights</h3>
        <ul className="list-disc ml-5 space-y-1">
          {items.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      </div>
    );
  }
  