import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";
import * as SecureStore from "expo-secure-store"

const cache = new InMemoryCache();

const uploadLink = createUploadLink({
  uri: "https://gentle-eyrie-51144.herokuapp.com"
});

async function getToken() {
  return await SecureStore.getItemAsync("jwt_token")
}

const authLink = setContext((_, { headers }) => {
  const token = getToken()
  return {
    headers: {
      ...headers,
      // Authorization: token ? `JWT ${token}` :  "",
    },
    uri: "https://gentle-eyrie-51144.herokuapp.com" + "/graphql/"
  };
});

const graphqlClient = new ApolloClient({
  cache,
  // link: authLink.concat(link),
  link: ApolloLink.from([authLink, uploadLink])
  // credentials: 'include'
});

graphqlClient.defaultOptions = {
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  }
};

export default graphqlClient;
