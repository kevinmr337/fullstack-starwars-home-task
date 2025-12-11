<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\SearchStatsController;

Route::get('/search', SearchController::class);
Route::get('/search/stats', SearchStatsController::class);