const { exec } = require('child_process')
const toArgs = require('object-to-spawn-args')

module.exports = class AwsCli {
  constructor(options) {
    const { debug, suffixDebug, prefixDebug } = options || {}

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

  command(functionName, params) {
    if (typeof params === 'object') {
      params = toArgs(params).join(' ')
      functionName = `${functionName} ${params}`
    }

    functionName = 'aws ' + this.resource + functionName

    if (this.debug) {
      console.log(this.prefixDebug, functionName, this.suffixDebug)
    }

    return new Promise((resolve, reject) => {
      exec(functionName, (err, stdout, stderr) => {
        if (err) {
          return reject(err)
        }

        resolve(JSON.parse(stdout) || stderr)
      })
    })
  }
}
