<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  	protected $fillable=[   
  			'sender_id',
           'receive_id',
          'sender_name',
          'sender_avatar',
          'content',
          'receive_name',
			'receive_avatar'
          ];



}
