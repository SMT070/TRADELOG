// Adding CORS support
const cors = require('cors');
app.use(cors());

// Implementing mobile authentication retry logic
app.post('/login', (req, res) => {
    const maxRetries = 3;
    let loginAttempts = 0;

    const attemptLogin = async () => {
        try {
            // Your authentication logic
            res.send('Login successful');
        } catch (error) {
            loginAttempts++;
            if (loginAttempts < maxRetries) {
                setTimeout(attemptLogin, 1000); // Retry after 1 second
            } else {
                res.status(401).send('Authentication failed after multiple attempts');
            }
        }
    };
    attemptLogin();
});

// Handling network timeout
app.use((req, res, next) => {
    const timeout = setTimeout(() => {
        res.status(503).send('Request timed out');
    }, 5000); // 5 seconds timeout

    res.on('finish', () => {
        clearTimeout(timeout);
    });
    next();
});

// Improving delete operation for mobile devices
app.delete('/trade/:id', (req, res) => {
    const tradeId = req.params.id;
    // Your existing delete logic, ensuring mobile compatibility
    res.send('Trade deleted successfully');
}