export default function Audit() {
  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Transaction Details
        </h2>
        <div className="mb-8">
          <div className="flex">
            <p className="text-gray-600 pb-4 w-32 min-w-[8rem]">Receipt No:</p>
            <p className="text-gray-800 pb-4 flex-1">EL-5414587</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 pb-4 w-32 min-w-[8rem]">Date:</p>
            <p className="text-gray-800 pb-4 flex-1">25 Dec, 2024</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 w-32 min-w-[8rem]">Hospital:</p>
            <p className="text-gray-800 flex-1">
              Alaska Medical Center, Anchorage, AK 99508
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-6">
          {/* Left Column - Patient Information */}
          <div className="w-full md:w-1/2 min-w-[300px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 lg:pb-4">
              Patient Information
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 lg:py-6 border border-gray-300 rounded-md light-shadow">
              <img
                src="/src/assets/user.png"
                alt="User Profile Image"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200"
              />
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-gray-800 font-medium pb-2">John A Rogers</p>
                <p className="text-gray-600 pb-2">
                  1234, Aurora Drive, Anchorage, AK 99508
                </p>
                <p className="text-gray-600 pb-2">john.rogers@example.com</p>
                <p className="text-gray-600 pb-2">+1-901-7654-234</p>
              </div>
            </div>
          </div>

          {/* Right Column - Practitioner Information */}
          <div className="w-full md:w-1/2 min-w-[300px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 lg:pb-4">
              Practitioner Information
            </h2>
            <div className="space-y-1 p-4 lg:py-6 border border-gray-300 rounded-md light-shadow">
              <p className="text-gray-800 font-medium pb-2">Oliver Liam</p>
              <p className="text-gray-600 pb-2">
                Practitioner ID: <span className="text-gray-800">1234567</span>
              </p>
              <p className="text-gray-600 pb-2">
                Contact Info:{" "}
                <span className="text-gray-800">+1-786-234-5678</span>
              </p>
              <p className="text-gray-600 pb-2">
                Speciality:{" "}
                <span className="text-gray-800">Family Medicine</span>
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 gap-2">
  <p className="text-lg font-semibold text-black">Bill Statement</p>
  <button className="bg-gradient-to-r bg-[#8771BC] text-white px-6 py-2 rounded-md flex items-center shadow-md hover:shadow-lg transition-shadow w-full md:w-auto justify-center">
    Run Audit
  </button>
</div>


  
      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full m min-w-[400px]">
          {/* Table Head */}
          <thead>
            <tr className="pb-4">
              <th className="p-3  text-left lg:py-4">Serial Code</th>
              <th className="p-3 text-left lg:py-4">Description</th>
              <th className="p-3 text-center lg:py-4">Quantity</th>
              <th className="p-3 text-right lg:py-4">Unit Cost (USD)</th>
              <th className="p-3 text-right lg:py-4">Amount (USD)</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
          <tr className="text-[#89868D] border-t border-[#89868d4a]">
    <td className="p-3 lg:py-4">123</td>
    <td className="p-3 lg:py-4">Coronary Artery Bypass Surgery</td>
    <td className="p-3 text-center lg:py-4">1</td>
    <td className="p-3 text-right lg:py-4">9,574.47</td>
    <td className="p-3 text-right lg:py-4">9,574.47</td>
  </tr>
  <tr className="text-[#89868D] border-t border-[#89868d4a]">
    <td className="p-3 lg:py-4">345</td>
    <td className="p-3 lg:py-4">ICU Room & Nursing (5 days)</td>
    <td className="p-3 text-center lg:py-4">5</td>
    <td className="p-3 text-right lg:py-4">255.32</td>
    <td className="p-3 text-right lg:py-4">1,276.60</td>
  </tr>
  <tr className="text-[#89868D] border-t border-[#89868d4a]">
    <td className="p-3 lg:py-4">456</td>
    <td className="p-3 lg:py-4">Operating Theatre & Equipment</td>
    <td className="p-3 text-center lg:py-4">1</td>
    <td className="p-3 text-right lg:py-4">1,808.51</td>
    <td className="p-3 text-right lg:py-4">1,808.51</td>
  </tr>
  <tr className="text-[#89868D] border-t border-[#89868d4a]">
    <td className="p-3 lg:py-4">768</td>
    <td className="p-3 lg:py-4">Cardiologist Fees</td>
    <td className="p-3 text-center lg:py-4">1</td>
    <td className="p-3 text-right lg:py-4">1,234.04</td>
    <td className="p-3 text-right lg:py-4">1,234.04</td>
  </tr>
  <tr className="text-[#89868D] border-t border-b border-[#89868d4a]">
    <td className="p-3 lg:py-4">901</td>
    <td className="p-3 lg:py-4">Medication & Consumables</td>
    <td className="p-3 text-center lg:py-4">1</td>
    <td className="p-3 text-right lg:py-4">489.36</td>
    <td className="p-3 text-right lg:py-4">489.36</td>
  </tr>
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
        </div>
    </>
  );
}
