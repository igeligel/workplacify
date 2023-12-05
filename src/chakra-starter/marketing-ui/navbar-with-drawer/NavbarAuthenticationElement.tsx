import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const NavbarAuthenticationElement = () => {
  const { status } = useSession();

  const router = useRouter();

  return (
    <>
      {status === "authenticated" ? (
        <Button
          href={"/app"}
          as={Link}
          fontSize={"sm"}
          variant={"link"}
          color={"gray.600"}
          fontWeight={"semibold"}
          textDecoration={"none"}
          _hover={{
            textDecoration: "none",
            color: "gray.800",
          }}
          width={{ base: "100%", md: "auto" }}
        >
          To the app
        </Button>
      ) : (
        <>
          <Button
            href={"/api/auth/signin"}
            cursor={"pointer"}
            as={Link}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            width={{ base: "100%", md: "auto" }}
            textDecoration={"none"}
            _hover={{
              textDecoration: "none",
              color: "gray.800",
            }}
            onClick={async (e) => {
              e.preventDefault();
              router.push("/api/auth/signin");
            }}
          >
            Sign In
          </Button>
          <Button
            href={"/api/auth/signin"}
            cursor={"pointer"}
            as={Link}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            textDecoration={"none"}
            bg={"orange.400"}
            _hover={{
              bg: "orange.500",
              textDecoration: "none",
            }}
            width={{ base: "100%", md: "auto" }}
            onClick={async (e) => {
              e.preventDefault();
              router.push("/api/auth/signin");
            }}
          >
            Sign up
          </Button>
        </>
      )}
    </>
  );
};
