const express = require('express');
const app = express();
const port = 3000;
const sendEmail = require('./email');
const connectToMongo = require('./mongodb');


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const hostname = 'localhost';

// Call the function to connect to MongoDB
connectToMongo();

app.use(express.json());

app.use('/contact', require('./contact'));

app.post('/create-product', upload.single('image'), async (req, res) => {
  try {
    const productData = {
      name: req.body.name,
      price: parseFloat(req.body.price),
      image: req.file.buffer,
      email: req.body.email,
      address: req.body.address,
    };

    // Call the function to send an email
    await sendEmail();

    // Store data in MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const db = client.db('shopdb');
    const collection = db.collection('datause');
    const productDocument = {
      name: productData.name,
      price: productData.price,
      image: productData.image,
      email: productData.email,
      address: productData.address,
    };
    const mongoResult = await collection.insertOne(productDocument);

    res.status(200).json({
      emailMessage: 'Email sent successfully',
      mongoMessage: 'Product added successfully',
    });

    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      emailMessage: 'An error occurred while sending the email',
      mongoMessage: 'An error occurred while adding the product',
    });
  }
});

// Start the server on the specified hostname and port
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
