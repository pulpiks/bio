import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: '/graphql'
});

export {
    client,
    gql
}