const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID!
    name: String!
  }

  type Recipe {
    _id: ID!
    title: String!
    description: String
    ingredients: [String!]!
    instructions: String!
    photoUrl: String
    chefKissCount: Int!
    category: Category
    user: User!
    createdAt: String!
  }

  type Comment {
    _id: ID!
    recipe: Recipe!
    user: User!
    content: String!
    createdAt: String!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    favourites: 
    submittedRecipes: [Recipe!]!
    chefKissCount: Int!
    comments: [Comment]
  }

  type Auth {
    token: ID!
    user: User!
  }

  input RecipeInput {
    title: String!
    description: String
    ingredients: [String!]!
    instructions: String!
    photoUrl: String
    categoryId: ID
  }


  type Query {
    categories: [Category!]!
    recipes(category: ID, name: String): [Recipe!]!
    recipe(_id: ID!): Recipe
    user(_id: ID!): User
    comments(recipeId: ID!): [Comment!]! 
    recipe(_id: ID!): Recipe
    searchRecipes(query: String!): [Recipe!]!  
  
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    submitRecipe(input: RecipeInput!): Recipe!
    addComment(recipeId: ID!, content: String!): Comment!
    giveChefKiss(recipeId: ID!, userId: ID!): Recipe!
    updateRecipe(_id: ID!, title: String, description: String, ingredients: [String], instructions: String, photoUrl: String): Recipe
    updateUser(firstName: String, lastName: String, email: String, password: String, bio: String): User
  }
`;

module.exports = typeDefs;