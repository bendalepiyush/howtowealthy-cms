import { GraphQLClient } from "graphql-request";
const hygraph = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.ENDPOINT_ACCESS_TOKEN}`,
  },
});

export default hygraph;
