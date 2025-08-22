import {
  Box,
  Button,
  Field,
  Input,
  Stack,
  Switch,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { format } from "date-fns";
import { toBlob } from "html-to-image";
import { domToPng } from "modern-screenshot";
import dynamic from "next/dynamic";
import { useState } from "react";
import { isMobile } from "react-device-detect";

import { toaster } from "../ui/toaster";
import { VisitorBadgePDF, getQRCodeImage } from "./VisitorBadgePDF";
import { VisitorBadgePreview } from "./VisitorBadgePreview";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="500px"
      >
        Loading PDF viewer...
      </Box>
    ),
  },
);

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
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [avatarDataUrl, setAvatarDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

  const generateDataUrls = async () => {
    setIsGenerating(true);
    try {
      // Generate QR code data URL if needed
      if (formData.includeQR) {
        // const qrValue = JSON.stringify({
        //   name: formData.name,
        //   company: formData.company,
        //   date: formData.date,
        //   host: formData.hostEmployee,
        // });
        const qrDataUrl = await getQRCodeImage();
        setQrCodeDataUrl(qrDataUrl);
      }

      // Generate a simple colored rectangle as avatar if no photo is provided
      if (!photoPreview) {
        const badgePreviewPhoto = document.getElementById(
          "visitor-badge-preview-photo",
        );
        if (badgePreviewPhoto) {
          const dataUrl = await domToPng(badgePreviewPhoto, { scale: 4 });
          setAvatarDataUrl(dataUrl);
        }
      }
    } catch (error) {
      debugger;
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
        skipFonts: true, // Skip embedding fonts to avoid CORS issues
        filter: (node) => {
          // Remove any font-family styles that might cause issues
          if (node instanceof HTMLElement) {
            const style = window.getComputedStyle(node);
            const fontFamily = style.getPropertyValue("font-family");
            if (fontFamily.includes("Inter")) {
              node.style.fontFamily = "system-ui, -apple-system, sans-serif";
            }
          }
          return true;
        },
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
            <Field.Root required colorPalette="orange">
              <Field.Label>Visitor Name</Field.Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter visitor's full name"
              />
            </Field.Root>

            <Field.Root required colorPalette="orange">
              <Field.Label>Company</Field.Label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter company name"
              />
            </Field.Root>

            <Field.Root required colorPalette="orange">
              <Field.Label>Visit Date</Field.Label>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </Field.Root>

            <Field.Root colorPalette="orange">
              <Field.Label>Host Employee</Field.Label>
              <Input
                name="hostEmployee"
                value={formData.hostEmployee}
                onChange={handleInputChange}
                placeholder="Enter host employee's name"
              />
            </Field.Root>

            <Field.Root colorPalette="orange">
              <Field.Label>Photo</Field.Label>
              <Input
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                p={1}
              />
            </Field.Root>

            <Field.Root
              display="flex"
              alignItems="center"
              colorPalette="orange"
            >
              <Switch.Root
                id="include-qr"
                name="includeQR"
                checked={formData.includeQR}
                onCheckedChange={(details) => {
                  console.log({ details });
                  setFormData((prev) => ({
                    ...prev,
                    includeQR: details.checked,
                  }));
                }}
              >
                <Switch.HiddenInput />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Include QR Code</Switch.Label>
              </Switch.Root>
            </Field.Root>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              loading={isGenerating}
              disabled={!formData.name || !formData.company || !formData.date}
            >
              Generate Badge
            </Button>
          </VStack>
        </form>
      </Box>

      <Box flex="1">
        <Tabs.Root defaultValue="preview" colorPalette="orange">
          <Tabs.List>
            <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
            <Tabs.Trigger value="pdf">PDF</Tabs.Trigger>
            <Tabs.Trigger value="png">PNG</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="preview" paddingTop={4}>
            <VisitorBadgePreview
              formData={formData}
              photoPreview={photoPreview}
            />
          </Tabs.Content>

          <Tabs.Content value="pdf" paddingTop={4}>
            {isMobile ? (
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
            ) : (
              <Box height="500px">
                <PDFViewer style={{ width: "100%", height: "100%" }}>
                  <VisitorBadgePDF
                    formData={formData}
                    photoPreview={photoPreview}
                    qrCodeDataUrl={qrCodeDataUrl}
                    avatarDataUrl={avatarDataUrl}
                  />
                </PDFViewer>
              </Box>
            )}
          </Tabs.Content>

          <Tabs.Content value="png" paddingTop={4}>
            <Button colorScheme="teal" size="lg" onClick={handleDownloadPNG}>
              Download PNG
            </Button>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Stack>
  );
}
