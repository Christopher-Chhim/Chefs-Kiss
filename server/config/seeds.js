const db = require('./connection');
const { User, Vote, Recipe, Comment } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Comment', 'comments');
  await cleanDB('Vote', 'votes');
  await cleanDB('Recipe', 'recipes');
  await cleanDB('User', 'users');

  const recipes = await Recipe.insertMany([
    { title: 'Chocolate chip cookies', 
      ingredients: 
      '2 ¼ cups all-purpose flour, 1 teaspoon baking soda, 1 teaspoon salt, 1 cup (2 sticks) unsalted butter, softened, ¾ cup granulated sugar, ¾ cup packed brown sugar, 1 teaspoon vanilla extract, 2 large eggs, 2 cups semi-sweet chocolate chips, Optional: 1 cup chopped nuts (e.g., walnuts or pecans)',
      instructions: 
      'Preheat the Oven: Preheat your oven to 375°F (190°C). Mix Dry Ingredients: In a medium bowl, combine 2 ¼ cups flour, 1 teaspoon baking soda, and 1 teaspoon salt. Set this mixture aside. Cream the Butter and Sugars: In a large mixing bowl, beat 1 cup of softened butter, ¾ cup granulated sugar, ¾ cup brown sugar, and 1 teaspoon vanilla extract until the mixture is creamy and well-blended. Add Eggs: Add the eggs, one at a time, beating well after each addition. Combine Wet and Dry Ingredients: Gradually add the flour mixture to the wet ingredients, mixing slowly until fully combined. Add Chocolate Chips (and nuts, if using): Stir in the chocolate chips (and nuts, if desired) using a spatula or spoon. Scoop the Dough: Drop rounded tablespoons of cookie dough onto an ungreased baking sheet, leaving about 2 inches between each cookie to allow for spreading. Bake: Bake the cookies for 9-11 minutes or until they are golden brown around the edges. Cool: Let the cookies cool on the baking sheet for 2 minutes, then transfer them to a wire rack to cool completely.',
      image:
      'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/62298.jpg',
      creator: 'Briana',
      votes: '5',
    },
    {
      title: 'Fried rice',
      ingredients:
      '2 to 3 cups of cooked rice, 2 tablespoons of oil, 2 large eggs, 2 to 3 tablespoons of soy sauce, 1 to 1 ½ cups of diced vegetables, 2 cloves of minced garlic, 2 to 3 stalks of chopped green onions, salt and pepper.',
      instructions:
      "Prepare Rice: Ensure the rice is cold and separated. Cook Protein: If using protein, cook it separately and set aside. Cook Eggs: Scramble the eggs in a hot pan with a little oil, then set them aside. Stir-fry Veggies: Sauté garlic, onions, and vegetables in oil until tender. Add Rice: Add the cold rice and stir-fry it with the veggies. Season: Add soy sauce, oyster sauce (optional), and other seasonings. Stir until evenly coated. Add Protein and Eggs: Mix in the cooked protein and scrambled eggs. Finish: Garnish with chopped green onions and serve hot.",
      image:
      'https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg',
      creator: 'Christopher',
      votes: '10',
    },
    {
      title: 'Greek salad',
      ingredients: 
      '2 to 3 medium tomatoes, 1 large cucumber, ½ medium thinly sliced red onions, 1 medium green bell pepper, ½ cup kalamata olives, 1 block of feta cheese, 3-4 tablespoons of extra virgin olive oil, 1 teaspoon of dried oregano, 1-2 tablespoons of red wine vinegar, salt and pepper.',
      instructions:
      'Prep the Vegetables: Chop the tomatoes, cucumbers, and bell pepper, and slice the onions thinly. Assemble the Salad: In a large bowl, combine the chopped vegetables, olives, and feta cheese. Dress the Salad: Drizzle olive oil, red wine vinegar (or lemon juice), and sprinkle dried oregano, salt, and pepper over the salad. Toss Lightly: Gently toss the salad to mix the ingredients without breaking up the feta too much.',
      images: 'https://www.tamingtwins.com/wp-content/uploads/2024/07/greek-salad-9.jpg',
      creator: 'Sofia',
    }
    ]);

  console.log('recipes seeded');

  const comments = await Comment.insertMany([
    {
      name: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 2.99,
      quantity: 500
    },
    {
      name: 'Canned Coffee',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'canned-coffee.jpg',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Toilet Paper',
      category: categories[1]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'toilet-paper.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Handmade Soap',
      category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'soap.jpg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Set of Wooden Spoons',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'wooden-spoons.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Camera',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'camera.jpg',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Tablet',
      category: categories[2]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'tablet.jpg',
      price: 199.99,
      quantity: 30
    },
    {
      name: 'Tales at Bedtime',
      category: categories[3]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'bedtime-book.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Spinning Top',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'spinning-top.jpg',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Set of Plastic Horses',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'plastic-horses.jpg',
      price: 2.99,
      quantity: 1000
    },
    {
      name: 'Teddy Bear',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'teddy-bear.jpg',
      price: 7.99,
      quantity: 100
    },
    {
      name: 'Alphabet Blocks',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'alphabet-blocks.jpg',
      price: 9.99,
      quantity: 600
    }
  ]);

  console.log('comments seeded');

  await User.create({
    firstName: 'Sofiya',
    lastName: 'Kaminskaya',
    email: 'sofia@gmail.com',
    password: 'lolkek',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Christopher',
    lastName: 'Chhim',
    email: 'christopher.chhim123@gmail.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Briana',
    lastName: 'Gil',
    email: 'brianagil@gmail.com',
    password: 'brianagil'
  });

  console.log('users seeded');

  process.exit();
});
