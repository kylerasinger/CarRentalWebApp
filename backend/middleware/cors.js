const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // Whitelist localhost:3000
  optionsSuccessStatus: 200 // For legacy browser support
};

// Export configured CORS middleware
module.exports = cors(corsOptions);
