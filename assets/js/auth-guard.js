// --- Check if User is Logged In ---
function isLoggedIn() {
    return localStorage.getItem("token") !== null;
}

// --- Protect ONLY Specific Features (NOT whole website) ---
function requireAuth() {
    if (!isLoggedIn()) {

        // Save previous page so user returns after login
        localStorage.setItem("redirectAfterLogin", window.location.href);

        // Always send user to login (NOT signup)
        window.location.href = "login.html";

        return false;
    }
    return true;
}

// --- After Signup → Redirect to Login ---
function afterSignup() {
    window.location.href = "login.html";
}

// --- After Login → Redirect Back or Default ---
function afterLogin(token) {

    // Store token (persistent login)
    localStorage.setItem("token", token);

    const redirectURL = localStorage.getItem("redirectAfterLogin");

    if (redirectURL) {
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirectURL;
    } else {
        window.location.href = "index.html";  // default home page
    }
}

// --- If Logged-in User Opens Login/Signup, Redirect to Home ---
function blockAuthPages() {
    if (isLoggedIn()) {
        window.location.href = "index.html";
    }
}

// --- LOGOUT ---
function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("redirectAfterLogin");

    // After logout → go to home (NOT signup)
    window.location.href = "index.html";
}
