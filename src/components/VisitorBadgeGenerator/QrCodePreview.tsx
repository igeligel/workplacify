import { Box } from "@chakra-ui/react";
import { domToPng } from "modern-screenshot";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useDebounce } from "react-use";

import { useVisitorBadgeFormStore } from "./formDataStore";

type QrCodePreviewProps = {
  id?: string;
};

export const QrCodePreview = (props: QrCodePreviewProps) => {
  const [qrValue, setQrValue] = useState<string>("");
  const { formData, setQrCodeDataUrl } = useVisitorBadgeFormStore();

  const qrCodeRef = useRef<SVGSVGElement>(null);

  useDebounce(
    () => {
      const updateDataUrl = async () => {
        if (qrCodeRef.current) {
          const qrCode = qrCodeRef.current;
          const dataUrl = await domToPng(qrCode, { scale: 4, debug: true });
          if (props.id === "qr-code-preview") {
            setQrCodeDataUrl(dataUrl);
          }
        }
      };

      updateDataUrl();
    },
    400,
    [qrCodeRef, setQrCodeDataUrl, qrValue],
  );

  useDebounce(
    () => {
      setQrValue(
        JSON.stringify({
          name: formData.name,
          company: formData.company,
          date: formData.date,
          host: formData.hostEmployee,
        }),
      );
    },
    400,
    [formData],
  );

  return (
    <Box id={props.id} ref={qrCodeRef}>
      <QRCode
        value={qrValue}
        size={64}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        viewBox={`0 0 256 256`}
      />
    </Box>
  );
};
