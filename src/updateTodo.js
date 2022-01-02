const AWS = require("aws-sdk");

const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const updateTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { todo, completed } = event.body;

  let result;
  try {
    result = await dynamoDB
      .update({
        TableName: "TodoTable",
        Key: { id },
        UpdateExpression: "SET todo=:todo, completed =:completed",
        ExpressionAttributeValues: {
          ":todo": todo,
          ":completed": completed,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    // console.log("Result: ", result);
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Todo Succesfully Updated!", result: result.Attributes }),
  };
};

module.exports = {
  handler: middy(updateTodo).use(httpJsonBodyParser()),
};
