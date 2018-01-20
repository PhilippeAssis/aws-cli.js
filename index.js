const awsCli = require('aws-cli-js')
const toArgs = require('object-to-spawn-args')
const Aws = awsCli.Aws

awsCli.Aws = class ChildClass extends Aws {
  constructor(options) {
    const { debug, suffixDebug, prefixDebug } = options || {}

    super(options)

    this.debug = debug
    this.prefixDebug = prefixDebug || 'aws-cli:'
    this.suffixDebug = suffixDebug || '...'
    this.resource = ''
  }

  setResource(resource){
    this.resource = resource+' '
  }

  removeResource(){
    this.resource = ''
  }

  command(functionName, params, callback) {
    if (typeof params === 'object') {
      params = toArgs(params).join(' ')
      functionName = `${functionName} ${params}`
    } else {
      callback = params
    }

    if (this.debug) {
      console.log(this.prefixDebug, functionName, this.suffixDebug)
    }

    functionName = this.resource + functionName

    if(callback){
      return super.command(functionName, callback)
    }

    return new Promise((resolve, reject) => {
      super.command(functionName, (err, data) => {
        if (err) {
          return reject(err)
        }

        resolve(data)
      })
    })

  }
}


module.exports = awsCli
