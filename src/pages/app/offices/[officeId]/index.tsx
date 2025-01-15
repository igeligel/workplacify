import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Icon,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FiChevronLeft, FiPlus } from "react-icons/fi";

import { DisplayFloors } from "../../../../components/DisplayFloors";
import { getMessages } from "../../../../messages/getMessages";
import { appAuthRedirect } from "../../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../../utils/trpc";

const OfficePage = () => {
  const router = useRouter();

  const officeId = router.query.officeId;
  const getOfficeQuery = trpc.office.get.useQuery(
    {
      id: officeId as string,
    },
    {
      enabled: typeof officeId === "string",
    },
  );

  if (getOfficeQuery.isLoading) {
    return <Spinner />;
  }

  if (!getOfficeQuery.data) {
    return (
      <VStack>
        <Text>Office not found</Text>
        <Button
          as={Link}
          backgroundColor={"orange.400"}
          textColor={"white"}
          textDecoration={"none"}
          _hover={{
            textDecoration: "none",
            backgroundColor: "orange.500",
          }}
          href={"/app/offices/new"}
        >
          Add office
        </Button>
      </VStack>
    );
  }

  return (
    <Container maxW={"container.2xl"}>
      <Button
        as={Link}
        href={"/app/offices"}
        variant={"link"}
        leftIcon={<Icon as={FiChevronLeft} />}
        textDecoration={"none"}
        color={"orange.400"}
        _hover={{
          textDecoration: "none",
          color: "orange.600",
        }}
      >
        Offices
      </Button>
      <Box display={"flex"} justifyContent={"space-between"}>
        <VStack paddingTop={4} alignItems={"flex-start"}>
          <Heading as={"h1"} fontSize={"lg"} color={"gray.700"}>
            Name: {getOfficeQuery.data.name}
          </Heading>
          <Text>Description: {getOfficeQuery.data.description}</Text>
        </VStack>
        <Box>
          <Button
            as={Link}
            href={`/app/offices/${getOfficeQuery.data.id}/floors/new`}
            colorScheme="orange"
            leftIcon={<Icon as={FiPlus} />}
            backgroundColor={"orange.400"}
            textColor={"white"}
            textDecoration={"none"}
            _hover={{ backgroundColor: "orange.500", textDecoration: "none" }}
          >
            Add floor
          </Button>
        </Box>
      </Box>
      <VStack
        marginTop={4}
        divider={<Divider />}
        alignItems={"flex-start"}
        spacing={4}
      >
        <Heading as={"h2"} fontSize={"md"} color={"gray.700"}>
          Floors
        </Heading>
        <DisplayFloors
          office={getOfficeQuery.data}
          floors={getOfficeQuery.data.floors}
        />
      </VStack>
    </Container>
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

export default OfficePage;
