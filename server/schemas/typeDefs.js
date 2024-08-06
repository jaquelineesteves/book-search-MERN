const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title:String

  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }
  input BookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(userInput: UserInput!): Auth
    saveBook(userId: ID!, bookInput: BookInput!): User
    removeBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;
