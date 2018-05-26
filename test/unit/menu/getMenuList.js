var expect = require('chai').expect;
var getMenuListMW = require('../../../middlewares/menu/getMenuList');

describe('Testing getMenuList middleware ', function() {
  it('... should return the list of menus', function(done) {
    var req = {};
    var res = {
      tpl: {}
    };
    var mockPizzaModel = {
      find: function(some, cb) {
        return { name: 'pizza1', description: 'mockpizza', price: 11 };
      }
    };

    getMenuListMW({
      pizzaModel: mockPizzaModel
    })(req, res, function(err) {
      expect(res.tpl.pizzas).to.eql({
        name: 'pizza1',
        description: 'mockpizza',
        price: 11
      });
      expect(err).to.eql(undefined);
      done();
    });
  });
});
