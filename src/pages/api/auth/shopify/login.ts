import type { NextApiRequest, NextApiResponse } from "next";
import Shopify, { getSanitizedShop, handleError } from "~/lib/shopify";

// https://github.com/Shopify/shopify-api-js/blob/main/docs/reference/auth/begin.md
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error?: string }>
) {
  console.log("LOGIN ROUTE");
  const { shop } = req.query;
  const sanitizedShop = getSanitizedShop(shop, res);
  if (!sanitizedShop) return;

  await Shopify.auth
    .begin({
      shop: sanitizedShop,
      callbackPath: "/auth/callback",
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    })
    .catch(handleError("Failed to complete OAuth process", res));
}
