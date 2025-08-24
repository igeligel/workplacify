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
import { domToPng } from "modern-screenshot";

// import QRCode from "react-qr-code";

// Register fonts
// Use system fonts instead of loading external ones
Font.registerHyphenationCallback((word) => [word]);

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
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: "Helvetica",
    fontWeight: 700,
    marginBottom: 30,
  },
  content: {
    flexDirection: "row",
    marginTop: 30,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 36,
    marginBottom: 16,
  },
  company: {
    fontSize: 24,
    color: "#4A5568",
    marginBottom: 16,
  },
  host: {
    fontSize: 20,
    color: "#718096",
    marginBottom: 16,
  },
  date: {
    fontSize: 20,
    color: "#718096",
    marginTop: "auto",
  },
  qrCode: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: 150,
    height: 150,
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
  console.log({
    photoPreview,
    avatarDataUrl,
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            width: "53.98mm",
            height: "85.6mm",
            borderWidth: "1px",
            borderStyle: "dashed",
            borderColor: "gray",
          }}
        >
          <Text>VISITOR</Text>
        </View>
        <View>
          <Image
            src={photoPreview || avatarDataUrl}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <Text style={styles.name}>{formData.name}</Text>
          <Text style={styles.company}>{formData.company}</Text>
          {formData.hostEmployee && (
            <Text style={styles.host}>Host: {formData.hostEmployee}</Text>
          )}
          <Text style={styles.date}>
            Date: {format(new Date(formData.date), "MMM dd, yyyy")}
          </Text>

          {formData.includeQR && <Image src={qrCodeDataUrl} />}
        </View>
        {/* <View style={styles.header}>

          <Text style={styles.title}>VISITOR</Text>
        </View>

        <View style={styles.content}>
          <Image src={photoPreview || avatarDataUrl} style={styles.photo} />

          <View style={styles.info}>




          </View>
        </View>

         */}
      </Page>
    </Document>
  );
}

// Helper function to convert QR code to image
export async function getQRCodeImage(): Promise<string> {
  const qrCodeElement = document.getElementById("qr-code-preview");
  if (!qrCodeElement) {
    throw new Error("QR code element not found");
  }

  // Convert QR code to PNG
  const dataUrl = await domToPng(qrCodeElement, { scale: 4, debug: true });

  return dataUrl;
}
