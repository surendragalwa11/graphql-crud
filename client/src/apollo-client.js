import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';

import {BACKEND_URL} from './config/constant';

const cache = new InMemoryCache();

const link = new HttpLink({
    uri: BACKEND_URL
});

const client = new ApolloClient({
    cache,
    link
});

export default client;