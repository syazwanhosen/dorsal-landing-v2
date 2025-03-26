import React from "react";

interface PriceItem {
  state: string;
  value: number | null;
  color: string;
}

const DataDisplay = ({ label, items }: { label: string; items: PriceItem[] }) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white">
    <h3 className="text-lg font-bold text-black">{label}</h3>
    {items.map((item, idx) => (
      <div key={idx} className="flex items-center justify-between gap-4 mt-2">
        <div className="w-32">
          <p className="text-purple text-lg font-semibold">
            {item.state || "N/A"}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 min-w-[120px]">
          {item.value !== null && item.value !== undefined && (
            <span
              className="w-6 h-6 rounded-sm shrink-0"
              style={{ backgroundColor: item.color }}
            ></span>
          )}
          <span className="text-gray-700 font-medium text-right w-[80px]">
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