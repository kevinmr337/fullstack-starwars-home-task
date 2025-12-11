<?php

namespace Tests\Feature;

use App\Events\SearchStatsRecomputeRequested;
use App\Listeners\RecomputeSearchStats;
use App\Models\SearchQuery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class SearchStatsRecomputeEventTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_is_listening_to_the_recompute_event()
    {
        Event::fake();

        event(new SearchStatsRecomputeRequested());

        Event::assertDispatched(SearchStatsRecomputeRequested::class);
        Event::assertListening(
            SearchStatsRecomputeRequested::class,
            RecomputeSearchStats::class
        );
    }

    /** @test */
    public function it_recomputes_and_caches_stats_when_listener_handles_event()
    {
        Cache::flush();

        SearchQuery::create([
            'resource' => 'people',
            'query' => 'luke',
            'response_time_ms' => 100,
            'results_count' => 1,
        ]);

        SearchQuery::create([
            'resource' => 'movies',
            'query' => 'hope',
            'response_time_ms' => 300,
            'results_count' => 1,
        ]);

        $listener = app(RecomputeSearchStats::class);
        $listener->handle(new SearchStatsRecomputeRequested());

        $stats = Cache::get('search_stats');

        $this->assertNotNull($stats);
        $this->assertEquals(2, $stats['summary']['total_searches']);
        $this->assertEquals(2, $stats['summary']['unique_queries']);
        $this->assertEquals(200, $stats['summary']['avg_response_time_ms']);
        $this->assertEquals(1, $stats['by_resource']['people']['total']);
        $this->assertEquals(1, $stats['by_resource']['movies']['total']);

        $queries = array_column($stats['top_queries'], 'query');
        sort($queries);

        $this->assertEquals(['hope', 'luke'], $queries);
        $this->assertCount(2, $stats['top_queries']);
    }
}