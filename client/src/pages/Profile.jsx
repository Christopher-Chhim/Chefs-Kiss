import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import RecipeCard from '../components/Recipe/RecipeCard';
import Nav from '../components/Nav/Nav';

const GET_USER_RECIPES = gql`
  query {
    getUser {
      _id
      firstName
      lastName
      email
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

  // Handling the loading state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;

  // Destructure user object and set defaults for `favourites` and `submittedRecipes`
  var { favourites = [], submittedRecipes = [] } = data?.getUser || {};
  if(!favourites)
    favourites = []
  return (
    <div>
      {/* NavBar */}
      {/* <Nav /> */}

      {/* Profile Header */}
      <h1>{data?.getUser?.firstName}'s Profile</h1>

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
                // Replace `test` with your actual Recipe component
                <RecipeCard key={recipe._id} recipe={recipe} userId={userId} />
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
