const squareConfig = {
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT, // 'sandbox' para testes, 'production' para ambiente real
  locationId: process.env.SQUARE_LOCATION_ID, // ID do local de negócios no Square
};

export default squareConfig;