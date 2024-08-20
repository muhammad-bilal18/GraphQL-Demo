"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = createConnection;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
function createConnection() {
    const url = config_1.default.get('db') || 'mongodb://localhost/gql-demo';
    mongoose_1.default.connect(url)
        .then(() => {
        console.log(`Connected to ${url}`);
    })
        .catch((error) => {
        console.log(`Failed to connect to the database. Error: ${error.message}`);
    });
}
