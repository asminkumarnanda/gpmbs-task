<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
    function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required',
            'username' => 'required|unique:users,username',
            'password' => 'required',
            'dob' => 'required',
        ]);
        if ($validator->fails()) {
            $error = $validator->errors();
            return $this->sendError($error, [], 200);
        }
        try {
            $newUser = new User();
            $newUser->fullname = $request['fullname'];
            $newUser->username = $request['username'];
            $newUser->password = Hash::make($request['password']);
            $newUser->dob = date('Y-m-d', strtotime($request['dob']));
            $newUser->profession = $request['profession'];
            $newUser->address = $request['address'];
            $result = $newUser->save();
            $message = 'User created successfully';
            return $this->sendResponse($result, $message);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 200);
        }
    }

    function login(Request $request)
    {
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            $user = Auth::user();
            $message= 'User Login SuccessFul';
            $result['token'] = $user->createToken('MyReactApp')->plainTextToken;
            $result['userDetails'] = $user;
            return $this->sendResponse($result,$message);
        } else {
            $error = 'Incorrect Username or Password';
            return $this->sendError($error, [], 401);
        }
    }
    public function UserDetailsGet($id)
    {
        $user = User::where('id', $id)->first();
        return $user;
    }
 

    function usersList(Request $request)
    {
        $users = User::latest()->get();
        $message = "Users List Fetched Successfully";
        return $this->sendResponse($users, $message);
    }
 
}
