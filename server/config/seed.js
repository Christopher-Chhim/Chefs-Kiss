const db = require('../config/connection');
const { User, Recipe, ChefsKiss, Comment } = require('../models');
const userSeeds = require('./userSeeds.json');
const recipeSeeds = require('./recipeSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean existing data
    // await cleanDB('ChefsKiss', 'chefsKisses');
    // await cleanDB('Comment', 'comments');
    await cleanDB('Recipe', 'recipes');
    await cleanDB('User', 'users');

    // Seed users
    const users = await User.create(userSeeds);

    // Seed recipes and associate them with users
    for (let i = 0; i < recipeSeeds.length; i++) {
      const recipeData = recipeSeeds[i];

      // Find the user who created the recipe
      const creator = users.find(user => user.email === recipeData.creator);

      if (creator) {
        const recipe = await Recipe.create({
          ...recipeData,
          creator: creator._id
        });

        // Optionally, update user's list of recipes
        await User.findByIdAndUpdate(creator._id, { $addToSet: { recipes: recipe._id } });
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seeding complete!');
  process.exit(0);
});
