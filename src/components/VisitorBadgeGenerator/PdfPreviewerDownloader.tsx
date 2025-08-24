import { Box, Button } from "@chakra-ui/react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { isMobile } from "react-device-detect";

import { VisitorBadgePDF } from "./VisitorBadgePDF";
import { useVisitorBadgeFormStore } from "./formDataStore";

export const PdfPreviewerDownloader = () => {
  const { formData, photoPreview, qrCodeDataUrl, avatarDataUrl } =
    useVisitorBadgeFormStore();

  return (
    <Box>
      <Box display="flex" justifyContent="center" paddingBottom={4}>
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
            <Button colorScheme="green" size="md" loading={loading}>
              Download PDF
            </Button>
          )}
        </PDFDownloadLink>
      </Box>
      {!isMobile && (
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
    </Box>
  );
};
