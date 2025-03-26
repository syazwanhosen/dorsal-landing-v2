interface PriceItem {
  state: string;
  value: number | null;
  color: string;
}

const DataDisplay = ({ label, items }: { label: string; items: PriceItem[] }) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white">
    <h3 className="text-lg font-bold text-black">{label}</h3>
    {items.map((item, idx) => (
      <div key={idx} className="flex items-center justify-between mt-2">
        <div className="min-w-0 pr-2">
          <p className="text-purple text-lg font-semibold truncate">
            {item.state || "N/A"}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {item.value !== null && item.value !== undefined && (
            <span
              className="w-6 h-6 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
          )}
          <span className="text-gray-700 font-medium whitespace-nowrap">
            {item.value !== null && item.value !== undefined
              ? `$${item.value.toFixed(2)}`
              : "No Price Available"}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default DataDisplay;