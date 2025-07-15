import { Upload, Users, Clock, TrendingUp, X } from "lucide-react";
import { useState } from "react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
} from "@/components/ui/file-upload";

export const UploadBill = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onFileReject = (file: File, message: string) => {
    console.log("File rejected:", file.name, message);
  };

  const handleRemoveFile = () => {
    setFiles([]);
  };

  return (
    <section className="bg-white upload-bill lg:pt-10">
      <div className="container grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 p-6 bg-white">
        {/* Share Your Bill Card - Narrower Column */}
        <div className="bg-[#F5F1FF] p-6 lg:py-10 lg:px-12 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 lg:mr-4 mr-2 rounded-full bg-gradient-to-r from-[#9F70FD] to-[#E770C1]">
              <Upload className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <h4 className="text-[20px] sm:text-[24px] md:text-[24px] lg:text-[32px] font-bold text-gray-900">
              Share Your Bill
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-6 lg:mb-8">
            Your upload helps others understand medical costs better.
          </p>
          <div className="bg-white border-2 border-dashed border-[#8B5FBF] rounded-lg p-6 lg:p-8 text-center hover:border-purple-700 transition-colors">
            <FileUpload
              maxFiles={1}
              maxSize={5 * 1024 * 1024}
              value={files}
              onValueChange={setFiles}
              onFileReject={onFileReject}
              multiple={false}
              className="w-full"
            >
              <FileUploadDropzone className="border-0">
                <div className="flex flex-col items-center gap-1">
                  <Upload className="mx-auto mb-3 text-[#8B5FBF]" size={32} />
                  <p className="font-medium text-gray-700 mb-1 lg:mb-2">
                    Drag & drop your medical bill
                  </p>
                  <p className="text-sm text-gray-500 mb-4 lg:mb-6">
                    Help others by sharing your pricing data anonymously
                  </p>
                  <div
                    className={`bg-[#8B5FBF] text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition ${
                      files.length > 0
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    Choose File
                  </div>
                </div>
              </FileUploadDropzone>

              <FileUploadList className="mt-4">
                {files.map((file, index) => (
                  <FileUploadItem
                    key={index}
                    value={file}
                    className="border-gray-200 bg-gray-50"
                  >
                    <div className="w-[40px] h-[40px] overflow-hidden rounded-md border border-gray-200">
                      <FileUploadItemPreview className="object-cover w-full h-full" />
                    </div>
                    <FileUploadItemMetadata className="text-sm text-gray-700" />
                    <FileUploadItemDelete asChild onClick={handleRemoveFile}>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </div>
        </div>

        {/* Recent Community Upload Card - Wider Column */}
        <div className="bg-[#F5F1FF] p-6 lg:pt-10 lg:px-12 lg:pb-1 pb-4 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 lg:mr-4 mr-2 rounded-full bg-gradient-to-r from-[#9F70FD] to-[#E770C1]">
              <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <h4 className="text-[20px] sm:text-[24px] md:text-[24px] lg:text-[32px]  font-bold text-gray-900">
              Recent Community Upload
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-4 lg:mb-6">
            See what others are paying and how much they've saved
          </p>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#8B5FBF] scrollbar-track-gray-100">
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
                className="bg-white rounded-lg px-4 py-4 lg:py-6 flex justify-between items-center border border-gray-200"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                  <div className="flex items-center text-xs text-gray-400 mt-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.time}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-gray-800">{item.price}</p>
                  <div className="flex items-center justify-end text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span>Saved {item.saved}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};