import { BillingItem } from "@/features/auditSlice";

interface AuditBillTableProps {
  billingData: BillingItem[];
}

export default function AuditBillTable({ billingData }: AuditBillTableProps) {
  const total = billingData.reduce((sum, item) => sum + parseFloat(item.price || "0"), 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between lg:items-center mb-4 gap-2">
        <p className="text-lg font-semibold text-black">Bill Statement</p>
        <button className="hidden lg:flex bg-[#8771BC] text-white px-6 py-2 rounded-md items-center shadow-md hover:shadow-lg transition-shadow md:w-auto justify-center">
          Run Audit
        </button>
      </div>

      {/* Desktop Table */}
      <div className="w-full overflow-x-auto hidden lg:block">
        <table className="table-auto w-full">
          <thead>
            <tr className="pb-4">
              <th className="p-3 font-semibold text-left lg:py-4">Service Code</th>
              <th className="p-3 font-semibold text-left lg:py-4">Description</th>
              <th className="p-3 font-semibold text-right lg:py-4">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((item, index) => (
              <tr key={index} className="text-[#89868D] border-t border-[#89868d4a]">
                <td className="p-3 lg:py-4">{item.code}</td>
                <td className="p-3 lg:py-4">{item.description}</td>
                <td className="p-3 text-right lg:py-4">${item.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="p-3 text-gray-700 font-semibold" colSpan={2}>
                Total Payable (USD)
              </td>
              <td className="p-3 font-bold text-gray-800 text-right">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block lg:hidden">
        {billingData.map((item, index) => (
          <div
            key={index}
            className="p-4 border-b border-gray-300 rounded-lg shadow-md bg-white mb-4"
          >
            <p className="font-semibold text-gray-800">{item.description}</p>
            <p className="text-gray-600 text-sm">Service Code: {item.code}</p>
            <p className="text-gray-600 text-sm">Price: ${item.price}</p>
          </div>
        ))}

        {/* Mobile Footer */}
        <div className="p-4 font-bold text-gray-800 text-right bg-gray-100 rounded-lg shadow-md">
          <p>Total Payable (USD): ${total.toFixed(2)}</p>
        </div>
        <button className="bg-[#8771BC] text-white px-6 py-2 rounded-md flex items-center shadow-md hover:shadow-lg transition-shadow w-full justify-center mt-4">
          Run Audit
        </button>
      </div>
    </div>
  );
}
