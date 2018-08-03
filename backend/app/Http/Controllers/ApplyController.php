<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use DB;
use App\Apply;
use App\Message;
use App\Job;
class ApplyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	 public function __construct(){
	        $this->middleware([ 
	'throttle:15,1','jwt.auth'])->only('store','update','edit','index');
	    }
    public function index(Request $request)
    {
    	$user=JWTAuth::parseToken()->authenticate();

    	$applies=Apply::selectRaw('if(success=1,"成功","待審")as success,job_title,job_id,money,created_at')
    	->when($request->type,function($q) use ($user,$request){
    		if($request->type=='boss'){
    			$q->where('boss_id',$user->id);
    			$q->addSelect('sender_id');
    		}else{
    			$q->where('sender_id',$user->id);
    			$q->addSelect('boss_id');
    		}

    	},function($q)use($user){
    			$q->where('sender_id',$user->id);
    			$q->addSelect('boss_id');
    	})
    	->latest()
    	->paginate(1);
    	if(count($applies)==0){
    		return response()->json(['error'=>'您沒有任何應徵過/應徵者的消息'],404);
    	}
    	return response()->json($applies);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
   

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    	$user=JWTAuth::parseToken()->authenticate();
    	$job=Job::find($request->job_id);
		if($job==null)return response()->json(['error'=>"沒有這份工作"]);
    	$apply=Apply::where('sender_id',$user->id)
    	->where('job_id',$job->id)->first();
    	if($apply!=null){
			return response()->json(['error'=>"您已投過了"],403);
    	}
    	$apply=Apply::create([
    		'sender_id'=>$user->id,
    		'boss_id'=>$job->user_id,
    		'job_title'=>$job->title,
    		'money'=>$job->money,
    		'job_id'=>$job->id
    		]);
        Message::create([
            'sender_id'=>$user->id,
            'receive_id'=>$job->user_id,
            'sender_name'=>$user->name,
            'receive_name'=>$job->user_name,
            'receive_avatar'=>$job->user_avatar,
            'content'=>$request->content

            ]);
		return response()->json(['message'=>"投遞成功"]);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
 

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    	$user=JWTAuth::parseToken()->authenticate();
    	$apply=Apply::where('boss_id',$user->id)
    	->where('id',$id)
    	->first();

        if(!$apply)return response()->json(['error'=>'找不到資料'],404);
        if($apply->success==1)return response()->json(['error'=>'重複確認'],404); 
            $apply->update(['success'=>1]);
             Message::firstOrCreate([
            'sender_id'=>$user->id,
            'sender_name'=>$user->name,
            'receive_id'=>$apply->sender_id,
            'content'=>'您應徵的'.$apply->job_title.'已錄取']);
          return response()->json(['message'=>'核准成功']);



    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
