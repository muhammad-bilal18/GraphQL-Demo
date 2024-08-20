import mongoose from "mongoose";
import config from 'config';

export function createConnection() {
    const url: string =  config.get<string>('db') || 'mongodb://localhost/gql-demo';
    
    mongoose.connect(url)
        .then(() => {
            console.log(`Connected to ${url}`);
        })
        .catch((error) => {
            console.log(`Failed to connect to the database. Error: ${error.message}`);
        });
}