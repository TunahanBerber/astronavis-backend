const swaggerJSDoc = require('swagger-jsdoc');

// Swagger yapılandırması
const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI sürümü
    info: {
      title: 'AstroNavis Backend API', // Başlık
      version: '1.0.0', // Sürüm
      description: 'AstroNavis API Documentation', // Açıklama
    },
  },
  apis: ['./src/routes/*.js'], // API dosyalarının yolu (doğru yolu belirtmelisiniz)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
