import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { toPng } from "html-to-image";

// import QRCode from "react-qr-code";

// Register fonts
Font.register({
  family: "Inter",
  src: "https://rsms.me/inter/font-files/Inter-Regular.woff2",
});

Font.register({
  family: "Inter-Bold",
  src: "https://rsms.me/inter/font-files/Inter-Bold.woff2",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginBottom: 20,
  },
  content: {
    flexDirection: "row",
    marginTop: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 40,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    fontFamily: "Inter",
    color: "#4A5568",
    marginBottom: 8,
  },
  host: {
    fontSize: 14,
    fontFamily: "Inter",
    color: "#718096",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    fontFamily: "Inter",
    color: "#718096",
    marginTop: "auto",
  },
  qrCode: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: 100,
    height: 100,
  },
});

interface VisitorBadgePDFProps {
  formData: {
    name: string;
    company: string;
    date: string;
    hostEmployee: string;
    includeQR: boolean;
  };
  photoPreview: string | null;
  qrCodeDataUrl: string;
  avatarDataUrl: string;
}

export function VisitorBadgePDF({
  formData,
  photoPreview,
  qrCodeDataUrl,
  avatarDataUrl,
}: VisitorBadgePDFProps) {
  return (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.header}>
          <Image
            src="/logo-squared-transparent-background-500x.png"
            style={styles.logo}
          />
          <Text style={styles.title}>VISITOR</Text>
        </View>

        <View style={styles.content}>
          <Image src={photoPreview || avatarDataUrl} style={styles.photo} />

          <View style={styles.info}>
            <Text style={styles.name}>{formData.name}</Text>
            <Text style={styles.company}>{formData.company}</Text>
            {formData.hostEmployee && (
              <Text style={styles.host}>Host: {formData.hostEmployee}</Text>
            )}
            <Text style={styles.date}>
              Date: {format(new Date(formData.date), "MMM dd, yyyy")}
            </Text>
          </View>
        </View>

        {formData.includeQR && (
          <Image src={qrCodeDataUrl} style={styles.qrCode} />
        )}
      </Page>
    </Document>
  );
}

// Helper function to convert QR code to image
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getQRCodeImage(_qrCodeValue: string): Promise<string> {
  const qrCodeElement = document.createElement("div");
  qrCodeElement.style.padding = "8px";
  qrCodeElement.style.background = "white";

  const qrCode = document.createElement("div");
  qrCode.style.width = "256px";
  qrCode.style.height = "256px";

  qrCodeElement.appendChild(qrCode);
  document.body.appendChild(qrCodeElement);

  // const qrCodeComponent = (
  //   <QRCode
  //     value={qrCodeValue}
  //     size={256}
  //     style={{ height: "auto", maxWidth: "100%", width: "100%" }}
  //     viewBox="0 0 256 256"
  //   />
  // );

  // Convert QR code to PNG
  const dataUrl = await toPng(qrCodeElement, { quality: 1.0 });

  document.body.removeChild(qrCodeElement);
  return dataUrl;
}
