import {
  Box,
  Button,
  Container,
  Field,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  Separator,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

import { toaster } from "../../../../components/ui/toaster";
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
    toaster.create({
      title: t("toastTitleAccountUpdated"),
      description: t("toastDescriptionAccountUpdated"),
      type: "success",
      duration: 5000,
      closable: true,
    });
    router.push("/app");
  };

  return (
    <>
      <VStack alignItems={"flex-start"}>
        <Box width={"100%"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <HStack gap={"3"}>
              <IconButton
                size={"sm"}
                variant={"ghost"}
                aria-label={"close"}
                asChild
              >
                <NextLink href={"/app"}>
                  <Icon as={FiX} />
                </NextLink>
              </IconButton>
              <Box height={"100%"} paddingY={"2"}>
                <Separator orientation="vertical" />
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
                colorPalette="orange"
                backgroundColor={"orange.400"}
                color={"white"}
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
        <Separator />
        <Container maxW={"container.sm"} paddingTop={4}>
          <VStack width={"100%"} alignItems={"flex-start"} gap={4}>
            <Heading as={"h1"} fontSize={"lg"} color={"gray.700"}>
              {t("headingOfficeInformation")}
            </Heading>

            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <Field.Root>
                  <Field.Label>{t("labelOfficeName")}</Field.Label>
                  <Input
                    value={userName || ""}
                    placeholder={t("exampleName")}
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    maxW={"500px"}
                  />
                  <Field.HelperText>
                    {t("helperTextOfficeName")}
                  </Field.HelperText>
                </Field.Root>
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
