module.exports = {
    Query: {
        launches: (_, __, {dataSources}) => dataSources.spacexAPI.getAllLaunches(),
        launch: (_, {id}, {dataSources}) => dataSources.spacexAPI.getLaunchById({launchId: id}),
    },
    Mutation: {

    }
}