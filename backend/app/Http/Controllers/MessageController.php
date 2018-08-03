<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use JWTAuth;
class MessageController extends Controller
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
        // qeury type=sender
    public function index(Request $request)
    {
        $user=JWTAuth::parseToken()->authenticate();
        if(!$user)return response()->json(['error'=>'你沒資格存取'],403);
        if($request->type=='sender'){
                $select='sender_id';
            }else{
                $select='receive_id';
         }
        $messages=Message::where($select,$user->id)
        ->latest()
        ->paginate(10);
        
        if(count($messages)==0){
            return response()->json(['error'=>'沒有任何消息'],404);
        }
         return response()->json($messages);
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
        $receiver=User::find($request->receive_id);
        if(!$receiver)return response()->json(['error'=>'找不到此人'],404);

            Message::create([
                'sender_id'=>$user->id,
                'sender_name'=>$user->name,
                'sender_avatar'=>$user->avatar,
                'content'=>$request->content,
                'receive_id'=>$receiver->receive_id,
                'receive_name'=>$receiver->name,
                'receive_avatar'=>$receiver->avatar,
                ]);
        return response()->json(['message'=>'寄送成功']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
