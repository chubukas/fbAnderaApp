// Create User Tables
exports.userTable = `CREATE TABLE IF NOT EXISTS
      employees(
        id serial PRIMARY KEY NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        jobRole VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL
      )`;

exports.gifTable = `CREATE TABLE IF NOT EXISTS
      gifs(
        id serial PRIMARY KEY NOT NULL,
        image VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        postedBy VARCHAR(255) NOT NULL,
        createdOn TIMESTAMP,
        FOREIGN KEY (id) REFERENCES gifComment (id) on delete cascade on update cascade
      )`;

exports.gifCommentTable = `CREATE TABLE IF NOT EXISTS
        gifComment(
        id serial PRIMARY KEY NOT NULL,
        comment VARCHAR(255555) NOT NULL,
        postedBy VARCHAR(255) NOT NULL,
        createdOn TIMESTAMP
      )`;

exports.articleTable = `CREATE TABLE IF NOT EXISTS
      article(
        id serial PRIMARY KEY NOT NULL,
        title VARCHAR(255) NOT NULL,
        article VARCHAR(255555) NOT NULL,
        postedBy VARCHAR(255) NOT NULL,
        createdOn TIMESTAMP,
        FOREIGN KEY (id) REFERENCES articleComment (id) on delete cascade on update cascade
      )`;

exports.articleCommentTable = `CREATE TABLE IF NOT EXISTS
      articleComment(
        id serial PRIMARY KEY NOT NULL,
        comment VARCHAR(255555) NOT NULL,
        postedBy VARCHAR(255) NOT NULL,
        createdOn TIMESTAMP
      )`;
