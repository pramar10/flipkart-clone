const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const app = express();

// router
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.isocn3p.mongodb.net/${process.env.MONGO_DB_DATABASE}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('Database Connected');
  });

app.use(json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server');
});
