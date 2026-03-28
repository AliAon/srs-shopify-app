import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "react-router";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(`query { shop { 
    name,
     myshopifyDomain,
        url,
        email, } }`);
  const api = await response.json();
  return api.data.shop;
};

export default function Index() {
  const response = useLoaderData();
  const handleConnectApp = () => {
    window.open(
      `http://localhost:5173/authenticate?shop=${response.myshopifyDomain}&email=${response.email}&appUrl=${response.url}`,
      "_top",
    );
  };

  return (
    <s-page heading="Shopify app template">
      <s-section heading="Connect your app">
        <s-button variant="primary" onClick={handleConnectApp}>
          Connect Now
        </s-button>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
