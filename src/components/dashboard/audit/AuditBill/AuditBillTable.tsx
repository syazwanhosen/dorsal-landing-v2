export default function AuditBillTable() {
  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row sm:justify-center md:justify-between items-center mb-4 gap-2">
  <p className="text-lg font-semibold text-black lg:text-center">Bill Statement</p>
  <button className="bg-gradient-to-r bg-[#8771BC] text-white px-6 py-2 rounded-md flex items-center shadow-md hover:shadow-lg transition-shadow md:w-auto sm:w-full justify-center">
    Run Audit
  </button>
</div>


       
      {/* Desktop Table (Visible only on lg screens) */}
<div className="w-full overflow-x-auto hidden lg:block">
  <table className="table-auto w-full">
    {/* Table Head */}
    <thead>
      <tr className="pb-4">
        <th className="p-3 font-semibold text-left lg:py-4">Service Code</th>
        <th className="p-3 font-semibold text-left lg:py-4">Description</th>
        <th className="p-3 font-semibold text-center lg:py-4">Quantity</th>
        <th className="p-3 font-semibold text-right lg:py-4">Unit Cost (USD)</th>
        <th className="p-3 font-semibold text-right lg:py-4">Amount (USD)</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {[
        { code: "123", desc: "Coronary Artery Bypass Surgery", qty: 1, unit: "9,574.47", amt: "9,574.47" },
        { code: "345", desc: "ICU Room & Nursing (5 days)", qty: 5, unit: "255.32", amt: "1,276.60" },
        { code: "456", desc: "Operating Theatre & Equipment", qty: 1, unit: "1,808.51", amt: "1,808.51" },
        { code: "768", desc: "Cardiologist Fees", qty: 1, unit: "1,234.04", amt: "1,234.04" },
        { code: "901", desc: "Medication & Consumables", qty: 1, unit: "489.36", amt: "489.36" }
      ].map((item, index) => (
        <tr key={index} className="text-[#89868D] border-t border-[#89868d4a]">
          <td className="p-3 lg:py-4">{item.code}</td>
          <td className="p-3 lg:py-4">{item.desc}</td>
          <td className="p-3 text-center lg:py-4">{item.qty}</td>
          <td className="p-3 text-right lg:py-4">${item.unit}</td>
          <td className="p-3 text-right lg:py-4">${item.amt}</td>
        </tr>
      ))}
    </tbody>
       {/* Table Footer */}
       <tfoot>
            <tr>
              <td className="p-3  text-gray-700 font-semibold" colSpan={3}>
                Total Payable (USD)
              </td>
              <td className="p-3 "></td>
              <td className="p-3 font-bold  text-gray-800 text-right">14,382.98</td>
            </tr>
          </tfoot>
  </table>
</div>

{/* Mobile Cards (Visible only on small screens) */}
<div className="block lg:hidden">
  {[
    { code: "123", desc: "Coronary Artery Bypass Surgery", qty: 1, unit: "9,574.47", amt: "9,574.47" },
    { code: "345", desc: "ICU Room & Nursing (5 days)", qty: 5, unit: "255.32", amt: "1,276.60" },
    { code: "456", desc: "Operating Theatre & Equipment", qty: 1, unit: "1,808.51", amt: "1,808.51" },
    { code: "768", desc: "Cardiologist Fees", qty: 1, unit: "1,234.04", amt: "1,234.04" },
    { code: "901", desc: "Medication & Consumables", qty: 1, unit: "489.36", amt: "489.36" }
  ].map((item, index) => (
    <div key={index} className="p-4 border-b border-gray-300 rounded-lg shadow-md bg-white">
      <p className="font-semibold text-gray-800">{item.desc}</p>
      <p className="text-gray-600 text-sm">Service Code: {item.code}</p>
      <p className="text-gray-600 text-sm">Quantity: {item.qty}</p>
      <p className="text-gray-600 text-sm">Unit Cost: ${item.unit}</p>
      <p className="text-gray-800 font-medium text-right">Amount: ${item.amt}</p>
    </div>
  ))}

  {/* Mobile Footer */}
  <div className="p-4 font-bold text-gray-800 text-right bg-gray-100 rounded-lg shadow-md">
    <p>Total Payable (USD): 14,382.98</p>
  </div>

</div>

        {/* Responsive Table Container End */}
      </div>
    </>
  );
}
