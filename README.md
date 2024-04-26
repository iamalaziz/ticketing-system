# Cinema Ticketing System

### Overview

The Cinema Ticketing System is a web app built to streamline the process of booking and managing tickets for movie screenings in a cinema. This system allows users to browse available movies, view showtimes, select seats, and purchase tickets online. It also provides an admin interface for managing movies, screenings, and user bookings.

### Tech Stack

- NestJS
- MySQL
- Docker
- TypeScript

### Authors

@Jay-Khakim
@iamalaziz

### How to Run

To clone and run the Cinema Ticketing System, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/your-repository.git
```
2. Navigate to the project directory:
```bash
cd cinema-ticketing-system
```
3. Set up MySQL database:
  - Install MySQL if you haven't already.
  - Create a new database for the application.
  - Update the database connection configuration in the project to match your MySQL database settings.
4. Run the application using Docker:
  - Ensure Docker is installed on your system.
  - Build the Docker image:
    ```perl
    docker build -t cinema-ticketing-system .
    ```
  - Run the Docker container: 
    ```bash
    docker run -d -p 3000:3000 cinema-ticketing-system
    ```
5. Access the application:
Open your web browser and navigate to http://localhost:3000 to access the Cinema Ticketing System.