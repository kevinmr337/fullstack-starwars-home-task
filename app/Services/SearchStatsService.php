<?php

namespace App\Services;

use App\Models\SearchQuery;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SearchStatsService
{
    private const CACHE_KEY = 'search_stats';

    public function getCurrentStats(): array
    {
        return Cache::get(self::CACHE_KEY) ?? [
            'summary' => [
                'total_searches' => 0,
                'unique_queries' => 0,
                'avg_response_time_ms' => 0,
            ],
            'by_resource' => [],
            'top_queries' => [],
        ];
    }

    public function refreshCachedStats(): array
    {
        $stats = $this->computeStats();

        Cache::put(self::CACHE_KEY, $stats, now()->addMinutes(5));

        return $stats;
    }

    private function computeStats(): array
    {
        $total = SearchQuery::count();

        if ($total === 0) {
            return [
                'summary' => [
                    'total_searches' => 0,
                    'unique_queries' => 0,
                    'avg_response_time_ms' => 0,
                ],
                'by_resource' => [],
                'top_queries' => [],
            ];
        }

        $uniqueQueries = SearchQuery::distinct('query')->count('query');

        $avgResponseTime = (int) round(
            SearchQuery::avg('response_time_ms') ?? 0
        );

        $byResource = SearchQuery::select(
            'resource',
            DB::raw('COUNT(*) as total'),
            DB::raw('AVG(response_time_ms) as avg_response_time_ms')
        )
            ->groupBy('resource')
            ->get()
            ->mapWithKeys(function ($row) {
                return [
                    $row->resource => [
                        'total' => (int) $row->total,
                        'avg_response_time_ms' => (int) round($row->avg_response_time_ms),
                    ],
                ];
            })
            ->toArray();

        $topQueryRows = SearchQuery::select(
            'query',
            DB::raw('COUNT(*) as total')
        )
            ->groupBy('query')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        $topQueries = $topQueryRows->map(function ($row) use ($total) {
            $count = (int) $row->total;

            return [
                'query' => $row->query,
                'count' => $count,
                'percentage' => (int) floor(($count / $total) * 100),
            ];
        })->toArray();

        return [
            'summary' => [
                'total_searches' => $total,
                'unique_queries' => $uniqueQueries,
                'avg_response_time_ms' => $avgResponseTime,
            ],
            'by_resource' => $byResource,
            'top_queries' => $topQueries,
        ];
    }
}