import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { authors } from '../../database';
import { AuthorType } from './authorSchema';
import { Author } from '../../models/author';

export const BookType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorID: { type: GraphQLNonNull(GraphQLID) },
        author: {
            type: AuthorType,
            resolve: async (book) => await Author.findById(book.authorID)
        }
    })
});