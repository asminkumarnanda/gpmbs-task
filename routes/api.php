<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\AuthenticationException;
use PHPUnit\Framework\MockObject\Generator\ClassIsFinalException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::get('exception', function () {
    return response()->json(['message'=>'Unauthorized Access'],401);
})->name('exception');

//public routes
Route::controller(AuthController::class)->group(function(){
    Route::post('login','login');
});
Route::post('test-api',[AuthController::class,'testApi']);
Route::post('register',[AuthController::class,'register']);
//private routes
Route::controller(AuthController::class)->middleware('auth:sanctum')->group( function () {
    Route::get('user-details/{id}','UserDetailsGet');
    Route::post('insert-user-details/{id}','insertUserDetails');
    Route::get('users-list','usersList');
});
