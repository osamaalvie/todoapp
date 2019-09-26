<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', 'HomeController@index')->name('home');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


Route::get('all', 'TodoController@getAllTodos')->name('all');
Route::post('store', 'TodoController@store')->name('store');
Route::put('save', 'TodoController@update')->name('save');
Route::delete('delete', 'TodoController@destroy')->name('delete');




