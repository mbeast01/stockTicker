const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL and database name
const url = 'mongodb+srv://marygracebeastrom:4etKYLczpj6qGRjw@stock.e49hmxx.mongodb.net/?retryWrites=true&w=majority&appName=Stock';
const dbName = 'Stock';

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');

    // Define route for processing form submission
    app.get('/process', function(req, res) {
        const searchInput = req.query.searchInput;
        const searchType = req.query.searchType;

        // Process the form data and interact with MongoDB
        // Query the database based on searchInput and searchType
        // Send the results back to the client
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, function() {
        console.log(`Server running on port ${PORT}`);
    });
});
