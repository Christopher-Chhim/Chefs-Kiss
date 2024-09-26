const bcrypt = require('bcrypt');
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
    
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

      
        const token = jwt.sign({ _id: newUser._id }, 'your_secret_key');

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

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign({ _id: user._id }, 'your_secret_key');

      return { token, user };
    },

  
    submitRecipe: async (parent, { input }, { user }) => {
      if (!user) {
        throw new Error('You must be logged in to submit a recipe');
      }

      try {
        const newRecipe = await Recipe.create({
          title: input.title,
          description: input.description,
          ingredients: input.ingredients,
          instructions: input.instructions,
          photoUrl: input.photoUrl,
          category: input.categoryId,
          user: user._id,
          createdAt: new Date(),
        });

        await User.findByIdAndUpdate(user._id, { $push: { submittedRecipes: newRecipe._id } });

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
