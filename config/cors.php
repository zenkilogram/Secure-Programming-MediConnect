<?php

return [

    'paths' => ['api/v1/*', 'sanctum/csrf-cookie', '/login', '/logout', '/register',],

    'allowed_methods' => ['*'],

    // Allow all origins — change later for production
    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173'), 'https://vercel-domain.vercel.app',],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 3600,

    // Set false unless you're using cookies (Sanctum)
    'supports_credentials' => true,

];
