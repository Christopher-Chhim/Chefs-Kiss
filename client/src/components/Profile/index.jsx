import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Recipe from '../components/Recipe'; 

const GET_USER_RECIPES = gql`
  query getUserRecipes($user: ID){
    getUserRecipes(user: $user) {
      _id
      title
      description
      ingredients
      instructions
      createdAt
      # You can add more fields here if your Recipe type has them, e.g.:
      image
    }
  }
`;

const Profile = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    // variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;

  const { favourites, submittedRecipes } = data.user;

  return (
    <div>
      <h1>{data.user.firstName}'s Profile</h1>

      {/* Section for Favourite Recipes */}
      <section>
        <h2>Favorite Recipes</h2>
        {favourites.length > 0 ? (
          favourites.map((recipe) => (
            <Recipe key={recipe._id} recipe={recipe} userId={userId} />
          ))
        ) : (
          <p>You have no favorite recipes yet.</p>
        )}
      </section>

      {/* Section for Submitted Recipes */}
      <section>
        <h2>Your Submitted Recipes</h2>
        {submittedRecipes.length > 0 ? (
          submittedRecipes.map((recipe) => (
            <Recipe key={recipe._id} recipe={recipe} userId={userId} />
          ))
        ) : (
          <p>You have not submitted any recipes yet.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;