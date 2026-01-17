require('dotenv').config();

const express = require('express');
const path = require('path');

const submissionsRouter = require('./routes/submissions');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', rateLimiter);
app.use('/api/submissions', submissionsRouter);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Plik jest zbyt duży. Maksymalny rozmiar to 10MB.' });
    }
    
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: 'Nieoczekiwane pole pliku.' });
    }
    
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
});

async function start() {
    try {
        // Skipping local DB initialization; using remote DATABASE_URL
        console.log('Skipping local DB initialization (using remote DATABASE_URL)');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

start();
