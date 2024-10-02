import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
// import Recipe from '../components/Recipe/RecipeList';
import Nav from '../components/Nav/Nav';  


const GET_USER_RECIPES = gql`
  query getUser($userId: ID!) {
    user(_id: $userId) {
      _id
      firstName
      lastName
      favourites {
        _id
        title
        photoUrl
        chefKissCount
        ingredients
        instructions
        user {
          firstName
          lastName
        }
      }
      submittedRecipes {
        _id
        title
        photoUrl
        chefKissCount
        ingredients
        instructions
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

const Profile = ({ userId }) => {
  // State to control which tab is active (favourites or submitted recipes)
  const [activeTab, setActiveTab] = useState('favourites');

  // Fetching user data using Apollo Client's useQuery hook
  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;

  const { favourites, submittedRecipes } = data.user;

  return (
    <div>
      {/* NavBar */}
      {/* <Nav /> */}

      {/* Profile Header */}
      <h1>{data.user.firstName}'s Profile</h1>

      {/* Tabbed Navigation to Switch Between "Favourites" and "Submitted Recipes" */}
      <div className="tabs">
        <button
          className={activeTab === 'favourites' ? 'active-tab' : ''}
          onClick={() => setActiveTab('favourites')}
        >
          Favourites
        </button>
        <button
          className={activeTab === 'submittedRecipes' ? 'active-tab' : ''}
          onClick={() => setActiveTab('submittedRecipes')}
        >
          Submitted Recipes
        </button>
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      <div>
        {activeTab === 'favourites' && (
          <section>
            <h2>Recipes You Liked</h2>
            {favourites.length > 0 ? (
              favourites.map((recipe) => (
                <Recipe key={recipe._id} recipe={recipe} userId={userId} />
              ))
            ) : (
              <p>You have not liked any recipes yet.</p>
            )}
          </section>
        )}

        {activeTab === 'submittedRecipes' && (
          <section>
            <h2>Your Submitted Recipes</h2>
            {submittedRecipes.length > 0 ? (
              submittedRecipes.map((recipe) => (
                // <Recipe key={recipe._id} recipe={recipe} userId={userId} />
                <h2>test</h2>
              ))
            ) : (
              <p>You have not submitted any recipes yet.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Profile;