module.exports = {
     PORT: 5000,
     ADMIN_REG_PASSWORD: 'boss@flight.booky',
     USER_SECRET_KEY: "Gladys@FLIGHT_BOOKY@$%^#%%^#*200.ADMIN",
     ADMIN_SECRET_KEY: "Gladys@FLIGHT_BOOKY@$%^#%%^#*250.USER",
     DB_PATH: __dirname+'/data/app-database.sqlite',
     RESERVATION_STATUS: {
          COMPLETE: 'complete', 
          NOT_COMPLETE: 'not-complete'
     },
     FLIGHT_TYPE: {
          ONE_WAY: 'one-way', 
          ROUND_TRIP: 'round-trip'
     },
     TRAVEL_CLASS: {
          COACH: 'coach', 
          ECONOMY: 'economy',
          FIRST_CLASS: 'first-class'
     },
}