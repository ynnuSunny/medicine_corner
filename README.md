# Medicine Information Management System

This project is a simple web application designed to display medicine information in a tabular format. Users can log in to edit and delete medicine entries.

## Features

- Display a list of medicines
- Search my name and Generic Name
- Insert medicines (available for logged-in users only)
- Edit and delete medicine entries (available for logged-in users only)
- User authentication

## Prerequisites

- Python 3.x
- pip (Python package installer)

## Installation

1. **Clone the repository:**

    ```bash
    git clone git@github.com:ynnuSunny/medicine_corner.git
    cd <your-repo-directory>
    ```


2. **Activate the virtual environment:**

    On Windows:
    ```bash
    myenv\Scripts\activate
    ```

    On macOS/Linux:
    ```bash
    source myenv/bin/activate
    ```

3. **Install the dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

### Backend Setup

1. **Run the backend server (Django):**

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver
    ```

### Frontend Setup

1. **Open the index.html file in a web browser:**

    ```bash
    open index.html
    ```

    Or you can simply double-click on the `index.html` file to open it in your default web browser.

