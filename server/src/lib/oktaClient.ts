import { Client } from "@okta/okta-sdk-nodejs";

export const oktaClient = new Client({
  orgUrl: process.env.ORG_URL,
  token: process.env.REGISTRATION_TOKEN
});
