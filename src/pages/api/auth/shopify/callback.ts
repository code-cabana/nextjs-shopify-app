import type { NextApiRequest, NextApiResponse } from "next";
import Shopify, { handleError } from "~/lib/shopify";

// https://github.com/Shopify/shopify-api-js/blob/main/docs/reference/auth/callback.md
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error?: string }>
) {
  console.log("CALLBACK ROUTE");
  const response = await Shopify.auth
    .callback({
      rawRequest: req,
      rawResponse: res,
    })
    .catch(handleError("Failed to complete OAuth process", res));

  console.log("RESPONSE", response);
  // todo: add response.session.toObject() to storage

  res.redirect("/");
}
