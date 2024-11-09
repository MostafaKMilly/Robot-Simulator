# Robot-Simulator

## Description

The **Robot Simulator** is a command-line application that simulates a toy robot moving on a 5x5 unit square tabletop. The robot can be placed, moved, rotated, and can report its position and orientation.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **Docker** (optional, for containerization)

## How to Run the Project

### Using Node.js

1. **Navigate to the Project Directory**

   ```bash
   cd robot-simulator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Build the Project**

   ```bash
   npm run build
   ```

4. **Start the Application**

   ```bash
   npm start
   ```

   The application will start and await your commands.

### Using Docker

1. **Build the Docker Image**

   ```bash
   docker build -t robot-simulator .
   ```

2. **Run the Docker Container**

   ```bash
   docker run -it robot-simulator
   ```

   You can now input commands directly into the Docker container.

3. **Run Commands from a File**

   ```bash
   docker run -i robot-simulator < commands.txt
   ```

---

## How to Run Test Cases

### Running Tests with Node.js

1. **Navigate to the Project Directory**

   ```bash
   cd robot-simulator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Tests**

   ```bash
   npm test
   ```

   This command will execute all unit and integration tests, providing a summary of passed and failed tests.

### Running Tests with Docker

If you prefer to run tests inside a Docker container:

1. **Build the Docker Image**

   ```bash
   docker build -t robot-simulator .
   ```

2. **Run Tests Inside the Container**

   ```bash
   docker run robot-simulator npm test
   ```
