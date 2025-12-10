<?php

namespace Tests\Feature;

use App\Models\SearchQuery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class SearchApiTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_requires_resource_and_query_parameters(): void
    {
        $response = $this->getJson('/api/search');

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['resource', 'query']);
    }

    #[Test]
    public function it_rejects_invalid_resource_values(): void
    {
        $response = $this->getJson('/api/search?resource=planets&query=luke');

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['resource']);
    }

    #[Test]
    public function it_searches_people_and_logs_the_query(): void
    {
        Http::fake([
            'https://swapi.dev/api/people*' => Http::response([
                'results' => [
                    ['name' => 'Luke Skywalker'],
                ],
            ], 200),
        ]);

        config(['services.swapi.base_url' => 'https://swapi.dev/api']);

        $response = $this->getJson('/api/search?resource=people&query=luke');

        $response->assertOk();
        $response->assertJsonFragment([
            'resource' => 'people',
            'query' => 'luke',
        ]);
        $response->assertJsonCount(1, 'results');

        $this->assertDatabaseHas('search_queries', [
            'resource' => 'people',
            'query' => 'luke',
            'results_count' => 1,
        ]);

        Http::assertSentCount(1);
    }

    #[Test]
    public function it_searches_movies_and_logs_the_query(): void
    {
        Http::fake([
            'https://swapi.dev/api/films*' => Http::response([
                'results' => [
                    ['title' => 'A New Hope'],
                ],
            ], 200),
        ]);

        config(['services.swapi.base_url' => 'https://swapi.dev/api']);

        $response = $this->getJson('/api/search?resource=films&query=hope');

        $response->assertOk();
        $response->assertJsonFragment([
            'resource' => 'films',
            'query' => 'hope',
        ]);
        $response->assertJsonCount(1, 'results');

        $this->assertDatabaseHas('search_queries', [
            'resource' => 'films',
            'query' => 'hope',
            'results_count' => 1,
        ]);

        Http::assertSentCount(1);
    }
}