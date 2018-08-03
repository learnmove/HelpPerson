<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::post("/auth/{provider}","OAuthController@redirectToProvider");
Route::post("/auth","OAuthController@login");
Route::resource('/apply','ApplyController');
Route::resource('/job','JobController');
Route::resource('/user','UserDetailController');
Route::resource('/rate','RateController');
Route::resource('/message','MessageController');
Route::get('/illegal/{job_id}','IllegalController@report');



