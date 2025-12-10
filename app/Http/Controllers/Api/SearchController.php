<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Models\SearchQuery;
use App\Services\SwapiService;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
  public function __construct(
    private SwapiService $swapi
  ) {}

  public function __invoke(SearchRequest $request): JsonResponse
  {
    $resource = (string) $request->input('resource');
    $query = (string) $request->input('query');

    $response = $this->swapi->search($resource, $query);

    $results = $response['data']['results'] ?? [];
    $resultsCount = is_countable($results) ? count($results) : 0;

    SearchQuery::create([
      'resource' => $resource,
      'query' => $query,
      'response_time_ms' => $response['time_ms'],
      'results_count' => $resultsCount,
    ]);

    return response()->json([
      'resource' => $resource,
      'query' => $query,
      'response_time_ms' => $response['time_ms'],
      'results' => $results,
    ]);
  }
}
