# PFT

Programming For The Cloud

## Project Setup

1. Download and install VSCode
2. Download and install Git
3. Download and install Node.js
4. Setup a private git Repository
5. Set up NPM

## Git Setup

```bash
git init
git remote add origin [YOUR GIT URL]
git add *
git commit -a -m "init repo"
git push origin master
```

## NPM Setup

```bash
cd frontend
npm init -y
cd ..
cd backend
npm init -y
```

## Saving On Git

```bash
git add *
git commit -a -m "[UPDATE INFO]"
git push origin master
```

## Installing Packages

```bash
cd backend
npm install express
```

### WHAT IS AN API?

- API stands for Application Programming Interface

### WHAT IS A REST API (RESTful API)?

- REST stands for Representational State Transfer.

- A REST API is an application programming interface that conforms to the constraints of REST architectural style and allows for interaction with RESTful web services.

### HTTP Methods

- These represent CRUD operations. CRUD stands for Create, Read, Update and Delete.

GET - Fetches data
POST - Sends new data
PUT - Updates data
DELETE - Deletes data

### SERVER CONFIG
```bash
sudo apt-get update
sudo apt-get upgrade -y
```