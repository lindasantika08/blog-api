## URL Project

https://roadmap.sh/projects/blogging-platform-api

# Blog API

REST API untuk blog menggunakan Node.js, Express.js, dan MySQL.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)

## Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Package Manager:** npm

## Installation
```bash
npm install
```

## Environment Variables

Create `.env` file:
```env
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=blog_db
```

## Database Setup
```sql
CREATE DATABASE blog_db;

USE blog_db;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  tags JSON,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Run Server
```bash
npm start
# atau
node server.js
```

## API Endpoints

### Get All Posts
```http
GET /api/posts
```

### Get Post by ID
```http
GET /api/posts/:id
```

### Create Post
```http
POST /api/posts
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content here",
  "category": "Technology",
  "tags": ["node", "express"]
}
```

### Update Post
```http
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "category": "Tech",
  "tags": ["updated"]
}
```

### Delete Post
```http
DELETE /api/posts/:id
```

## Project Structure
```
blog-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── postController.js
│   ├── models/
│   │   └── postModel.js
│   ├── routes/
│   │   └── postRoutes.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Author

Linda Santika
