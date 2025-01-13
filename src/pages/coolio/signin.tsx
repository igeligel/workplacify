import { Box } from "@chakra-ui/react";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

import { providers as serverProviders } from "../../providers";

// import { redirect } from "next/navigation";
// import { providers, signIn } from "../../../auth";

type SigninPageProps = {
  providers: any[];
};

const SignInPage = (props: SigninPageProps) => {
  const { providers } = props;
  return (
    <Box>
      {providers.map((provider) => {
        const onClick = async () => {
          await signIn(provider.id, {
            redirectTo: "https://127.0.0.1:3000/api/auth/callback/google",
            redirect: false,
          });
        };

        return (
          <Box onClick={onClick} key={provider.id}>
            {provider.name}
          </Box>
        );
      })}
      {/* {Object.values(providerMap).map((provider) => (
        <form
          key={pr}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "",
              });
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }

              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))} */}
    </Box>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      providers: serverProviders,
    },
  };
};

export default SignInPage;
