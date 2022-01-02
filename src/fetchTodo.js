const AWS = require("aws-sdk");

const fetchTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let result;

  try {
    result = await dynamoDB.get({ TableName: "TodoTable", Key: { id } }).promise();
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

module.exports = {
  handler: fetchTodo,
};
