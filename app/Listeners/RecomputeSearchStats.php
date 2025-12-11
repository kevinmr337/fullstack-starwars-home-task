<?php

namespace App\Listeners;

use App\Events\SearchStatsRecomputeRequested;
use App\Services\SearchStatsService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class RecomputeSearchStats
{

    use InteractsWithQueue;

    /**
     * Create the event listener.
     */
    public function __construct(
        private SearchStatsService $statsService
    )
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SearchStatsRecomputeRequested $event): void
    {
        $this->statsService->refreshCachedStats();
    }
}
