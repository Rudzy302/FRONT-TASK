import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const AUTH_API_URL = import.meta.env.VITE_API_AUTH_URL;
const TASKS_API_URL = import.meta.env.VITE_API_TASKS_URL;

const tasksHttpLink = new HttpLink({ uri: TASKS_API_URL });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = authLink.concat(tasksHttpLink);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
