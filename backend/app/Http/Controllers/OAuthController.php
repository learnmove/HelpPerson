<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use App\User;
use App\UserDetail;
use JWTAuth;
class OAuthController extends Controller
{
    //
    public function redirectToProvider($provider){
    	return Socialite::driver($provider)->stateless()->redirect();
    }
    public function login(Request $request){
			$user=User::where('oauth_id',$request->userID)
			->where('email',$request->email)
			->first();
			if($user){
				return response()->json(['user'=>$user,'token'=>JWTAuth::fromUser($user)]);
			}else{
				$userModel=new User();
			$userModel->email=$request->email;
			$userModel->name=$request->name;
			$userModel->avatar=$request->url;
			$userModel->oauth_id=$request->userID;
			$userModel->save();
			UserDetail::create([
				'user_id'=>$userModel->id,
				'name'=>$userModel->name,
				'avatar'=>$userModel->avatar,
				'content'=>'暫無資料',
				'age'=>$request->birthday
				]);
			return response()->json(['user'=>$userModel,'token'=>JWTAuth::fromUser($userModel)]);

			}

    }
}
