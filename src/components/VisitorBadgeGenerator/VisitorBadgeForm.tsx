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
import { domToBlob } from "modern-screenshot";
import dynamic from "next/dynamic";

import { toaster } from "../ui/toaster";
import { QrCodePreview } from "./QrCodePreview";
import { VisitorBadgeAvatar } from "./VisitorBadgeAvatar";
import { VisitorBadgePreview } from "./VisitorBadgePreview";
import { useVisitorBadgeFormStore } from "./formDataStore";

const DynamicPdfPreviewerDownloader = dynamic(
  () =>
    import("./PdfPreviewerDownloader").then(
      (mod) => mod.PdfPreviewerDownloader,
    ),
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

export const VisitorBadgeForm = () => {
  const { formData, setFormData, setPhotoPreview } = useVisitorBadgeFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
      setFormData({ ...formData, photo: file });
    }
  };

  const handleDownloadPNG = async () => {
    const previewElement = document.querySelector(
      "#visitor-badge-preview-png",
    )!;
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
      const blob = await domToBlob(previewElement as HTMLElement, {
        quality: 1.0,
        scale: 4,
      });

      if (!blob) {
        throw new Error("Failed to generate PNG");
      }

      // Download the blob
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `visitor-badge-${formData.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.click();
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
    <>
      <Box
        position={"absolute"}
        top={"-5000px"}
        left={"-5000px"}
        right={0}
        bottom={0}
        zIndex={1000}
        bg={"red"}
        width={"200px"}
      >
        <Box>
          <QrCodePreview id="qr-code-preview" />
        </Box>
      </Box>

      <Box
        position={"absolute"}
        top={"-7000px"}
        left={"-7000px"}
        right={0}
        bottom={0}
        zIndex={1000}
        bg={"red"}
        width={"100px"}
      >
        <VisitorBadgeAvatar id="visitor-badge-preview-photo" />
      </Box>

      <Stack gap={8} direction={{ base: "column", lg: "row" }}>
        <Box flex="1">
          <form>
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
                    setFormData({
                      ...formData,
                      includeQR: details.checked,
                    });
                  }}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>Include QR Code</Switch.Label>
                </Switch.Root>
              </Field.Root>
            </VStack>
          </form>
        </Box>

        <Box flex="1">
          <Tabs.Root defaultValue="preview" colorPalette="orange">
            <Tabs.List>
              <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
              <Tabs.Trigger value="pdf">PDF</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="preview" paddingTop={4}>
              <Box display="flex" justifyContent="center" paddingBottom={4}>
                <Button
                  colorScheme="teal"
                  size="md"
                  onClick={handleDownloadPNG}
                >
                  Download PNG
                </Button>
              </Box>
              <VisitorBadgePreview />
            </Tabs.Content>

            <Tabs.Content value="pdf" paddingTop={4}>
              <DynamicPdfPreviewerDownloader />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Stack>
    </>
  );
};
