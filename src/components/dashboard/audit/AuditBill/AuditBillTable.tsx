import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";

import { BillingItem, submittedAudit, setLoadingData } from "@/features/auditSlice";
import { postAuditData } from "@/api/audit";

interface AuditBillTableProps {
  hospitalName: string;
  billingData: BillingItem[];
}

export default function AuditBillTable({ hospitalName, billingData }: AuditBillTableProps) {
  const dispatch = useAppDispatch();

  const total = billingData.reduce((sum, item) => sum + parseFloat(item.price || "0"), 0);

  const hasCode = billingData.some((item) => item.code);
  const hasDescription = billingData.some((item) => item.description);
  const hasQuantity = billingData.some((item) => item.quantity);
  const hasUnitCost = billingData.some((item) => item.unit_cost);
  const hasPrice = billingData.some((item) => item.price);

  const visibleColumns = [hasCode, hasDescription, hasQuantity, hasUnitCost, hasPrice].filter(Boolean).length;

  const handleRunAuditClick = async () => {
    dispatch(setLoadingData(true));

    try {
      const data = await postAuditData({
        hospital_name: hospitalName,
        billing_information: billingData
      })
      dispatch(setLoadingData(false));
      dispatch(submittedAudit(data));
      toast.success(data?.message);
    } catch (error: any) {
      toast.error("Audit failed", {
          description: error.message || "An unexpected error occurred.",
        });
      alert(error?.message || "An unexpected error occurred while running the audit.");
    }finally {
        dispatch(setLoadingData(false));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between lg:items-center mb-4 gap-2">
        <p className="text-lg font-semibold text-black">Bill Statement</p>
        <button
          className="hidden lg:flex bg-[#8771BC] text-white px-6 py-2 rounded-md items-center shadow-md hover:shadow-lg transition-shadow md:w-auto justify-center"
          onClick={handleRunAuditClick}
          >
          Run Audit
        </button>
      </div>

      {/* Desktop Table */}
      <div className="w-full overflow-x-auto hidden lg:block">
        <table className="table-auto w-full">
          <thead>
            <tr className="pb-4">
              {hasCode && (
                <th className="p-3 font-semibold text-left lg:py-4 w-[140px] whitespace-nowrap">Service Code</th>
              )}
              {hasDescription && (
                <th className="p-3 font-semibold text-left lg:py-4">Description</th>
              )}
              {hasQuantity && (
                <th className="p-3 font-semibold text-center lg:py-4 whitespace-nowrap">Quantity</th>
              )}
              {hasUnitCost && (
                <th className="p-3 font-semibold text-right lg:py-4 whitespace-nowrap">Unit Cost (USD)</th>
              )}
              {hasPrice && (
                <th className="p-3 font-semibold text-right lg:py-4 w-[160px] whitespace-nowrap">Price (USD)</th>
              )}
            </tr>
          </thead>
          <tbody>
            {billingData.map((item, index) => (
              <tr key={index} className="text-[#89868D] border-t border-[#89868d4a]">
                {hasCode && <td className="p-3 lg:py-4">{item.code}</td>}
                {hasDescription && <td className="p-3 lg:py-4">{item.description}</td>}
                {hasQuantity && <td className="p-3 text-center lg:py-4">{item.quantity ?? "-"}</td>}
                {hasUnitCost && <td className="p-3 text-right lg:py-4">${item.unit_cost ?? "-"}</td>}
                {hasPrice && <td className="p-3 text-right lg:py-4">${item.price}</td>}
              </tr>
            ))}
          </tbody>
          {hasPrice && (
            <tfoot>
              <tr>
                <td className="p-3 text-gray-700 font-semibold" colSpan={visibleColumns - 1}>
                  Total Payable (USD)
                </td>
                <td className="p-3 font-bold text-gray-800 text-right">${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block lg:hidden">
        {billingData.map((item, index) => (
          <div
            key={index}
            className="p-4 border-b border-gray-300 rounded-lg shadow-md bg-white mb-4"
          >
            {hasDescription && (
              <p className="font-semibold text-gray-800">{item.description}</p>
            )}
            {hasCode && (
              <p className="text-gray-600 text-sm">
                <span className="whitespace-nowrap">Service Code:</span> {item.code}
              </p>
            )}
            {hasQuantity && (
              <p className="text-gray-600 text-sm">
                <span className="whitespace-nowrap">Quantity:</span> {item.quantity ?? "-"}
              </p>
            )}
            {hasUnitCost && (
              <p className="text-gray-600 text-sm">
                <span className="whitespace-nowrap">Unit Cost:</span> ${item.unit_cost ?? "-"}
              </p>
            )}
            {hasPrice && (
              <p className="text-gray-600 text-sm">
                <span className="whitespace-nowrap">Price:</span> ${item.price}
              </p>
            )}
          </div>
        ))}

        {/* Mobile Footer */}
        {hasPrice && (
          <div className="p-4 font-bold text-gray-800 text-right bg-gray-100 rounded-lg shadow-md">
            <p>Total Payable (USD): ${total.toFixed(2)}</p>
          </div>
        )}
        <button
          className="bg-[#8771BC] text-white px-6 py-2 rounded-md flex items-center shadow-md hover:shadow-lg transition-shadow w-full justify-center mt-4"
          onClick={handleRunAuditClick}>
          Run Audit
        </button>
      </div>
    </div>
  );
}
