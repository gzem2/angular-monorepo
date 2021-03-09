<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api/v1'], function () use ($router) {
    $router->get('/articles', 'ArticleController@index');
    $router->get('/articles/page', 'ArticleController@page');
    $router->post('/article', 'ArticleController@create');
    $router->get('/article/{id}', 'ArticleController@show');
    $router->put('/article/{id}', 'ArticleController@update');
    $router->delete('/article/{id}', 'ArticleController@destroy');
});
