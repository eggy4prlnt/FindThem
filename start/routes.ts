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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'WebsController.index').middleware('auth');

Route.get('/buat-link', 'WebsController.createLink').middleware('auth');
Route.post('/buat-link', 'WebsController.createLinkPost').middleware('auth');
Route.get('/link/delete/:id', 'WebsController.deleteLink').middleware('auth');
Route.get('/link/edit/:id', 'WebsController.editLink').middleware('auth');
Route.post('/link/edit/:id', 'WebsController.editLinkPost').middleware('auth');
Route.get('/link/korban/:id', 'WebsController.korban').middleware('auth');
Route.get('/link/:kode', 'WebsController.redirect');
Route.post('/link/:kode', 'WebsController.redirectPost');

Route.get('/pengguna', 'PenggunasController.index').middleware(['auth', 'is_admin']);
Route.get('/pengguna/buat', 'PenggunasController.create').middleware(['auth', 'is_admin']);
Route.post('/pengguna/buat', 'PenggunasController.createUser').middleware(['auth', 'is_admin']);
Route.get('/pengguna/edit/:id', 'PenggunasController.edit').middleware(['auth', 'is_admin']);
Route.post('/pengguna/edit/:id', 'PenggunasController.editUser').middleware(['auth', 'is_admin']);
Route.get('/pengguna/delete/:id', 'PenggunasController.delete').middleware(['auth', 'is_admin']);

Route.get('/login', 'AuthController.login').middleware('guest');
Route.post('/login', 'AuthController.loginPost').middleware('guest');
Route.get('/logout', 'AuthController.logout').middleware('auth');
