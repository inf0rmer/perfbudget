var fs = require('fs')
var path = require('path')

PerfBudget = {
  run: function(config) {
    var filenames = fs.readdirSync(config.target)
                      .map(function(filename) {
                        return path.join(config.target, filename)
                      })

    var filesizes = filenames
                      .filter(function(filename) {
                        return !fs.statSync(filename).isDirectory()
                      })
                      .map(function(filename) {
                        return [filename, fs.statSync(filename).size]
                      })

    var errors = filesizes
                  .filter(function(fileinfo) {
                    var filesize = fileinfo[1]

                    return filesize > config.limit
                  })
                  .map(function(fileinfo) {
                    var filename = fileinfo[0]
                    var filesize = fileinfo[1]

                    return {
                      filename: path.basename(filename),
                      filesize: filesize
                    }
                  })

    return errors
  }
}

module.exports = PerfBudget
