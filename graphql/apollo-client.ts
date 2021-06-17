import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from '@apollo/client/link/ws';
import ws from 'isomorphic-ws';

const httpLink = new HttpLink({
  uri: 'https://countries.trevorblades.com'
});

const wsLink = new WebSocketLink({ 
  uri: 'ws://localhost:4003/graphql',
  options: {
    reconnect: true
  },
  webSocketImpl: ws
});

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;