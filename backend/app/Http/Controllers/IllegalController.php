<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Illegal;
use JWTAuth;
use DB;
USE Cache;
use App\Job;
use App\Message;
class IllegalController extends Controller
{
    //
	 public function __construct(){
	        $this->middleware([ 
	'throttle:15,1','jwt.auth']);
	    }
    public function report($job_id){
    	$user=JWTAuth::parseToken()->authenticate();

		$job=Job::where('id',$job_id)->first();
		if(!$job)return response()->json(['error'=>'沒有此工作'],404);
		$illegal=Illegal::firstOrCreate(['user_id'=>$user->id,'job_id'=>$job_id]);

		$JobIllegalCount=Cache::remember('job_count'.$job_id,0,function()use($job_id){

			return Illegal::where('job_id',$job_id)->count();
		});
		// 有用cache應該不會有重複發信檢舉的行為吧
		if($JobIllegalCount>0){

			$job->update(['delete'=>1]);

			Message::create([
				'sender_id'=>'0',
				'sender_name'=>"管理員",
				'sender_avatar'=>"http://lorempixel.com/50/50/",
				'content'=>'你張貼的'.$job->title.'已被違反規定',
				'receive_id'=>$job->user_id,
				'receive_name'=>$job->user->name,
				'receive_avatar'=>$job->user->avatar,
				]);

		}

		return response()->json(['message'=>"檢舉成功"]);

    }
}
