<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - MediConnect</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <!-- Left Panel -->
        <div class="relative flex flex-col justify-center p-8 text-center md:text-left md:p-12 md:w-1/2">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">Create Your Everyday Healthcare Account.</h1>
            <p class="text-lg text-gray-600 mb-8">Join our network to manage appointments, prescriptions, and connect with healthcare professionals seamlessly.</p>
        </div>

        <!-- Right Panel (Sign-up Form) -->
        <div class="flex flex-col justify-center p-8 md:p-12 md:w-1/2">
            <h2 class="font-bold text-3xl text-gray-800">Create an Account</h2>
            <p class="text-gray-600 pt-2 mb-8">Let's get you started!</p>

            <form method="POST" action="{{ route('register') }}" class="flex flex-col">
                @csrf

                <!-- Full Name -->
                <div class="mb-4">
                    <label for="name" class="text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" name="name" value="{{ old('name') }}" placeholder="John Doe"
                        class="w-full mt-2 px-4 py-3 border bg-gray-50 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-indigo-500 @error('name') border-red-500 @enderror">
                    @error('name')
                        <p class="text-sm text-red-600 mt-2">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Email Address -->
                <div class="mb-4">
                    <label for="email" class="text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" name="email" value="{{ old('email') }}" placeholder="you@example.com"
                        class="w-full mt-2 px-4 py-3 border bg-gray-50 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-indigo-500 @error('email') border-red-500 @enderror">
                    @error('email')
                        <p class="text-sm text-red-600 mt-2">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Password -->
                <div class="mb-4">
                    <label for="password" class="text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password"
                        class="w-full mt-2 px-4 py-3 border bg-gray-50 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-indigo-500 @error('password') border-red-500 @enderror">
                    @error('password')
                        <p class="text-sm text-red-600 mt-2">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Confirm Password -->
                <div class="mb-6">
                    <label for="password_confirmation" class="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm your password"
                        class="w-full mt-2 px-4 py-3 border bg-gray-50 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-indigo-500">
                </div>
                
                <!-- Sign Up Button -->
                <button type="submit" 
                    class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out">
                    Sign Up
                </button>
            </form>

            <!-- Bottom Link -->
            <div class="text-center mt-8">
                <p class="text-sm text-gray-600">
                    Already have an account? 
                    <a href="{{ route('login') }}" class="font-semibold text-indigo-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
