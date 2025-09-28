<!DOCTYPE html>
<html>
<head>
    <title>Registration Successful</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow-lg p-4 text-center" style="max-width: 400px; width: 100%;">
        <h3 class="text-success">✅ Registration Successful!</h3>
        <p class="mt-3">Your account has been created successfully.</p>
        <p>You can now log in with your new account.</p>

        <a href="{{ route('login') }}" class="btn btn-primary mt-3">Go to Login</a>
    </div>
</body>
</html>
