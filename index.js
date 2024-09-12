const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Feed_Schema = require('./models/Feed_Schema');

const app = express();
const port = 5000;

// Middlewares
app.use(cors(
  {
    origin:["https://pond-app-frontend.vercel.app","https://pond-app-frontend.vercel.app/feed-stock/view","https://pond-app-frontend.vercel.app/feed-stock"],
    methods:["POST","GET"],
    credentials:true
  }
));
app.options('*', cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect('mongodb+srv://varmavegesnaaaa:gnana2004@database.6jr0m.mongodb.net/?retryWrites=true&w=majority&appName=database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Terminate the process if the connection fails
  });

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Feed Stock API modified');
});

// API route
app.post('/feed-stock/add', async (req, res) => {
  try {
    const { feed_name, feed_count, message } = req.body;

    if (!feed_name || !feed_count || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const feedData = new Feed_Schema({ feed_name, feed_count, message });
    await feedData.save();

    res.status(200).json({ message: 'Feed Stock Updated successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving form data', error: error.message });
  }
});

app.get('/feeds', async (req, res) => {
  try {
    const feeds = await Feed_Schema.find({});
    console.log(feeds);
    res.json(feeds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feeds' });
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
