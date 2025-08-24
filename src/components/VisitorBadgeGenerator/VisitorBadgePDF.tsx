import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

interface VisitorBadgePDFProps {
  formData: {
    name: string;
    company: string;
    date: string;
    hostEmployee: string;
    includeQR: boolean;
  };
  photoPreview: string | null;
  qrCodeDataUrl: string | null;
  avatarDataUrl: string | null;
}

export function VisitorBadgePDF(props: VisitorBadgePDFProps) {
  const { formData, photoPreview, qrCodeDataUrl, avatarDataUrl } = props;
  const avatarSource = photoPreview || avatarDataUrl;
  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          backgroundColor: "#ffffff",
          padding: 40,
        }}
      >
        <View
          style={{
            width: "53.98mm",
            height: "100%",
            maxHeight: "85.6mm",
            borderWidth: "1px",
            borderStyle: "dashed",
            borderColor: "gray",
            display: "flex",
            flexDirection: "column",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: "100%",

              alignItems: "center",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                backgroundColor: "hsl(32.1, 97.7%, 83.1%)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "hsl(240, 10%, 3.9%)",
                  fontFamily: "Helvetica",
                }}
              >
                VISITOR
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "10px",
              }}
            >
              {avatarSource && (
                <View
                  style={{
                    aspectRatio: 1,
                    display: "flex",
                    maxHeight: "50px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={avatarSource}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              )}
              <View
                style={{
                  paddingTop: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "hsl(240, 10%, 3.9%)",
                    fontFamily: "Helvetica",
                  }}
                >
                  {formData.name || "Visitor Name"}
                </Text>
                <Text
                  style={{
                    paddingTop: "4px",
                    fontSize: 10,
                    fontWeight: 300,
                    color: "hsl(240, 5.2%, 33.9%)",
                    fontFamily: "Helvetica",
                  }}
                >
                  {formData.company || "Company Name"}
                </Text>
                <Text
                  style={{
                    paddingTop: "4px",
                    fontSize: 8,
                    fontWeight: 300,
                    color: "hsl(240, 5.2%, 33.9%)",
                    fontFamily: "Helvetica",
                  }}
                >
                  Date: {format(new Date(formData.date), "MMM dd, yyyy")}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignSelf: "flex-end",
              backgroundColor: "hsl(32.1, 97.7%, 83.1%)",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            {formData.hostEmployee && (
              <Text
                style={{
                  fontSize: 8,
                  fontWeight: 300,
                  color: "hsl(240, 5.2%, 33.9%)",
                  fontFamily: "Helvetica",
                }}
              >
                Host: {formData.hostEmployee}
              </Text>
            )}
            {formData.includeQR && qrCodeDataUrl && (
              <View
                style={{
                  marginTop: "10px",
                  aspectRatio: 1,
                  display: "flex",
                  maxHeight: "40px",
                  padding: "4px",
                  borderRadius: "3px",
                  backgroundColor: "white",
                }}
              >
                <Image src={qrCodeDataUrl} />
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
