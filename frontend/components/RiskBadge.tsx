export default function RiskBadge({ zone }: { zone: string }) {
    const colors: any = {
      GREEN: 'bg-green-500',
      YELLOW: 'bg-yellow-400',
      ORANGE: 'bg-orange-500',
      RED: 'bg-red-600',
    };
  
    return (
      <span className={`px-4 py-2 text-white rounded ${colors[zone]}`}>
        {zone} RISK
      </span>
    );
  }
  