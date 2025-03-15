import { Box, Link as ChakraLink } from "@chakra-ui/react";
import {
  Document,
  Font,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import { isMobile } from "react-device-detect";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    textAlign: "center",
    color: "gray",
  },
});

type PolicyPreviewProps = {
  companyName: string;
  workHours: string;
  remoteWorkDays: string[];
  officeWorkDays: string[];
  communicationTools: string;
  performanceExpectations: string;
  contactInformation: string;
};

type WrapperProps = {
  isMobile: boolean;
  children: ReactElement;
  title: string;
};

const Wrapper = (props: WrapperProps) => {
  const t = useTranslations("HybridWorkplacePolicyGenerator");

  if (props.isMobile) {
    return (
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <ChakraLink
          colorScheme="orange"
          color={"orange.500"}
          textAlign={"center"}
        >
          <PDFDownloadLink document={props.children} fileName={props.title}>
            {({ loading }) =>
              loading ? t("preview.loading") : t("preview.downloadMessage")
            }
          </PDFDownloadLink>
        </ChakraLink>
      </Box>
    );
  }
  return (
    <PDFViewer style={{ height: "100%", width: "100%" }}>
      {props.children}
    </PDFViewer>
  );
};

const PolicyPreview = (props: PolicyPreviewProps) => {
  const t = useTranslations("HybridWorkplacePolicyGenerator");
  const {
    companyName,
    workHours,
    remoteWorkDays,
    officeWorkDays,
    communicationTools,
    performanceExpectations,
    contactInformation,
  } = props;

  Font.register({
    family: "Inter",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
        fontWeight: 400,
      },
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
        fontWeight: 700,
      },
    ],
  });

  const title = `${companyName} - ${t("preview.title")}`;

  return (
    <Wrapper isMobile={isMobile} title={title}>
      <Document author="Workplacify" language="en" title={title}>
        <Page size="A4" style={styles.page}>
          <View style={styles.title}>
            <Text>
              {companyName} {t("preview.title")}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              1. {t("preview.introduction.title")}
            </Text>
            <Text style={styles.text}>
              {t("preview.introduction.description", { companyName })}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              2. {t("preview.workSchedule.title")}
            </Text>
            <Text style={styles.text}>
              {t("preview.workSchedule.standardHours")}: {workHours}
            </Text>
            <Text style={styles.text}>
              {t("preview.remoteWork.title")}: {remoteWorkDays.join(", ")}
            </Text>
            <Text style={styles.text}>
              {t("preview.officeWork.title")}: {officeWorkDays.join(", ")}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              3. {t("preview.communication.title")}
            </Text>
            <Text style={styles.text}>
              {t("preview.communication.primaryTools")}: {communicationTools}
            </Text>
            <Text style={styles.text}>
              {t("preview.communication.expectations")}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              4. {t("preview.expectations.title")}
            </Text>
            <Text style={styles.text}>{performanceExpectations}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              5. {t("preview.contact.title")}
            </Text>
            <Text style={styles.text}>{contactInformation}</Text>
          </View>

          <View style={styles.footer}>
            <Text>{t("preview.footer")}</Text>
          </View>
        </Page>
      </Document>
    </Wrapper>
  );
};

export default PolicyPreview;
