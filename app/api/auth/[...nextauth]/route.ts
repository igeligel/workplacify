import { NextRequest } from "next/server";

import { handlers } from "../../../../src/auth";

const reqWithTrustedOrigin = (req: NextRequest): NextRequest => {
  if (process.env.AUTH_TRUST_HOST !== "true") {
    console.log(
      "AUTH_TRUST_HOST is not set to true, skipping x-forwarded headers.",
    );
    return req;
  }
  const proto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("x-forwarded-host");
  if (!proto || !host) {
    console.warn("Missing x-forwarded-proto or x-forwarded-host headers.");
    return req;
  }
  const envOrigin = `${proto}://${host}`;
  const { href, origin } = req.nextUrl;

  const newUrl = href.replace(origin, envOrigin);
  console.log({
    envOrigin,
    href,
    origin,
    newUrl,
  });

  const newRequest = new NextRequest(newUrl, req);
  console.log({ newRequest });

  return newRequest;
};

export const GET = (req: NextRequest) => {
  const requestWithTrustedOrigin = reqWithTrustedOrigin(req);
  console.log({
    requestWithTrustedOrigin,
  });
  return handlers.GET(requestWithTrustedOrigin);
};

export const POST = (req: NextRequest) => {
  const requestWithTrustedOrigin = reqWithTrustedOrigin(req);
  console.log({
    requestWithTrustedOrigin,
  });
  return handlers.POST(requestWithTrustedOrigin);
};
