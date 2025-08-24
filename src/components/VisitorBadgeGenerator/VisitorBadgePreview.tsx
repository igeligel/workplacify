import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Avatar from "boring-avatars";
import QRCode from "react-qr-code";

interface VisitorBadgePreviewProps {
  formData: {
    name: string;
    company: string;
    date: string;
    hostEmployee: string;
    includeQR: boolean;
  };
  photoPreview: string | null;
}

export function VisitorBadgePreview({
  formData,
  photoPreview,
}: VisitorBadgePreviewProps) {
  const qrValue = JSON.stringify({
    name: formData.name,
    company: formData.company,
    date: formData.date,
    host: formData.hostEmployee,
  });

  return (
    <Box
      id="badge-preview"
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      bg="white"
      boxShadow="lg"
      width="100%"
      maxW="400px"
      mx="auto"
      position="relative"
      aspectRatio="1.4"
    >
      {/* Header */}
      <VStack gap={4} align="center" mb={6}>
        {/* <Icon>
          <WorkplacifyIcon />
        </Icon> */}
        <Heading size="md" textAlign="center">
          VISITOR
        </Heading>
      </VStack>

      {/* Photo/Avatar */}
      <Box
        position="absolute"
        top="50%"
        left="24px"
        transform="translateY(-50%)"
        boxSize="100px"
        overflow="hidden"
        borderRadius="full"
      >
        <Box id="visitor-badge-preview-photo">
          {photoPreview ? (
            <Image
              src={photoPreview}
              alt="Visitor photo"
              boxSize="100px"
              objectFit="cover"
            />
          ) : (
            <Avatar
              size={100}
              name={formData.name || "Visitor"}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          )}
        </Box>
      </Box>

      {/* Visitor Information */}
      <VStack gap={2} align="flex-start" ml="140px" flex={1}>
        <Heading
          size="md"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {formData.name || "Visitor Name"}
        </Heading>
        <Text
          fontSize="md"
          color="gray.600"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {formData.company || "Company Name"}
        </Text>
        {formData.hostEmployee && (
          <Text
            fontSize="sm"
            color="gray.500"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Host: {formData.hostEmployee}
          </Text>
        )}
        <Text fontSize="sm" color="gray.500" mt="auto">
          Date: {formData.date}
        </Text>
      </VStack>

      {/* QR Code */}
      {formData.includeQR && (
        <Box
          position="absolute"
          bottom="24px"
          right="24px"
          bg="white"
          p={2}
          borderRadius="md"
          boxSize="80px"
        >
          <Box id="qr-code-preview">
            <QRCode
              value={qrValue}
              size={64}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
