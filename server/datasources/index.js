const SpacexDataSource = require('./spacex');

const dataSources = () => ({
    spacexAPI: new SpacexDataSource(),
})

module.exports = dataSources;