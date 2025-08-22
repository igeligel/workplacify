import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  Stack,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { format } from "date-fns";
import { toBlob, toPng } from "html-to-image";
import { FormEventHandler, useState } from "react";

import { toaster } from "../ui/toaster";
import { VisitorBadgePDF, getQRCodeImage } from "./VisitorBadgePDF";
import { VisitorBadgePreview } from "./VisitorBadgePreview";

interface VisitorFormData {
  name: string;
  company: string;
  date: string;
  hostEmployee: string;
  photo?: File;
  includeQR: boolean;
}

const initialFormData: VisitorFormData = {
  name: "",
  company: "",
  date: format(new Date(), "yyyy-MM-dd"),
  hostEmployee: "",
  includeQR: false,
};

export function VisitorBadgeForm() {
  const [formData, setFormData] = useState<VisitorFormData>(initialFormData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSwitchChange: FormEventHandler<HTMLLabelElement> = (e) => {
    const { name, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toaster.create({
          title: "File too large",
          description: "Please select an image under 5MB",
          type: "error",
          duration: 3000,
          closable: true,
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [avatarDataUrl, setAvatarDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDataUrls = async () => {
    setIsGenerating(true);
    try {
      // Generate QR code data URL if needed
      if (formData.includeQR) {
        const qrValue = JSON.stringify({
          name: formData.name,
          company: formData.company,
          date: formData.date,
          host: formData.hostEmployee,
        });
        const qrDataUrl = await getQRCodeImage(qrValue);
        setQrCodeDataUrl(qrDataUrl);
      }

      // Generate avatar data URL if no photo is provided
      if (!photoPreview) {
        const avatarElement = document.createElement("div");
        avatarElement.style.width = "256px";
        avatarElement.style.height = "256px";
        document.body.appendChild(avatarElement);

        avatarElement.innerHTML = `<div style="width: 256px; height: 256px;">
          <svg width="256" height="256" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="#92A1C6" />
          </svg>
        </div>`;

        const dataUrl = await toPng(avatarElement, { quality: 1.0 });
        setAvatarDataUrl(dataUrl);
        document.body.removeChild(avatarElement);
      }
    } catch (error) {
      toaster.create({
        title: "Error generating badge",
        description: "Please try again",
        type: "error",
        duration: 3000,
        closable: true,
      });
    }
    setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateDataUrls();
  };

  const handleDownloadPNG = async () => {
    const previewElement = document.querySelector("#badge-preview")!;
    if (!previewElement) {
      toaster.create({
        title: "Error",
        description: "Could not find badge preview element",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }

    try {
      const blob = await toBlob(previewElement as HTMLElement, {
        quality: 1.0,
        pixelRatio: 2,
      });

      if (!blob) {
        throw new Error("Failed to generate PNG");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `visitor-badge-${formData.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      toaster.create({
        title: "Error generating PNG",
        description: "Please try again",
        type: "error",
        duration: 3000,
        closable: true,
      });
    }
  };

  return (
    <Stack gap={8} direction={{ base: "column", lg: "row" }}>
      <Box flex="1">
        <form onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            <Field.Root required>
              <Field.Label>Visitor Name</Field.Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter visitor's full name"
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Company</Field.Label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter company name"
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Visit Date</Field.Label>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Host Employee</Field.Label>
              <Input
                name="hostEmployee"
                value={formData.hostEmployee}
                onChange={handleInputChange}
                placeholder="Enter host employee's name"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Photo</Field.Label>
              <Input
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                p={1}
              />
            </Field.Root>

            <Field.Root display="flex" alignItems="center">
              <Field.Label htmlFor="include-qr" mb="0">
                Include QR Code
              </Field.Label>
              <Switch.Root
                id="include-qr"
                name="includeQR"
                checked={formData.includeQR}
                onChange={handleSwitchChange}
              />
            </Field.Root>

            <HStack gap={4}>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                loading={isGenerating}
                disabled={!formData.name || !formData.company || !formData.date}
              >
                Preview Badge
              </Button>

              {!isGenerating && (formData.name || formData.company) && (
                <>
                  <PDFDownloadLink
                    document={
                      <VisitorBadgePDF
                        formData={formData}
                        photoPreview={photoPreview}
                        qrCodeDataUrl={qrCodeDataUrl}
                        avatarDataUrl={avatarDataUrl}
                      />
                    }
                    fileName={`visitor-badge-${formData.name.toLowerCase().replace(/\s+/g, "-")}.pdf`}
                  >
                    {({ loading }) => (
                      <Button colorScheme="green" size="lg" loading={loading}>
                        Download PDF
                      </Button>
                    )}
                  </PDFDownloadLink>

                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={handleDownloadPNG}
                  >
                    Download PNG
                  </Button>
                </>
              )}
            </HStack>
          </VStack>
        </form>
      </Box>

      <Box flex="1">
        <VisitorBadgePreview formData={formData} photoPreview={photoPreview} />
      </Box>
    </Stack>
  );
}
