<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserDetail;
use JWTAuth;
class UserDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
        public function __construct(){
        $this->middleware([ 
'throttle:15,1','jwt.auth'])->only('store','update','edit');
    }
    public function index(Reuqest $requeset)
    {
        
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user=JWTAuth::parseToken()->authenticate();
        $userDetail=UserDetail::updateOrCreate([
            'user_id'=>$user->id],
            $request->all()
            );
            //       $request->except(['content','experience','profession'])+
            //     [
            //     'content'=>nl2br($request->content),
            //     'experience'=>nl2br($request->experience),
            //     'profession'=>nl2br($request->profession),
            //     ]
            // );
        if(!$userDetail){
            return response()->json(['error'=>'此人沒有資料']);
        }
        return response()->json(['message'=>'修改成功'],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $user=UserDetail::where('user_id',$id)->first();
        if(!$user){
            return response()->json(['error'=>'此用戶資料不存在或未填寫'],404);
        }
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
