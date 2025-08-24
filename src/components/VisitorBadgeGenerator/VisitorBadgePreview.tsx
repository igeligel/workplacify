import { Box, Heading, Text } from "@chakra-ui/react";
import { format } from "date-fns";

import { QrCodePreview } from "./QrCodePreview";
import { VisitorBadgeAvatar } from "./VisitorBadgeAvatar";
import { useVisitorBadgeFormStore } from "./formDataStore";

export function VisitorBadgePreview() {
  const { formData } = useVisitorBadgeFormStore();
  return (
    <Box id="visitor-badge-preview-png">
      <Box
        id="badge-preview"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        boxShadow="lg"
        width="100%"
        maxW="300px"
        mx="auto"
        position="relative"
        aspectRatio="0.63"
        overflow="hidden"
        display={"flex"}
        flexDirection={"column"}
      >
        <Box flex={1}>
          {/* Header */}
          <Box
            backgroundColor="orange.200"
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            paddingY={"10px"}
          >
            <Text fontWeight={"bold"}>VISITOR</Text>
          </Box>
          <Box display={"flex"} justifyContent={"center"} paddingTop={"18px"}>
            <VisitorBadgeAvatar />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            paddingTop={"18px"}
          >
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
            <Text fontSize="sm" color="gray.500" mt="auto">
              Date: {format(new Date(formData.date), "MMM dd, yyyy")}
            </Text>
          </Box>
        </Box>

        <Box
          backgroundColor="orange.200"
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingBottom={"18px"}
          flex={0}
          paddingTop={"12px"}
        >
          {formData.hostEmployee && (
            <Text fontSize="sm" color="gray.500">
              Host: {formData.hostEmployee}
            </Text>
          )}
          {formData.includeQR && (
            <Box
              bg="white"
              p={2}
              borderRadius="md"
              boxSize="80px"
              marginTop={"12px"}
            >
              {/* No id to not override the picture taking functionality */}
              <QrCodePreview />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
