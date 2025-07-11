import { useState, useCallback } from "react";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

// Components
import { Button } from "@/components/ui/buttons/button";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
} from "@/components/ui/file-upload";

const DOCUMENT_TYPES = ["Itemized Bill", "Discharge Summary", "Medical Report"];

export const UploadDocument = () => {
    const [documentType, setDocumentType] = useState("Itemized Bill");
    const [files, setFiles] = useState<File[]>([]);
    const [file, _setFile] = useState<File | null>(null);

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        console.log("Uploading", file.name, "as", documentType);
    };

    const onFileReject = useCallback((file: File, message: string) => {
        toast(message, {
            description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
                }" has been rejected`,
        });
    }, []);

    return (
        <div>
            {/* Document Type Selection */}
            <div className="mb-4">
                <p className="text-sm font-medium mb-1">Hospital Document Type</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full sm:w-[240px] justify-between border-gray-300">
                            {documentType}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[200px] w-auto border-gray-300">
                        <DropdownMenuRadioGroup
                            value={documentType}
                            onValueChange={setDocumentType}
                        >
                            {DOCUMENT_TYPES.map((type) => (
                                <DropdownMenuRadioItem key={type} value={type}>
                                    {type}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            {/* Drag & Drop File Upload */}
            <p className="text-sm font-medium">File</p>
            <FileUpload
                maxFiles={2}
                maxSize={5 * 1024 * 1024}
                value={files}
                onValueChange={setFiles}
                onFileReject={onFileReject}
                multiple
            >
                <div className="bg-primary-foreground rounded-md p-4">
                    <p className="text-left text-black w-full mb-4">Uploading File</p>
                    <FileUploadDropzone>
                        <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center justify-center rounded-full border p-2.5">
                                <UploadCloud className="size-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-gray-600">
                                <span className="text-[#8770BC] font-medium">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-sm text-gray-600">
                                PDF, PNG or JPG
                            </p>
                            <p className="text-xs text-gray-400">
                                (max 1GB)
                            </p>
                        </div>

                    </FileUploadDropzone>
                </div>
                <FileUploadList>
                    {files.map((file, index) => (
                        <FileUploadItem key={index} value={file} className="border-gray-300">
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                                <Button variant="ghost" size="icon" className="size-7">
                                    <X />
                                </Button>
                            </FileUploadItemDelete>
                        </FileUploadItem>
                    ))}
                </FileUploadList>
            </FileUpload>

            <div className="flex justify-end mt-6">
                <Button onClick={handleUpload} className="w-auto min-w-[120px] bg-[#8770BC]">
                    Upload
                </Button>
            </div>

        </div>
    );
}
