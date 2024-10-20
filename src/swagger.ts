import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './src/routes/userRoute.ts',
  './src/routes/departmentRoute.ts',
  './src/routes/shiftConfigurationRoute.ts',
  // './src/routes/workCycleConfigurationRoute.ts',
  // './src/routes/availabilityRoute.ts',
  // './src/routes/shiftRoute.ts',
  // './src/routes/workCycleRoute.ts',
];

export const extractTags = (filePath: string) => {
  const baseName = filePath.split('/').pop()?.replace('.ts', '');
  if (baseName) {
    return [baseName.charAt(0).toUpperCase() + baseName.slice(1) + 's'];
  }
  return [];
};

// Create a set to store unique tags
const tagsSet = new Set<string>();

// Loop through endpoint files to populate tags
endpointsFiles.forEach(filePath => {
  const tags = extractTags(filePath);
  tags.forEach(tag => tagsSet.add(tag)); // Add tags to the set
});

// Convert the set to an array for Swagger documentation
const tagsArray = Array.from(tagsSet).map(tag => ({ name: tag, description: `${tag} management` }));


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
  tags: tagsArray,

};

swaggerAutogen(outputFile, endpointsFiles, doc);
require('./index');
