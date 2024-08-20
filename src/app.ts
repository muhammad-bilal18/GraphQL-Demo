import express from 'express';
import config from 'config';
import { schema } from './graphQL/index';
import { graphqlHTTP } from 'express-graphql';
import { createConnection } from './start/db';

createConnection();

const app = express();
const PORT = config.get('PORT') || 3000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
