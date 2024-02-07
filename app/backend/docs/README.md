# Backend Code Base

The backend code base is located at `/home/kali/test/foodList/app/backend`. It contains the necessary files and directories to handle the server-side logic and data processing for the application.

## File Structure

The file structure of the backend code base is as follows:

- `docs/`: This directory contains documentation related to the backend code.
    - `README.md`: This file provides information about the backend code base.

- Other files and directories: These include the actual backend code files, such as controllers, models, routes, and utilities, organized based on the application's architecture and design patterns.

## Purpose

The purpose of the backend code base is to handle the server-side operations of your application. It includes the implementation of APIs, database interactions, business logic, and other backend functionalities required to support the frontend and provide a seamless user experience.

## Technologies Used

## Development Workflow

## Generate DB schema

Install the `django-extensions` package by running the following command:

```python
INSTALLED_APPS = [
    ...
    'django_extensions',
    ...
]
```

Run the following command to generate the DB schema:

```bash
python3 manage.py graph_models -a -g -o docs/model.png
```

## Run Tests

Run the following command to execute the backend tests:

```bash
python3 manage.py test mealPlans.tests
```
