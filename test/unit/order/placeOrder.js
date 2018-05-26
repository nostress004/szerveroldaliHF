var expect = require('chai').expect;
var placeOrderMW = require('../../../middlewares/orders/placeOrder');

describe('Testing placeOrder middleware ', function() {
  it('... should contain cart as an empty array', function(done) {
    var req = {};
    var res = {
      tpl: {
        user: {
          _id: '0123123',
          name: 'csaba',
          email: 'jajjajaja@sadfasd.com',
          address: 'budaaaapest?',
          phone: '5555',
          cart: [{ name: 'pizza1', price: 555 }],
          isAdmin: true
        }
      }
    };
    const mockPizzaModel = {
      find: function(some, cb) {
        return { name: 'pizza1', description: 'mockpizza', price: 11 };
      }
    };

    const mockOrderModel = {
      findOneAndUpdate: function() {
        return { customerName: 'asdasd' };
      }
    };

    const mockUserModel = {
      findOneAndUpdate: function() {
        return {
          _id: '0123123',
          name: 'csaba',
          email: 'jajjajaja@sadfasd.com',
          address: 'budaaaapest?',
          phone: '5555',
          cart: [],
          isAdmin: true
        };
      }
    };

    placeOrderMW({
      pizzaModel: mockPizzaModel,
      orderModel: mockOrderModel,
      userModel: mockUserModel
    })(req, res, function(err) {
      expect(res.tpl.user.cart).to.eql([]);
      expect(err).to.eql(undefined);
      done();
    });
  });
});
