<?php

namespace App\Http\Controllers;
use JWTAuth;
use Illuminate\Http\Request;
use App\Apply;
use App\Rate;

class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	 public function __construct(){
	        $this->middleware([ 
	'throttle:15,1','jwt.auth']);
	    }
        // query string uid
    public function index(Request $request)
    {
        $rates=Rate::selectRaw('sender_name,sender_avatar,star,job_title,content,boss')
        ->where('receiver_id',$request->uid)
        ->when($request->type,function($q){
            if($request->type=='boss'){
            $q->where('boss',1);
        }else if($request->type=='sender'){
            $q->where('boss',0);
        }
        })
        ->paginate(10);
        if(count($rates)<1){
           return response()->json(['error'=>'沒有任何評價'],404);
        }
        return response()->json($rates);
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
        $apply=Apply::find($request->apply_id);
        if(!$apply){
           return response()->json(['error'=>'找不到資料'],404);
        }
        if($apply->success==0){
         return response()->json(['error'=>'尚未逹成共識'],403);   
        }        
        if($apply->boss_id==$user->id){
            $role='boss';
            $receiver_id=$apply->sender_id;
        }else if($apply->sender_id==$user->id){
            $role='sender';
            $receiver_id=$apply->boss_id;
        }
        else{
         return response()->json(['error'=>'你不能評價別人的資料'],404);
        }

        $rate=Rate::where('apply_id',$request->apply_id)
        ->where('sender_id',$user->id)
        ->first();
        if(!$rate){
            Rate::create([
                'sender_id'=>$user->id,
                'sender_avatar'=>$user->avatar,
                'sender_name'=>$user->name,
                'star'=>$request->star,
                'job_title'=>$apply->job_title,
                'content'=>$request->content,
                'receiver_id'=>$receiver_id,
                'boss'=>$role=='boss'?1:0,
                'apply_id'=>$request->apply_id
                ]);  
            return response()->json(['message'=>'評價成功']); 
        }else{
            return response()->json(['error'=>'您已填寫過評價'],403); 
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

}
