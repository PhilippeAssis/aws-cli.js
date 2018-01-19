const awsCli = require('..')
// const awsCli = require('aws-cli-js')

var Options = awsCli.Options;
var Aws = awsCli.Aws;

const aws = new Aws()

aws.command('apigateway get-rest-apis', {'max-items': 10}, (err, data) => {
  console.log(data.object)
})
