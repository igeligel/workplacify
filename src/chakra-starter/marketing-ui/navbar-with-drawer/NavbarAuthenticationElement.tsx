import { Button, Link } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const NavbarAuthenticationElement = () => {
  const { status } = useSession();
  const t = useTranslations("Menu");

  const router = useRouter();

  return (
    <>
      {status === "authenticated" ? (
        <Link
          asChild
          fontSize={"sm"}
          color={"gray.600"}
          fontWeight={"semibold"}
          textDecoration={"none"}
          _hover={{
            textDecoration: "none",
            color: "gray.800",
          }}
          width={"max-content"}
        >
          <NextLink href={"/app"}>{t("labelToTheApp")}</NextLink>
        </Link>
      ) : (
        <>
          <Link
            cursor={"pointer"}
            asChild
            fontSize={"sm"}
            fontWeight={400}
            width={"max-content"}
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
            <NextLink href={"/api/auth/signin"}>Sign In</NextLink>
          </Link>
          <Button
            asChild
            cursor={"pointer"}
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
            <NextLink href={"/api/auth/signin"}>Sign up</NextLink>
          </Button>
        </>
      )}
    </>
  );
};
