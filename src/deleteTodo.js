const AWS = require("aws-sdk");

const deleteTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let result;
  try {
    result = await dynamoDB
      .delete({
        TableName: "TodoTable",
        Key: { id },
        ReturnValues: "ALL_OLD",
      })
      .promise();
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Todo Succesfully Deleted!", result: result.Attributes }),
  };
};

module.exports = {
  handler: deleteTodo,
};
