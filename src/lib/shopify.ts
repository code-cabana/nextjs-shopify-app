import "@shopify/shopify-api/adapters/node";
import {
  shopifyApi,
  ShopifyError,
  LATEST_API_VERSION,
} from "@shopify/shopify-api";
import type { NextApiResponse } from "next";

// https://github.com/Shopify/shopify-api-js/blob/main/docs/reference/shopifyApi.md
const Shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_CLIENT_ID || "",
  apiSecretKey: process.env.SHOPIFY_CLIENT_SECRET || "",
  apiVersion: LATEST_API_VERSION,
  scopes: ["read_products"],
  hostName: process.env.HOST || "https://example.com",
  isEmbeddedApp: true,
});

// Converts impure shop query parameter to a sanitized shop name
export function getSanitizedShop(
  shop: string | string[] | undefined,
  res: NextApiResponse
) {
  if (typeof shop !== "string")
    return res.status(400).json({ error: "Invalid shop name" });
  const sanitizedShop = Shopify.utils.sanitizeShop(shop, true);
  if (!sanitizedShop)
    return res.status(400).json({ error: "Invalid shop name" });
  return sanitizedShop;
}

export function handleError(
  description: string,
  res: NextApiResponse,
  status: number = 500
) {
  return (error?: Error) => {
    if (error) console.log(error);
    res.writeHead(status);
    if (error instanceof ShopifyError) res.end(error.message);
    else res.end(`${description}${error ? ` | ${error.message}` : ""}`);
  };
}

export default Shopify;
