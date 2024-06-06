# Medicine API Documentation

This document outlines the endpoints available in the Medicine API.

## Fetch All Medicines

- **URL:** `/api/medicines/`
- **Method:** GET
- **Permissions:** Public
- **Description:** Retrieves a list of all medicines.

## Fetch Medicine by ID

- **URL:** `/api/medicines/<int:pk>/`
- **Method:** GET
- **Permissions:** Public
- **Description:** Retrieves details of a specific medicine identified by its ID.

## Create Medicine

- **URL:** `/api/medicines/`
- **Method:** POST
- **Permissions:** Admin
- **Description:** Allows admins to add new medicines to the database.

## Edit Medicine

- **URL:** `/api/medicines/<int:pk>/edit/`
- **Method:** PUT/PATCH
- **Permissions:** Admin
- **Description:** Allows admins to update details of a specific medicine.

## Delete Medicine

- **URL:** `/api/medicines/<int:pk>/edit/`
- **Method:** DELETE
- **Permissions:** Admin
- **Description:** Allows admins to remove a specific medicine from the database.

## Search Medicines

- **URL:** `/api/search/`
- **Method:** GET
- **Permissions:** Public
- **Description:** Enables users to search for medicines based on certain criteria.
