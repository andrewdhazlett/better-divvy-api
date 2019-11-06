# Better Divvy API
## Yum! Node.js Coding Challenge

### Usage
```bash
docker pull hazlett/better-divvy-api
docker run -p 3000:3000 -d hazlett/better-divvy-api
curl http://localhost:3000/trips/2019-04-22/recentTrips\?station_ids\=16,17 -H "x-api-token: 12345"
```

#### Available Routes
- `GET /stations/:id`
- `GET /stations/nearbyStations?lat=latitude&lon=longitude`
- `GET /trips/:date/ageGroups?station_ids=list,of,station_ids`
- `GET /trips/:date/recentTrips?station_ids=list,of,station_ids`
- `GET /trips/:date/tripCounts?station_ids=list,of,station_ids`

### Development

#### Installation

```bash
$ npm install
```

#### Configuration

This app uses dotenv for managing environment variables.
The included `.env.example` can be copied directly as `.env`.

#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```