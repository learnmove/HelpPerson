<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    //
    protected $fillable=[
'user_id',
'content',
'profession',
'experience',
'name',
'school',
'age',
'avatar'
    ];


    
}
