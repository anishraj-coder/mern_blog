import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import Post from './models/post.model.js';
import User from './models/user.model.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(async () => {
    console.log('MongoDb is connected');
    try {
      const postCount = await Post.countDocuments();
      if (postCount === 0) {
        console.log('No posts found in MongoDB. Seeding dummy posts...');
        
        // Find or create a seed user to act as author
        let user = await User.findOne();
        if (!user) {
          console.log('No users found in MongoDB. Creating a seed admin user...');
          const bcryptjs = (await import('bcryptjs')).default;
          const hashedPassword = bcryptjs.hashSync('admin123', 10);
          user = new User({
            username: 'admin',
            email: 'admin@blog.com',
            password: hashedPassword,
            isAdmin: true,
          });
          await user.save();
          console.log('Seed admin user created: admin@blog.com / admin123');
        }

        const dummyPosts = [
          {
            userId: user._id.toString(),
            title: 'Getting Started with the MERN Stack',
            slug: 'getting-started-with-the-mern-stack',
            content: '<p>The MERN stack (MongoDB, Express, React, Node.js) is one of the most popular stacks for building modern, high-performance web applications. In this post, we explore the core building blocks and set up a basic boilerplate to kickstart your full-stack development journey.</p>',
            category: 'javascript',
            image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221114110410/Top-10-JavaScript-Project-Ideas-For-Beginners-2023.png',
          },
          {
            userId: user._id.toString(),
            title: 'Mastering CSS Layouts and Grid Systems',
            slug: 'mastering-css-layouts-and-grid-systems',
            content: '<p>Visual layouts are crucial to providing a high-end user experience. Modern web design utilizes grid systems, flexbox alignments, and glassmorphic translucent containers to capture attention. Learn how to structure clean HTML and write reusable utility classes in vanilla CSS.</p>',
            category: 'css',
            image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221114110410/Top-10-JavaScript-Project-Ideas-For-Beginners-2023.png',
          }
        ];
        await Post.insertMany(dummyPosts);
        console.log('Dummy posts successfully seeded!');
      }
    } catch (err) {
      console.error('Error seeding dummy posts:', err);
    }
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
