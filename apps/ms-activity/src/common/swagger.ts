import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import config from 'config';
const packageJson = require('../../package.json');

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    info: {
      title: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    },
    host: `${config.get('host')}:${config.get('port')}`,
  },
  apis: ['./doc/definitions.yaml'],
};
const openapiSpecification = swaggerJsdoc(options);
const swaggerMiddleware = [
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification),
];

export default swaggerMiddleware;
