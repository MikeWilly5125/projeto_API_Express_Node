import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';



class App{

    constructor(){
        this.server = express()
        mongoose.connect('mongodb+srv://juliananenejuju:mxYltZV4IEllh09o@devhouse.nkiti.mongodb.net/?retryWrites=true&w=majority&appName=devHouse')
        // .then(() => {console.log('API funcionando')})
        // .catch(() => {console.log('ERRO!')})

        this.middlewares()
        this.routes()

    };

    middlewares(){
        this.server.use(express.json());

        this.server.use(cors())



        // this.server.use(
        // '/files',
        //  express.static(path.resolve(__dirname, '..', 'uploads'))
        // );

    };

    routes(){
        this.server.use(routes)

    }



}

export default new App().server;