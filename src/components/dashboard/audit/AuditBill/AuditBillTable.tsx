import { BillingItem } from "@/features/auditSlice";

interface AuditBillTableProps {
  billingData: BillingItem[];
}

export default function AuditBillTable({ billingData }: AuditBillTableProps) {
  const total = billingData.reduce((sum, item) => sum + parseFloat(item.price || "0"), 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4">
      <div className="flex flex-col md:flex-row md:justify-between lg:items-center mb-4 gap-2">
        <p className="text-lg font-semibold text-black">Bill Statement</p>
        <button className="hidden lg:flex bg-[#8771BC] text-white px-6 py-2 rounded-md items-center shadow-md hover:shadow-lg transition-shadow md:w-auto justify-center">
          Run Audit
        </button>
      </div>

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
    </div>
  );
}
