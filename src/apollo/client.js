import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: new HttpLink({
    // uri: 'https://graph-node.avax.network/subgraphs/name/dasconnor/pangolindex',
    // uri: 'http://127.0.0.1:8000/subgraphs/name/dasconnor/pangolindex'
    url: "http://167.99.252.142:8000/subgraphs/name/dasconnor/pangolindex"
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    // they left it as is
    uri: 'https://api.thegraph.com/index-node/graphql',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const stakingClient = new ApolloClient({
  link: new HttpLink({
    // they left it as is
    // no idea what does it do though
    uri: 'https://api.thegraph.com/subgraphs/name/way2rach/talisman',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    // leave as is
    uri: 'https://graph-node.avax.network/subgraphs/name/dasconnor/avalancheblocks',
  }),
  cache: new InMemoryCache(),
})
