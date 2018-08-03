<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Job;
use JWTAuth;
use Auth;
use DB;
use Cache;
use App\Http\Resources\JobsResource;
class JobController extends Controller
{
    public function __construct(){
        $this->middleware([ 
'throttle:15,1','jwt.auth'])->only('store','update','edit');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       $jobs= Cache::remember('job_index',0,function() use ($request){
            $jobs=Job::
            select(DB::raw('if(status=1,concat("[已結束]",title),title) as title,created_at,position,money,time,city,contact,id,user_id,user_name,user_avatar'))
            ->when($request->city,function($q) use ($request){
                return $q->where('city',$request->city);
            })
            ->withCount('applies')

            ;
        if($request->money){
        $jobs->orderBy('money',$request->money);
        }
        // $jobs=$jobs->latest()->paginate(5);
        $jobs=$jobs->latest()->paginate(5);
        
        return $jobs;
    });
        if(count($jobs)==0){
            return response()->json(['error'=>'沒有任何資料'],404);
        }

        // return response()->json($jobs);
        return $jobs;
        // return response()->json(Job::paginate(5));

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

        Job::create($request->all()+['user_id'=>$user->id,'user_avatar'=>$user->avatar,'user_name'=>$user->name]);



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
    public function show(Request $request, $id)
    {
        $job=Job::selectRaw('content')
        ->where('id',$id)
        ->first();
        // 
        if($job==null){
        return response()->json(['message'=>'找不到這份工作'],404);
        }
        // 當完封不動會有return 0的情形
        return response()->json(['data'=>$job]);
    }
    public function edit(Request $request, $id)
    {
        $user=JWTAuth::parseToken()->authenticate();
        $job=Job::selectRaw('title,position,content,money,time,city,contact')->where('user_id',$user->id)->where('id',$id)->first();
        // 
        if($job==null){
        return response()->json(['message'=>'找不到這份工作']);
        }
        // 當完封不動會有return 0的情形
        return response()->json(['data'=>$job]);
    }
    public function update(Request $request, $id)
    {
        $user=JWTAuth::parseToken()->authenticate();
        $job=Job::where('user_id',$user->id)->where('id',$id)->where('status',0)->update($request->except('user_id'));
        // 

        $job=$job?'已完成修改':'查不到工作';
        // 當完封不動會有return 0的情形
        return response()->json(['message'=>$job]);
    }
    public function finish(){
        $user=JWTAuth::parseToken()->authenticate();
        $job=Job::where('user_id',$user->id)->where('id',$id)->update(['status'=>3]);  
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
