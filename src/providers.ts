import GoogleProvider from "next-auth/providers/google";

const isGoogleAuthProviderConfigured = Boolean(
  typeof process.env.GOOGLE_CLIENT_ID === "string" &&
    typeof process.env.GOOGLE_CLIENT_SECRET === "string",
);

const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

export const providers = [
  ...(isGoogleAuthProviderConfigured ? [googleProvider] : []),
];

console.log(JSON.stringify(providers));
