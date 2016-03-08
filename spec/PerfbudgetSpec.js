var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var PerfBudget = require('../src/PerfBudget');

describe('PerfBudget', function() {
  describe('.run', function() {
    context('when all files in the target folder are below the limit', function() {
      var target = path.join(__dirname, 'fixtures', 'underlimit')
      var limit = 1500000

      it('returns an empty array', function() {
        var errors = PerfBudget.run({
          target: target,
          limit: limit
        });

        expect(errors).to.be.empty;
      });
    });

    context('when a file in the target folder exceeds the limit', function() {
      var target = path.join(__dirname, 'fixtures', 'overlimit')
      var limit = 1500000

      it('returns an array of errors', function() {
        var errors = PerfBudget.run({
          target: target,
          limit: limit
        });

        expect(errors).not.to.be.empty;
      });

      it('returns information about the files which are over the limit', function() {
        var errors = PerfBudget.run({
          target: target,
          limit: limit
        });

        expect(errors).to.deep.equal([{
          filename: 'overlimit.js',
          filesize: fs.statSync(path.join(target, 'overlimit.js')).size
        }])
      })
    });
  });
});
