<!-- resources/views/home.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - MediConnect</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex flex-col items-center justify-center">

    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {{ Auth::user()->name ?? 'User' }} 🎉
        </h1>
        <p class="text-gray-600 mb-6">
            You are now logged in to MediConnect.
        </p>

        <!-- Logout button -->
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit"
                class="w-full bg-red-600 text-white py-3 rounded-lg font-semibold
                       hover:bg-red-700 focus:outline-none focus:ring-2
                       focus:ring-offset-2 focus:ring-red-500 transition">
                Logout
            </button>
        </form>
    </div>

</body>
</html>
