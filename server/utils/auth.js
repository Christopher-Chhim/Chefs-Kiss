const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: async ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    const operationName = req.body.operationName;
    
    // Skip authentication for signup or login operations
    if (operationName === 'addUser' || operationName === 'login') {
      return { user: null }; // Return an empty user object for these operations
    }

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('No token provided');
      return { user: null }; // Ensure it returns a consistent context object
    }

    const decoded = jwt.decode(token);

    try {
      // Use synchronous verify to get the user directly
      const user = jwt.verify(token, secret);
      return { user }; // Return the user data
    } catch (err) {
      console.error('Invalid token:', err);
      throw new AuthenticationError('Invalid token');
    }
  },

  signToken({ firstName, email, _id }) {
    const payload = { firstName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
