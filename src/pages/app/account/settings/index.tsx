import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  Link,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

import { getMessages } from "../../../../messages/getMessages";
import { appAuthRedirect } from "../../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../../utils/trpc";

const AccountSettings = () => {
  const t = useTranslations("UserSettings");
  const userQuery = trpc.user.get.useQuery();
  const updateUserMutation = trpc.user.update.useMutation();
  const router = useRouter();

  const isLoading = userQuery.isLoading;

  const [userName, setUserName] = useState<null | string>(null);
  const toast = useToast();

  useEffect(() => {
    if (userName === null) {
      setUserName(userQuery.data?.name || "");
    }
  }, [userName, userQuery.data]);

  const onSaveClick = async () => {
    if (!userName) return;
    await updateUserMutation.mutateAsync({
      name: userName,
    });
    toast({
      title: t("toastTitleAccountUpdated"),
      description: t("toastDescriptionAccountUpdated"),
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    router.push("/app");
  };

  return (
    <>
      <VStack alignItems={"flex-start"}>
        <Box width={"100%"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <HStack spacing={"3"}>
              <IconButton
                size={"sm"}
                variant={"ghost"}
                aria-label={"close"}
                icon={<Icon as={FiX} />}
                as={Link}
                href={"/app"}
              />
              <Box height={"100%"} paddingY={"2"}>
                <Divider orientation="vertical" />
              </Box>
              <Heading
                as={"h1"}
                color={"gray.700"}
                fontWeight={500}
                fontSize={"md"}
              >
                {t("headingAccountSettings")}
              </Heading>
            </HStack>
            <HStack>
              {/* <Button variant={"outline"}>Save and add more</Button> */}
              <Button
                size={{ base: "sm", md: "md" }}
                colorScheme="orange"
                backgroundColor={"orange.400"}
                textColor={"white"}
                _hover={{
                  backgroundColor: "orange.500",
                }}
                onClick={onSaveClick}
              >
                {t("buttonSaveAccount")}
              </Button>
            </HStack>
          </Box>
        </Box>
        <Divider />
        <Container maxW={"container.sm"} paddingTop={4}>
          <VStack width={"100%"} alignItems={"flex-start"} spacing={4}>
            <Heading as={"h1"} fontSize={"lg"} color={"gray.700"}>
              {t("headingOfficeInformation")}
            </Heading>

            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <FormControl>
                  <FormLabel>{t("labelOfficeName")}</FormLabel>
                  <Input
                    value={userName || ""}
                    placeholder={t("exampleName")}
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    maxW={"500px"}
                  />
                  <FormHelperText>{t("helperTextOfficeName")}</FormHelperText>
                </FormControl>
              </>
            )}
          </VStack>
        </Container>
      </VStack>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect, session } = await appAuthRedirect({
    context,
  });
  if (redirect) return { redirect };

  const messages = await getMessages(context);

  return {
    props: {
      session,
      messages,
    },
  };
};

export default AccountSettings;
