import { GraphQLClient } from "graphql-request";
const hygraph = new GraphQLClient(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_ENDPOINT_ACCESS_TOKEN}`,
  },
});

export default hygraph;
