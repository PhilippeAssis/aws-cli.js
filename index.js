const awsCli = require('aws-cli-js')
const toArgs = require('object-to-spawn-args')
const Aws = awsCli.Aws

awsCli.Aws = class ChildClass extends Aws {
  constructor(options) {
    const { debug, prefixDebug } = options || {}

    super(options)

    this.debug = debug
    this.prefixDebug = prefixDebug || 'aws-cli:'
  }

  command(functionName, resouceName, params, callback) {
    if (typeof params === 'object') {
      params = toArgs(params).join(' ')
      functionName = `${functionName} ${params}`
    } else {
      callback = params
    }

    if (this.debug) {
      console.log(this.prefixDebug, functionName)
    }

    super.command(functionName, callback)
  }
}


module.exports = awsCli
