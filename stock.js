// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection URL
const url = 'mongodb+srv://marygracebeastrom:4etKYLczpj6qGRjw@stock.e49hmxx.mongodb.net/?retryWrites=true&w=majority&appName=Stock';

// Set up middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
    // Serve your HTML form here
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.get('/process', async (req, res) => {
    const searchInput = req.query.searchInput;
    const searchType = req.query.searchType;

    try {
        // Connect to MongoDB
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const db = client.db('Stock');
        const collection = db.collection('PublicCompanies');

        let query = {};

        // Determine search criteria based on search type
        if (searchType === 'ticker') {
            query = { ticker: searchInput };
        } else if (searchType === 'company') {
            query = { name: searchInput };
        }

        // Query the database
        const result = await collection.find(query).toArray();

        // Send response with search results
        res.json(result);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close MongoDB connection
        client.close();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
