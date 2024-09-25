import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const POST_RECIPE = gql`
  mutation postRecipe($products: [ID]!) {
    postRecipe(products: $products) {
      _id
      title
      ingredients
      instructions
      image
      creator {
        username
      }
      comments {
      user {
        username
      }
      text
      createdAt
    }
    kisses {
    votes {
      value
    }
    createdAt
    }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
