<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
	protected $fillable=[
                'sender_id',
                'sender_avatar',
                'sender_name',
                'star',
                'job_title',
                'content',
                'receiver_id',
                'boss',
                'apply_id'
                ];
}
