<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class SwapiService
{
    private string $baseUrl;

    public function __construct()
    {
        $baseUrl = Config::get('services.swapi.base_url');

        if (blank($baseUrl)) {
            throw new RuntimeException('SWAPI_BASE_URL is not configured.');
        }

        $this->baseUrl = rtrim($baseUrl, '/');
    }

    public function search(string $resource, string $query): array
    {
        $endpoint = match ($resource) {
            'people' => 'people',
            'films' => 'films',
            default => throw new RuntimeException("Unsupported resource [$resource]"),
        };

        $start = microtime(true);

        $response = Http::timeout(5)->get(
            "{$this->baseUrl}/{$endpoint}",
            ['search' => $query]
        );

        return [
            'ok' => $response->successful(),
            'status' => $response->status(),
            'time_ms' => (int)((microtime(true) - $start) * 1000),
            'data' => $response->json(),
        ];
    }
}