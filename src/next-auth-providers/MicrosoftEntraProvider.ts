import { Provider } from "next-auth/providers/index";

type MicrosoftEntraConfig = {
  clientId: string;
  clientSecret: string;
  issuer: string;
};

export const MicrosoftEntraProvider = (
  config: MicrosoftEntraConfig,
): Provider => {
  return {
    id: "microsoft-entra-id",
    name: "Microsoft Entra ID",
    type: "oauth", // "oidc",
    idToken: true,
    client: { token_endpoint_auth_method: "client_secret_post" },
    issuer: "https://microsoftonline.com",
    authorization: {
      url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      params: { scope: "openid profile email User.Read" },
    },
    wellKnown:
      "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
    checks: ["state"],
    token: {
      url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    async profile(profile: any, tokens: any) {
      // https://learn.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0&tabs=http#examples
      const response = await fetch(
        `https://graph.microsoft.com/v1.0/me/photos/${648}x${648}/$value`,
        { headers: { Authorization: `Bearer ${tokens.access_token}` } },
      );

      // Confirm that profile photo was returned
      let image;
      // TODO: Do this without Buffer
      if (response.ok && typeof Buffer !== "undefined") {
        try {
          const pictureBuffer = await response.arrayBuffer();
          const pictureBase64 = Buffer.from(pictureBuffer).toString("base64");
          image = `data:image/jpeg;base64, ${pictureBase64}`;
        } catch {}
      }

      const realProfile = {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: image ?? null,
      };

      return realProfile;
    },
    style: {
      text: "#fff",
      bg: "#0072c6",
      logo: "https://learn.microsoft.com/en-us/entra/fundamentals/media/new-name/microsoft-entra-id-icon.png",
    },
    options: config,
  };
};
