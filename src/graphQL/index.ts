import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import { BookType } from './schemas/bookSchema';
import { AuthorType } from './schemas/authorSchema';
import { Author } from '../models/author';
import { Book } from '../models/book';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        book:  {
            type: BookType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: async (parent, args) => Book.findById(args.id)
        },
        author:  {
            type: AuthorType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: async (parent, args) => Author.findById(args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: async () => await Author.find()
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: async () => await Book.find()
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const author = new Author({
                    name: args.name
                });
                await author.save();
                return author;
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorID: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                const book = new Book({
                    name: args.name,
                    authorID: args.authorID
                })
                await book.save();
                return book;
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: mutation
});