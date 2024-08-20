import { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import { BookType } from './bookSchema';
import { Book } from '../../models/book';

export const AuthorType: GraphQLObjectType = new GraphQLObjectType({
    name: 'AuthorType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: GraphQLList(BookType),
            resolve: (author) => Book.find({ authorID: author._id })
        }
    })
});