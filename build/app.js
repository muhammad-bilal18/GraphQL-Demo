"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const index_1 = require("./graphQL/index");
const express_graphql_1 = require("express-graphql");
const db_1 = require("./start/db");
(0, db_1.createConnection)();
const app = (0, express_1.default)();
const PORT = config_1.default.get('PORT') || 3000;
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: index_1.schema,
    graphiql: true
}));
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
