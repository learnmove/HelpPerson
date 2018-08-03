<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],
    'facebook'=>[
        'client_id'=>'915436405328473',
        'client_secret'=>'0adc2b0d9e02911d1d97a25cb6a34f0d',
           'redirect'=>'http://localhost/laravel/recruit/public/api/auth/facebook/callback'
    ],
  'google'=>[
        'client_id'=>'665995769881-2hit6olu0u336b28jvn966v121kplvuj.apps.googleusercontent.com',
        'client_secret'=>'jZF-ZrXQpTV24qZKAqibYk9O',
        'redirect'=>'http://localhost/laravel/recruit/public/api/auth/google/callback'
    ],
];
