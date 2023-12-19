import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { setContext } from '@apollo/client/link/context';
import { encrypt } from '@/lib/encryption';

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.EXPO_PUBLIC_GRAPHQL_SERVER_URI,
  });

  const authLink = setContext((_, { headers }) => {
    const { user } = useUser();
    const token = user ? user.id : '';
    const encryptedToken = encrypt(token);

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${encryptedToken}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
};

export default createApolloClient;
