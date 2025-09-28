<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - MediConnect</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-900 flex items-center justify-center min-h-screen">
    <!-- Main container -->
    <div class="relative flex flex-col m-6 w-full max-w-4xl bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        
        <!-- Left Panel -->
        <div class="relative flex flex-col justify-center p-8 text-left bg-indigo-50 rounded-l-2xl md:p-12 md:w-1/2">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-8">Book Your Everyday Healthcare.</h1>
            <div class="flex justify-center items-center h-72">
                <!-- Example illustration -->
                <!-- <img src="{{ asset('images/illustration.svg') }}" alt="MediConnect Illustration" class="w-full h-full object-contain"> -->
            </div>
        </div>

        <!-- Right Panel (Login Form) -->
        <div class="flex flex-col justify-center p-8 md:p-12 md:w-1/2">
            <h2 class="font-bold text-3xl text-gray-800">Welcome to MediConnect!</h2>
            
            <form class="flex flex-col mt-8" action="{{ route('login') }}" method="POST">
                @csrf <!-- required for security -->
                
                <!-- Email Address -->
                <div class="mb-4">
                    <label for="email" class="text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com"
                        class="w-full mt-2 px-4 py-3 border-none bg-indigo-50 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
                </div>

                <!-- Password -->
                <div class="mb-4">
                    <label for="password" class="text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password"
                        class="w-full mt-2 px-4 py-3 border-none bg-indigo-50 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
                </div>
                
                <!-- Forgot password -->
                <div class="text-right mb-6">
                    <a href="{{ route('password.request') }}" class="text-sm font-semibold text-indigo-600 hover:underline">Forgot password?</a>
                </div>
                
                <!-- Login Button -->
                <button type="submit" 
                    class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold 
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-indigo-500 transition duration-300 ease-in-out">
                    Login
                </button>
            </form>

            <!-- Bottom Link -->
            <div class="text-center mt-8">
                <p class="text-sm text-gray-600">
                    Don't have an account? 
                    <a href="{{ route('register') }}" class="font-semibold text-indigo-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
