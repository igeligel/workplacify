import { Link } from "@chakra-ui/next-js";
import {
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
import { FiChevronLeft } from "react-icons/fi";

import { DisplayFloors } from "../../../../components/DisplayFloors";
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
          _hover={{
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
      <VStack paddingTop={4} alignItems={"flex-start"}>
        <Heading as={"h1"} fontSize={"lg"} color={"gray.700"}>
          {getOfficeQuery.data.name}
        </Heading>
        <Text>{getOfficeQuery.data.description}</Text>
      </VStack>
      <VStack divider={<Divider />} alignItems={"flex-start"}>
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

  return {
    props: {
      session,
    },
  };
};

export default OfficePage;
