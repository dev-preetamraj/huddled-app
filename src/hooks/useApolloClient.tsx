import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { setContext } from '@apollo/client/link/context';

const useApolloClient = () => {
  const { user } = useUser();

  const httpLink = createHttpLink({
    uri: process.env.EXPO_PUBLIC_GRAPHQL_SERVER_URI,
  });

  const authLink = setContext((_, { headers }) => {
    const token = user ? user.id : '';

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
};

export default useApolloClient;
