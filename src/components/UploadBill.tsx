import { Upload, User, Clock, TrendingUp } from "lucide-react";

export const UploadBill = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white">
      {/* Share Your Bill Card */}
      <div className="bg-purple-50 p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4 text-purple-700 font-semibold text-lg">
          <Upload className="w-5 h-5 mr-2" />
          Share Your Bill
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Your upload helps others understand medical costs better.
        </p>
        <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto mb-3 text-purple-500" size={32} />
          <p className="font-medium text-gray-700 mb-1">
            Drag & drop your medical bill
          </p>
          <p className="text-sm text-gray-500 mb-3">
            Help others by sharing your pricing data anonymously
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition">
            Choose File
          </button>
        </div>
      </div>

      {/* Recent Community Upload Card */}
      <div className="bg-purple-50 p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4 text-purple-700 font-semibold text-lg">
          <User className="w-5 h-5 mr-2" />
          Recent Community Upload
        </div>
        <p className="text-sm text-gray-600 mb-4">
          See what others are paying and how much they’ve saved
        </p>

        {/* Example Upload List */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {[
            {
              title: "MRI Brain",
              location: "Austin, TX",
              time: "2 min ago",
              price: "$2,400",
              saved: "$800",
            },
            {
              title: "Ultrasound",
              location: "Dallas, TX",
              time: "5 min ago",
              price: "$450",
              saved: "$200",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow px-4 py-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.location}</p>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.time}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{item.price}</p>
                <div className="flex items-center justify-end text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Saved {item.saved}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};