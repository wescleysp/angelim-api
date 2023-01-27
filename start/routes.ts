/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'API-Angelim Online' }
})

Route.post('login', 'AuthController.store')
Route.resource('user', 'UsersController').apiOnly()
Route.resource('productionprints', 'ProductionPrintsController').apiOnly()
Route.resource('personprints', 'PersonPrintsController').apiOnly()

Route.group(() => {
  Route.resource('people', 'PeopleController').apiOnly()
  Route.resource('products', 'ProductsController').apiOnly()
  Route.resource('types', 'TypesController').apiOnly()
  Route.resource('providers', 'ProvidersController').apiOnly()
  Route.get('providers-bytype/:id', 'ProvidersController.getProvidersByType')
  Route.resource('customers', 'CustomersController').apiOnly()
  Route.resource('sellers', 'SellersController').apiOnly()
  Route.resource('order', 'OrdersController').apiOnly()
  Route.resource('orderitems', 'OrderItemsController').apiOnly()
  Route.resource('ordernfs', 'OrderNfsController').apiOnly()
  Route.resource('transports', 'TransportsController').apiOnly()
  Route.resource('duties', 'DutiesController').apiOnly()
  Route.resource('expenses', 'ExpensesController').apiOnly()
  Route.resource('cashflows', 'CashFlowsController').apiOnly()
  Route.resource('stocks', 'StocksController').apiOnly()
  Route.resource('users', 'UsersController').apiOnly()
  Route.resource('dashcashes', 'DashCashesController').apiOnly()
  Route.resource('dashstocks', 'DashStocksController').apiOnly()
  Route.resource('providertypes', 'ProviderTypesController').apiOnly()
  Route.resource('productionorders', 'ProductionOrdersController').apiOnly()
  Route.resource('farmprojects', 'FarmProjectsController').apiOnly()
  Route.resource('nfes', 'NfesController').apiOnly()
  Route.resource('reforest', 'ReforestController').apiOnly()
  Route.resource('accounts', 'AccountsController').apiOnly()
  Route.resource('clearing-accounts', 'ClearingAccountsController').apiOnly()
}).middleware('auth')
