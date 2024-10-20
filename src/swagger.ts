import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

const doc = {
  info: {
    title: 'My API',
    description: 'API documentation for my project',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'cookie', // can be 'header', 'query' or 'cookie'
      name: 'token', // name of the header, query parameter or cookie
      description: 'Set token here...'
    }
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
require('./index');
