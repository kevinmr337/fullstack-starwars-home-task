<?php

namespace Tests\Feature;

use App\Models\SearchQuery;
use App\Services\SearchStatsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class SearchStatsApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_aggregated_stats_based_on_logged_search_queries()
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

        SearchQuery::create([
            'resource' => 'people',
            'query' => 'luke',
            'response_time_ms' => 150,
            'results_count' => 1,
        ]);

        SearchQuery::create([
            'resource' => 'people',
            'query' => 'vader',
            'response_time_ms' => 250,
            'results_count' => 1,
        ]);

        app(SearchStatsService::class)->refreshCachedStats();

        $response = $this->getJson('/api/search/stats');

        $response->assertOk();

        $response->assertJson([
            'summary' => [
                'total_searches' => 4,
                'unique_queries' => 3,
            ],
        ]);

        $json = $response->json();

        $this->assertEquals(4, $json['summary']['total_searches']);
        $this->assertEquals(3, $json['summary']['unique_queries']);

        $this->assertArrayHasKey('people', $json['by_resource']);
        $this->assertArrayHasKey('movies', $json['by_resource']);

        $queries = array_column($json['top_queries'], 'query');
        $this->assertContains('luke', $queries);
        $this->assertContains('hope', $queries);
    }
}