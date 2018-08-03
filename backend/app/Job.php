<?php

namespace App;
use App\Scopes\JobScope;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    //
    protected $table='jobs';
    protected $guarded=['id'];
    protected static function boot(){
    	parent::boot();
    	static::addGlobalScope(new JobScope);
    }
    public function user(){
    	return $this->belongsTo('App\User','user_id','id')->select(['id','avatar','name']);
    }
    public function applies(){
    	return $this->hasMany('App\Apply','job_id');
    }
}
