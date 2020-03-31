const {RESTDataSource} = require('apollo-datasource-rest');

class SpacexDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v2/';
    }

    async getAllLaunches() {
        const launches = await this.get('launches');
        return launches;
    }

    async getLaunchById({launchId}) {
        const response = await this.get('launches', { flight_number: launchId });
        return this.launchReducer(response[0]);
    }

    getLaunchesByIds({ launchIds }) {
        return Promise.all(
          launchIds.map(launchId => this.getLaunchById({ launchId })),
        );
    }
}

module.exports = SpacexDataSource;
