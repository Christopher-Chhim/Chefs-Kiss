import { gql } from '@apollo/client';

export const QUERY_RECIPE = gql`
  query getRecipes($recipe: ID) {
    recipes(recipe: $recipe) {
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
    votes {
      value
    }
    createdAt
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_COMMENTS = gql`
  query getComments($comments: ID)
  {
    comments {
      _id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export const QUERY_ALL_RECIPES = gql`
{
  recipes {
    id
    title
    ingredients
    instructions
    creator {
      username
    }
    createdAt
   }
  }
`;

export const QUERY_USER = gql`
  {
    me {
      id
      username
      email
        favorites {
          id
          title
        }
      }
    }
  }
`;

export const QUERY_VOTES = gql`
query getVotes($votes: ID)
{
  votes {
  value
  }

}`;

export const QUERY_FAVORITES = gql`{
  me {
    favorites {
      id
      title
      creator {
        username
      }
    }
  }
}`;