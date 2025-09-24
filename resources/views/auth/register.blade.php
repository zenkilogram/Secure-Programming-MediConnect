<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - MediConnect</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .form-error {
            color: #dc2626; /* text-red-600 */
            font-size: 0.875rem; /* text-sm */
            margin-top: 0.5rem; /* mt-2 */
        }
        .form-success {
            color: #16a34a; /* text-green-600 */
            background-color: #f0fdf4; /* bg-green-50 */
            border: 1px solid #4ade80; /* border-green-400 */
            padding: 1rem; /* p-4 */
            border-radius: 0.5rem; /* rounded-lg */
            margin-bottom: 1rem; /* mb-4 */
        }
    </style>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <!-- Main container -->
    <div class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <!-- Left Panel -->
        <div class="relative flex flex-col justify-center p-8 text-center md:text-left md:p-12 md:w-1/2">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">Create Your Everyday Healthcare Account.</h1>
            <p class="text-lg text-gray-600 mb-8">Join our network to manage appointments, prescriptions, and connect with healthcare professionals seamlessly.</p>
            <div class="flex justify-center md:justify-start items-end h-64">
                <!-- Your illustration goes here. You can add an <img> tag or your SVG code inside this div. -->
            </div>
        </div>

        <!-- Right Panel (Sign-up Form) -->
        <div class="flex flex-col justify-center p-8 md:p-12 md:w-1/2">
            <h2 class="font-bold text-3xl text-gray-800">Create an Account</h2>
            <p class="text-gray-600 pt-2 mb-8">Let's get you started!</p>

            <?php 
            if(!empty($success_msg)){
                echo '<div class="form-success">' . $success_msg . '</div>';
            }
            ?>

            <form class="flex flex-col" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
                <!-- Full Name -->
                <div class="mb-4">
                    <label for="fullName" class="text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="fullName" name="fullName" placeholder="John Doe" value="<?php echo $fullName; ?>" class="w-full mt-2 px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 <?php echo (!empty($fullName_err)) ? 'border-red-500' : ''; ?>">
                    <?php if(!empty($fullName_err)): ?>
                        <p class="form-error"><?php echo $fullName_err; ?></p>
                    <?php endif; ?>
                </div>
                
                <!-- Email Address -->
                <div class="mb-4">
                    <label for="email" class="text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" value="<?php echo $email; ?>" class="w-full mt-2 px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 <?php echo (!empty($email_err)) ? 'border-red-500' : ''; ?>">
                    <?php if(!empty($email_err)): ?>
                        <p class="form-error"><?php echo $email_err; ?></p>
                    <?php endif; ?>
                </div>

                <!-- Password -->
                <div class="mb-4">
                    <label for="password" class="text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" class="w-full mt-2 px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 <?php echo (!empty($password_err)) ? 'border-red-500' : ''; ?>">
                    <?php if(!empty($password_err)): ?>
                        <p class="form-error"><?php echo $password_err; ?></p>
                    <?php endif; ?>
                </div>

                <!-- Confirm Password -->
                <div class="mb-6">
                    <label for="confirmPassword" class="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" class="w-full mt-2 px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 <?php echo (!empty($confirmPassword_err)) ? 'border-red-500' : ''; ?>">
                    <?php if(!empty($confirmPassword_err)): ?>
                        <p class="form-error"><?php echo $confirmPassword_err; ?></p>
                    <?php endif; ?>
                </div>
                
                <!-- Sign Up Button -->
                <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out">Sign Up</button>
            </form>

            <!-- Bottom Link -->
            <div class="text-center mt-8">
                <p class="text-sm text-gray-600">Already have an account? <a href="#" class="font-semibold text-indigo-600 hover:underline">Login</a></p>
            </div>
        </div>
    </div>
</body>
</html>
