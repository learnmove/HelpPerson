<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Illegal extends Model
{
    //
    public $timestamps=false;
    protected $fillable=['user_id','job_id'];

}
