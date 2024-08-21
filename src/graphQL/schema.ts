import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { authorMutations, authorQueries } from './Author';
import { bookQueries, bookMutations } from './Book';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...authorQueries,
        ...bookQueries,
    }
});

const mutations = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        ...authorMutations,
        ...bookMutations,
    }
})

export const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: mutations
});