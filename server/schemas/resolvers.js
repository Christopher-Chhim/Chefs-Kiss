const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Recipe, Comment, Category } = require('../models');

const resolvers = {

  Query: {
   
    categories: async () => {
      try {
        return await Category.find();
      } catch (err) {
        throw new Error('Error fetching categories');
      }
    },
    getUser: async (parent, args, context) => {
      // Check if the user is authenticated
      console.log(context)
      if (!context.user) {
        throw new Error('You must be logged in to access this resource');
      }

      try {
        // Fetch the user by ID from the context
        const user = await User.findById(context.user._id).populate('submittedRecipes');
        console.log(user)
        if (!user) {
          console.log("ERR")
          throw new Error('User not found');
        }

        return user;
      } catch (err) {
        throw new Error('Error fetching user: ' + err.message);
      }
    },
   
    recipes: async (parent, { category, name }) => {
      const query = {};

  
      if (category) {
        query.category = category;
      }

    
      if (name) {
        query.title = { $regex: name, $options: 'i' };
      }

      try {
        return await Recipe.find(query).populate('category').populate('user');
      } catch (err) {
        throw new Error('Error fetching recipes');
      }
    },

 
    recipe: async (parent, { _id }) => {
      try {
        return await Recipe.findById(_id).populate('category').populate('user');
      } catch (err) {
        throw new Error('Recipe not found');
      }
    },

    
    user: async (parent, { _id }) => {
      try {
        return await User.findById(_id).populate('submittedRecipes');
      } catch (err) {
        throw new Error('User not found');
      }
    },

    
    searchRecipes: async (parent, { query }) => {
      try {
        const recipes = await Recipe.find({
          $or: [
            { title: { $regex: query, $options: 'i' } }, 
            { ingredients: { $regex: query, $options: 'i' } } 
        ]}).populate('category').populate('user');

        return recipes;
      } catch (err) {
        throw new Error('Error searching for recipes');
      }
    }
  },

 
  Mutation: {
    
    addUser: async (parent, { firstName, lastName, email, password }) => {
      try {
        
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          password: password,
        });
    
        const token = jwt.sign({ _id: newUser._id }, 'mysecretssshhhhhhh');
    
        return { token, user: newUser };
      } catch (err) {
        throw new Error('Error creating the user');
      }
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new Error('No user found with this email');
      }
    
      // Trim and log the password
      const trimmedPassword = password.trim();
      console.log('User found:', user);
      console.log('Password from DB:', user.password);
      console.log('Plaintext password for comparison:', trimmedPassword); // Debugging line
    
      const validPassword = await bcrypt.compare(trimmedPassword, user.password);
    
      if (!validPassword) {
        throw new Error('Incorrect password');
      }
    
      const token = jwt.sign({ _id: user._id }, 'mysecretssshhhhhhh');
    
      return { token, user };
    },
    

  
    postRecipe: async (parent, { title, ingredients, instructions, description }, context ) => {
      if (!context.user) {
        throw new Error('You must be logged in to submit a recipe');
      }

      try {
        const newRecipe = await Recipe.create({
          title,
          description,
          ingredients,
          instructions,
          user: context.user._id,
          createdAt: new Date(),
        });
        console.log(newRecipe)

        await User.findByIdAndUpdate(context.user._id, { $push: { submittedRecipes: newRecipe._id } });

        return newRecipe;
      } catch (err) {
        throw new Error('Error submitting the recipe');
      }
    },

   
    addComment: async (parent, { recipeId, content }, { user }) => {
      if (!user) {
        throw new Error('You must be logged in to comment');
      }

      try {
        const newComment = await Comment.create({
          recipe: recipeId,
          user: user._id,
          content,
          createdAt: new Date(),
        });

        return newComment;
      } catch (err) {
        throw new Error('Error adding the comment');
      }
    },


    giveChefKiss: async (parent, { recipeId, userId }) => {
      try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
          recipeId,
          { $inc: { chefKissCount: 1 } },  
          { new: true }
        );

        await User.findByIdAndUpdate(userId, { $inc: { chefKissCount: 1 } });

        return updatedRecipe;
      } catch (err) {
        throw new Error('Error giving a Chef\'s Kiss');
      }
    },


    updateRecipe: async (parent, { _id, title, description, ingredients, instructions, photoUrl }) => {
      try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
          _id,
          { title, description, ingredients, instructions, photoUrl },
          { new: true }
        );
        
        return updatedRecipe;
      } catch (err) {
        throw new Error('Error updating the recipe');
      }
    },

   
    updateUser: async (parent, { firstName, lastName, email, password, bio }, { user }) => {
      if (!user) {
        throw new Error('You must be logged in to update your profile');
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { firstName, lastName, email, password, bio },
        { new: true }
      );

      return updatedUser;
    }
  }
};

module.exports = resolvers;
