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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

import { trpc } from "../../../../utils/trpc";

const AccountSettings = () => {
  const userQuery = trpc.user.get.useQuery();
  const updateUserMutation = trpc.user.update.useMutation();
  const router = useRouter();

  const isLoading = userQuery.isLoading;

  const [userName, setUserName] = useState<null | string>(null);
  const toast = useToast();

  useEffect(() => {
    if (userName === null) {
      setUserName(userQuery.data?.name ?? "");
    }
  }, [userName, userQuery.data]);

  const onSaveClick = async () => {
    if (!userName) return;
    await updateUserMutation.mutateAsync({
      name: userName,
    });
    toast({
      title: "Account updated.",
      description: "Changed the name of your account.",
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
                Account settings
              </Heading>
            </HStack>
            <HStack>
              {/* <Button variant={"outline"}>Save and add more</Button> */}
              <Button
                colorScheme="orange"
                backgroundColor={"orange.400"}
                textColor={"white"}
                _hover={{
                  backgroundColor: "orange.500",
                }}
                onClick={onSaveClick}
              >
                Save account
              </Button>
            </HStack>
          </Box>
        </Box>
        <Divider />
        <Container maxW={"container.sm"} paddingTop={4}>
          <VStack width={"100%"} alignItems={"flex-start"} spacing={4}>
            <Heading as={"h1"} fontSize={"lg"} color={"gray.700"}>
              Office Information
            </Heading>

            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={userName ?? ""}
                    placeholder={"BER-001"}
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    maxW={"500px"}
                  />
                  <FormHelperText>
                    Use your real name so coworkers can identify you
                  </FormHelperText>
                </FormControl>
              </>
            )}
          </VStack>
        </Container>
      </VStack>
    </>
  );
};

export default AccountSettings;
