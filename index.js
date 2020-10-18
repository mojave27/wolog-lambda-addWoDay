// const randomBytes = require('crypto').randomBytes
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context, callback) => {
  // if (!event.requestContext.authorizer) {
  //   errorResponse(
  //     'Authorization not configured',
  //     context.awsRequestId,
  //     callback
  //   )
  //   return
  // }

  let woday = validateId(event.body)

  let params = { 
    TableName: 'wodays',
    Item: woday
  }

  let data 
  try {
    data = await docClient.put(params).promise()
    console.log('status: 200')
  } catch (error) {
    console.log('Status code : 400, Error code : ', error.stack)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}

const validateId = woday => {
  if (woday.id === undefined){
    woday.id = uuidv4()
  }
  return woday
}
