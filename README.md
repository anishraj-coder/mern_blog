# TechCraft MERN Blog

A premium, full-stack blog platform built with the MERN stack (MongoDB, Express, React, Node.js), featuring a modern space-dark design system, robust authentication, database-backed sessions, and advanced micro-animations.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Main Components](#main-components)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Credits](#credits)

## Features
- **MongoDB-Backed Session Authentication**: Secure, database-managed session tokens with automated MongoDB TTL (Time-To-Live) expiration checks.
- **Admin-by-Default Testing Model**: Grants instant blogging tools access (Create, Edit, Delete, stats) to any newly registered account for seamless local evaluation.
- **Custom Branding**: Fully customized brand assets featuring a custom SVG Hexagonal Monogram logo representing **Anish Raj**.
- **Automated Post Seeding**: Automatically seeds realistic starter articles on server launch if MongoDB is empty.
- **Space-Dark Theme**: Premium UI design with flowing gradient accents, glowing mesh blurs, and glassmorphic card layouts.
- **Interactive Micro-Animations**: Rich interface feedback, infinite drifting background glows, and cascading grid entries powered by Framer Motion.
- **Quick-Access Posting**: Fixed header shortcut button for writing posts, visible to authenticated authors anywhere on the site.
- **Core Blogging System**: High-fidelity rich text editor, full commenting thread system with comment likes/replies, and advanced multi-filter Search.
- **Cloudinary Integration**: Cloud-based media storage integration for post banner image uploads.

## Project Structure

```
mern-blog/
├── api/                        # Backend (Node.js, Express)
│   ├── controllers/            # Route controllers
│   │   ├── auth.controller.js
│   │   ├── comment.controller.js
│   │   ├── post.controller.js
│   │   └── user.controller.js
│   ├── models/                 # Mongoose models
│   │   ├── comment.model.js
│   │   ├── post.model.js
│   │   ├── session.model.js    # Mongoose session schema
│   │   └── user.model.js
│   ├── routes/                 # API routes
│   │   ├── auth.route.js
│   │   ├── comment.route.js
│   │   ├── post.route.js
│   │   └── user.route.js
│   ├── utils/                  # Utility functions and middleware
│   │   ├── error.js
│   │   └── verifyUser.js       # Session validation middleware
│   └── index.js                # Server entry point & auto-seeder
├── client/                     # Frontend (React, Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── CallToAction.jsx
│   │   │   ├── Comment.jsx
│   │   │   ├── CommentSection.jsx
│   │   │   ├── DashboardComp.jsx
│   │   │   ├── DashComments.jsx
│   │   │   ├── DashPosts.jsx
│   │   │   ├── DashProfile.jsx
│   │   │   ├── DashSidebar.jsx
│   │   │   ├── DashUsers.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Logo.jsx        # Monogram SVG Logo
│   │   │   ├── OnlyAdminPrivateRoute.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── ThemeProvider.jsx
│   │   ├── pages/              # Main pages
│   │   │   ├── About.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── PostPage.jsx
│   │   │   ├── Projects.jsx    # Dynamically fetched projects
│   │   │   ├── Search.jsx      # Glassmorphic search view
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── UpdatePost.jsx
│   │   ├── redux/              # Redux state management
│   │   │   ├── store.js
│   │   │   ├── theme/
│   │   │   │   └── themeSlice.js
│   │   │   └── user/
│   │   │       └── userSlice.js
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global dark-theme styles
│   ├── index.html              # HTML template with Outfit typography
│   ├── package.json            # Frontend dependencies
│   ├── postcss.config.js       # PostCSS config
│   ├── tailwind.config.js      # Tailwind CSS config
│   └── vite.config.js          # Vite config
├── .env                        # Root server environment variables
├── package.json                # Project metadata and workspace scripts
└── README.md                  # Project documentation
```

## Tech Stack
- **Frontend:** React, Vite, Redux Toolkit, Framer Motion, Tailwind CSS, Flowbite React, React Router, Cloudinary
- **Backend:** Node.js, Express, MongoDB, Mongoose (with TTL indexes), bcryptjs, cookie-parser, dotenv
- **Other:** ESLint, PostCSS, Vite Proxy, React Icons

## API Endpoints

### Auth
- `POST /api/auth/signup` — Register a new user (with robust email validation)
- `POST /api/auth/signin` — Login (initiates database-backed session)

### User
- `GET /api/user/getusers` — Get all users (admin)
- `GET /api/user/projects` — Fetch author's active projects dynamically
- `GET /api/user/:userId` — Get user by ID
- `PUT /api/user/update/:userId` — Update user details
- `DELETE /api/user/delete/:userId` — Delete user account & associated sessions
- `POST /api/user/signout` — Sign out & clear active session

### Post
- `POST /api/post/create` — Create post (requires authentication)
- `GET /api/post/getposts` — Get posts (with search & filter params)
- `PUT /api/post/updatepost/:postId/:userId` — Update post details
- `DELETE /api/post/deletepost/:postId/:userId` — Delete post

### Comment
- `POST /api/comment/create` — Add comment
- `GET /api/comment/getPostComments/:postId` — Get comments for a post
- `PUT /api/comment/likeComment/:commentId` — Like a comment
- `PUT /api/comment/editComment/:commentId` — Edit comment
- `DELETE /api/comment/deleteComment/:commentId` — Delete comment
- `GET /api/comment/getcomments` — Get all comments (admin)

## Main Components
- **Header/Footer:** Navigation, quick-posting trigger, and brand assets
- **Dashboard:** Stats display, user, post, and comment management tables
- **PostCard:** Scalable grid card representing an article overview
- **CommentSection/Comment:** Full nested comment threads with styling and likes
- **Auth (SignIn/SignUp):** Multi-factor input validation with custom animated alerts
- **PrivateRoute/OnlyAdminPrivateRoute:** Secure client routes
- **ThemeProvider:** Cosmic slate grid layout background
- **Projects/About:** Informational portfolio page layouts

## Getting Started

### Prerequisites
- Node.js
- pnpm, npm, or yarn
- MongoDB database (local or cloud instance)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/anishraj-coder/mern-blog.git
   cd mern-blog
   ```

2. Install backend and workspace dependencies:
   ```sh
   pnpm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   MONGO=mongodb://admin:adminpassword@localhost:27017/local_db?authSource=admin
   JWT_SECRET=your_jwt_secret_fallback
   ```

4. Create environment configuration for Cloudinary uploads in `client/.env`:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=mern_blog
   VITE_CLOUDINARY_UPLOAD_PRESET=mern_blog_preset
   ```

## Running the App

1. Run the workspace development server (spawns both frontend and backend):
   ```sh
   pnpm run dev
   ```

2. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

### Combined Production Build
The Express backend is configured to serve static assets from the client production build automatically:
1. Compile frontend assets:
   ```sh
   cd client
   pnpm run build
   ```
2. Start production node environment from root directory:
   ```sh
   npm start
   ```

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add some feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Security
- Password hashing is enforced via `bcryptjs`.
- Session tokens are generated securely using cryptographically random byte buffers.
- Cookie headers are protected using `httpOnly` flags to prevent XSS-based session hijacking.
- Robust sanitization patterns are implemented in backend authentication validation routes.

## License
This project is licensed under the ISC License.

## Credits
- Built and designed by [Anish Raj](https://github.com/anishraj-coder)
