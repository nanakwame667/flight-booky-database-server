const Application   = require('./src/app.js');
const PORT          = process.env.PORT || require('./src/utils/constants').PORT;

function startAppServer(){

    Application.Database
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');

            //create tables if not exist
            require('./src/models/admin').sync();
            require('./src/models/user').sync();
            require('./src/models/flight').sync();
            require('./src/models/reservation').sync();

            //start sercer
            let app = Application.AppServer;
            let APIServer = app.listen(PORT, ()=>{
                let host = APIServer.address().address;
                let port = APIServer.address().port;
                console.log("Running App Server: http://%s:%s", host, port);
            });
        })
        .catch(err => console.error('Unable to connect to the database:', err));
}

startAppServer();