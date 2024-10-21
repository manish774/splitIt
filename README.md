# Expense Tracker (Splitwise-like Application)

## Overview

This project is an expense-sharing and tracking application, inspired by Splitwise. It allows users to split bills, track shared expenses, and manage settlements efficiently among friends or groups. The application provides a user-friendly interface with features such as:

- Creating and managing groups for splitting expenses.
- Adding expenses with multiple participants.
- Calculating who owes whom based on shared expenses.
- Simplifying debt tracking with settlement options.

## Tech Stack

The project uses the following technologies:

### Frontend

- **React**: A JavaScript library for building interactive user interfaces. React handles the user interface and provides a responsive experience.

### Backend

- **Node.js**: A JavaScript runtime used for building the server-side logic of the application. It handles API requests, processes business logic, and interacts with the database.

### Database

- **MongoDB**: A NoSQL database that stores user, group, and transaction data in a flexible, schema-less format, ideal for handling dynamic and complex relationships between users and expenses.

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Group Creation**: Users can create groups to share and split expenses.
- **Expense Management**: Users can add and track expenses, and the app automatically calculates how much each user owes or is owed.
- **Balance Settlement**: Users can settle balances with other group members and track paid or pending settlements.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB (Running locally or on a service like MongoDB Atlas)

### Steps to run locally.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```
