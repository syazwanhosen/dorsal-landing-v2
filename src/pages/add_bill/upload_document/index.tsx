import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/buttons/button";
import { UploadDocument } from "@/components/add_bill/UploadDocument";
import { ChevronDown } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import "./style.css"

const DOCUMENT_TYPES = ["Itemized Bill", "Discharge Summary", "Medical Report"];

export default function UploadDocumenPaget() {
    const [documentType, setDocumentType] = useState("Itemized Bill");
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        console.log("Uploading", file.name, "as", documentType);
    };

    return (
        <>
            <h1 className="text-lg font-medium text-[#8770BC]">Upload Document</h1>

            <Card className="max-w-xl mx-auto mt-10 border-gray-300">
                <CardContent className="upload-file-card-content">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="upload" className="upload-file-accordion-item ">
                            <AccordionTrigger>Upload File</AccordionTrigger>
                            <AccordionContent>
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
                                    <UploadDocument />

                                    <div className="flex justify-end mt-6">
                                        <Button onClick={handleUpload} className="w-auto min-w-[120px] bg-[#8770BC]">
                                            Upload
                                        </Button>
                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card className="max-w-xl mx-auto mt-10 border-gray-300">
                <CardContent className="upload-file-card-content">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="upload" className="upload-file-accordion-item ">
                            <AccordionTrigger>Update Data</AccordionTrigger>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </>
    );
}
