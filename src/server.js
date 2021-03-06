const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
// routes
const authRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin/user');
const categoryRoutes = require("./routes/category/category");
const productRoutes = require("./routes/product/product");
const cartRoutes = require("./routes/cart/cart");
//environment configuration
env.config();
// Database connection
const dbURI = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@node-tut.dumhl.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connected');
  });
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port:${process.env.PORT}`);
});
