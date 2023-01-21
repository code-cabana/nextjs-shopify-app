import type { NextApiRequest, NextApiResponse } from "next";
import Shopify, { handleError } from "~/lib/shopify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ sessionId: any; error?: string }>
) {
  console.log("PRODUCTS ROUTE");
  const sessionId = await Shopify.session
    .getCurrentId({
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    })
    .catch(handleError("Failed to retreive session", res));
  if (!sessionId) return handleError("Invalid session", res, 400)();
  res.status(200).json({ sessionId });
}
