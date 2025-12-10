<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SearchQuery extends Model
{
    protected $fillable = [
        'resource',
        'query',
        'response_time_ms',
        'results_count'
    ];
}
