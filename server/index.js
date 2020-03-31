const {ApolloServer} = require('apollo-server');

const typeDefs = require('./typedefs/employee');
const resolvers = require('./resolvers');
const dataSources = require('./datasources');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
});

server.listen(3010).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});