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

Route::get('/', function () {
    return view('welcome');
});
Route::get("/auth/facebook",function(Request $r){
	return Socialite::driver('facebook')->redirect();
});
Route::get("/auth/facebook/callback",function(Request $r){
	$user=Socialite::driver('facebook')->stateless()->user();
	dd($user);
});