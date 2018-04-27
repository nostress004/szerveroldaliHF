const renderMW = require('../middlewares/generic/render');

// mock data
const data = require('../mockData/data');

module.exports = function(app) {
  // /**
  //  * Add new menu
  //  */

  // app.use('/menu/:menuid/new');

  // /**
  //  * View menu
  //  */

  // app.use('/menu/:menuid/view');

  // /**
  //  * Edit the menu details
  //  */

  // app.use('/menu/:menuid/edit');

  // /**
  //  * Order  menu item
  //  */

  // app.use('/menu/:menuid/order');

  // /**
  //  * Delete menuitem
  //  * - then redirect to /employees
  //  */

  // app.use('/menu/:menuid/delete');

  // /**
  //  * List all menu
  //  */

  app.get(
    '/menu',
    (req, res, next) => {
      res.tpl.pizzas = data.pizzas;
      next();
    },
    renderMW({}, 'menulist')
  );
};
