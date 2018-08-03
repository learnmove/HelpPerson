<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/
$faker=\Faker\Factory::create('zh_TW');
$factory->define(App\User::class, function ()use ($faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'avatar'=>$faker->imageUrl($width=50,$height=50),
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});
$factory->define(App\Job::class,function()use ($faker){
	return [
		'title'=>$faker->sentence,
		'money'=>mt_rand(500,1000),
		'position'=>$faker->company, 
		'time'=>['星期一','星期日','星期五'][mt_rand(0,2)].['上午','下午'][mt_rand(0,1)].mt_rand(1,21).'點',
		'content'=>$faker->paragraph,
		'city'=>['高雄市','台北市','花蓮市'][mt_rand(0,2)],
		'contact'=>'電話:5523133',
		'user_id'=>mt_rand(1,uq),
		'user_name'=>$faker->name,
		'user_avatar'=>$faker->imageUrl($width=50,$height=50)

	];
});
$factory->define(App\Message::class,function()use ($faker){
	return [
		'sender_name'=>$faker->name,
		'sender_id'=>mt_rand(1,uq),
		'receive_id'=>mt_rand(1,uq),
		'content'=>$faker->paragraph,
          'sender_avatar'=>'https://cdn.buzzbooklet.com/content/24e2070c98f4693b0da054064e9d494e.jpg',
		'receive_name'=>$faker->name,
		'receive_avatar'=>$faker->imageUrl($width=50,$height=50),


	];
});

// {
// 	title:'基隆市',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'台北市',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'新北市',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'宜蘭縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'桃園市',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'新竹市',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'新竹縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'苗栗縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'台中市',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'彰化縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'南投縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'雲林縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'嘉義市',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'嘉義縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'台南市',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'高雄市',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'屏東縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'花蓮縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


// {
// 	title:'台東縣',
// img:'https://www.taipei-101.com.tw/upload/jn_now/201701/2017010104024839445051.jpg',
// author:'json'},


//  '澎湖' ,

//  '金門' ,

//  '馬祖',
//   ]