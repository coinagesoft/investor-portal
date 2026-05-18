import {
  NextResponse,
} from "next/server";

function base64UrlToBytes(value) {
  const base64 =
    value.replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (value.length % 4)) % 4);

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function verifyJwt(token) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    throw new Error("Invalid token");
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBytes(signature),
    encoder.encode(`${header}.${payload}`)
  );

  if (!isValid) {
    throw new Error("Invalid token signature");
  }

  const decodedPayload = JSON.parse(
    new TextDecoder().decode(base64UrlToBytes(payload))
  );

  if (decodedPayload.exp && decodedPayload.exp * 1000 < Date.now()) {
    throw new Error("Token expired");
  }

  return decodedPayload;
}

export async function middleware(req) {

  const token =
    req.cookies.get(
      "token"
    )?.value;

  const protectedRoutes = [
    "/dashboard",
    "/category",
    "/files",
    "/folders",
  ];

  const isProtected =
    protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );

  // Protect routes
  if (isProtected) {

    if (!token) {

      return NextResponse.redirect(
        new URL(
          "/login",
          req.url
        )
      );
    }

    try {

      await verifyJwt(token);

    } catch (error) {

      return NextResponse.redirect(
        new URL(
          "/login",
          req.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/category/:path*",
    "/files/:path*",
    "/folders/:path*",
  ],
};
