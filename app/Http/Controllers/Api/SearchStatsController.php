<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SearchStatsService;
use Illuminate\Http\JsonResponse;

class SearchStatsController extends Controller
{
    public function __construct(
        private SearchStatsService $statsService,
    ) {}

    public function __invoke(): JsonResponse
    {
        $stats = $this->statsService->getCurrentStats();

        return response()->json($stats);
    }
}