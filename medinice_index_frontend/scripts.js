let accessToken = null; // Store access token globally

// Function to fetch medicine information from the API
function fetchMedicines() {
  fetch('http://localhost:8000/api/medicines/')
    .then(response => {
      // Check if the response status is OK
      if (response.ok) {
        return response.json();
      } else {
        // If response is not OK, handle the error
        throw new Error('Failed to fetch medicines');
      }
    })
    .then(data => {
      // Once data is fetched, update the table
      updateTable(data);
    })
    .catch(error => console.error('Error fetching medicines:', error));
}

// Function to update the table with medicine information
function updateTable(data) {
  const tbody = document.getElementById('medicineBody');
  tbody.innerHTML = '';
  data.forEach(medicine => {
    const row = document.createElement('tr');
    row.id = `medicineRow_${medicine.id}`; // Set row id to match medicine id
    row.innerHTML = `
      <td>${medicine.id}</td>
      <td>${medicine.name}</td>
      <td>${medicine.generic_name}</td>
      <td>${medicine.manufacturer}</td>
      <td>${medicine.description}</td>
      <td>${medicine.price}</td>
      <td>${medicine.batch_number}</td>
      <td>${medicine.location}</td>
      <td>${medicine.other_details}</td>
      <td class="action-buttons">
        ${accessToken ? `
          <button onclick="updateMedicine(${medicine.id})">Update</button>
          <button onclick="deleteMedicine(${medicine.id})">Delete</button>
        ` : ''}
      </td>
    `;
    tbody.appendChild(row);
  });
}


// Function to handle login
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch('http://localhost:8000/api/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      accessToken = data.access;
      // Hide login form
      document.getElementById('loginForm').style.display = 'none';
      // Show insert button
      // Show insert button row
      document.getElementById('insertRow').style.display = 'table-row';
      
      // Fetch medicines
      fetchMedicines();
    })
    .catch(error => console.error('Login error:', error));
}

// Function to update medicine
function updateMedicine(id) {
  // Get the table row corresponding to the medicine ID
  const row = document.getElementById(`medicineRow_${id}`);
  
  if (row) {
    // Get the table cells of the row
    const cells = row.querySelectorAll('td');
    
    // Iterate over the cells and replace text content with input fields
    cells.forEach(cell => {
      const currentValue = cell.textContent.trim();
      // Create input element
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentValue;
      // Replace text content with input field
      cell.textContent = '';
      cell.appendChild(input);
    });

    // Remove the "Update" button
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = ''; // Remove any existing content

    // Create and append the "Save" button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = function() {
      saveUpdatedMedicine(id);
    };
    actionCell.appendChild(saveButton);
  } else {
    console.error('Row not found for medicine ID:', id);
  }
}




// Function to save updated medicine
function saveUpdatedMedicine(id) {
  // Get the table row corresponding to the medicine ID
  const row = document.getElementById(`medicineRow_${id}`);
  // Get the input fields in the row
  const inputs = row.querySelectorAll('input');
  // Prepare updated medicine data
  const updatedMedicineData = {
    name: inputs[1].value,
    generic_name: inputs[2].value,
    manufacturer: inputs[3].value,
    description: inputs[4].value,
    price: parseFloat(inputs[5].value),
    batch_number: inputs[6].value,
    location: inputs[7].value,
    other_details: inputs[8].value
  };
   
  console.log(updatedMedicineData);

  fetch(`http://localhost:8000/api/medicines/${id}/edit/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Include access token in headers
    },
    body: JSON.stringify(updatedMedicineData)
  })
    .then(response => {
      // Check if the response status is OK
      if (response.ok) {
        return response.json();
      } else {
        // If response is not OK, handle the error
        throw new Error('Failed to edit medicine');
      }
    })
    .then(data => {
      // Handle successful edit
      console.log('Medicine updated successfully:', data);
      // Fetch medicines again to update the table
      fetchMedicines();
    })
    .catch(error => console.error('Error editing medicine:', error));
}


// Function to delete medicine
function deleteMedicine(id) {
  // Confirm deletion with user
  if (confirm(`Are you sure you want to delete medicine with ID ${id}?`)) {
    fetch(`http://localhost:8000/api/medicines/${id}/edit/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}` // Include access token in headers
      }
    })
      .then(response => {
        // Check if the response status is OK
        if (response.ok) {
          console.log('Medicine deleted successfully');
          // Fetch medicines again to update the table
          fetchMedicines();
        } else {
          // If response is not OK, handle the error
          throw new Error('Failed to delete medicine');
        }
      })
      .catch(error => console.error('Error deleting medicine:', error));
  }
}

// Function to insert new medicine at the top of the table
function insertMedicine() {
  // Create a new row element
  const newRow = document.createElement('tr');

  // Create non-editable ID cell
  const idCell = document.createElement('td');
  idCell.textContent = 'Auto-generated'; // You can modify this value if needed
  newRow.appendChild(idCell);

  // Create input fields for other columns
  const inputFields = [
    'name', 'generic_name', 'manufacturer', 'description', 
    'price', 'batch_number', 'location', 'other_details'
  ].map(fieldName => {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = fieldName;
    return input;
  });

  // Append input fields to the new row
  inputFields.forEach(input => {
    const cell = document.createElement('td');
    cell.appendChild(input);
    newRow.appendChild(cell);
  });

  // Create Save button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.onclick = function() {
    saveNewMedicine(newRow);
  };
  const actionCell = document.createElement('td');
  actionCell.appendChild(saveButton);
  newRow.appendChild(actionCell);

  // Insert the new row at the top of the table
  const tableBody = document.getElementById('medicineBody');
  tableBody.insertBefore(newRow, tableBody.firstChild);
}


// Function to save new medicine
function saveNewMedicine(newRow) {
  // Get input field values from the new row
  const inputs = newRow.querySelectorAll('input');
  const newMedicineData = {};
  inputs.forEach(input => {
    newMedicineData[input.name] = input.value;
  });

  fetch(`http://localhost:8000/api/medicines/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Include access token in headers
    },
    body: JSON.stringify(newMedicineData)
  })
    .then(response => {
      // Check if the response status is OK
      if (response.ok) {
        return response.json();
      } else {
        // If response is not OK, handle the error
        throw new Error('Failed to insert medicine');
      }
    })
    .then(data => {
      // Handle successful insert
      console.log('Medicine inserted successfully:', data);
      // Fetch medicines again to update the table
      fetchMedicines();
    })
    .catch(error => console.error('Error inserting medicine:', error));

  // Remove the new row from the table body
  newRow.remove();
}

// Function to search for medicines
function searchMedicine() {
  const searchQuery = document.getElementById('searchInput').value;
  fetch(`http://localhost:8000/api/search/?q=${encodeURIComponent(searchQuery)}`)
    .then(response => {
      // Check if the response status is OK
      if (response.ok) {
        return response.json();
      } else {
        // If response is not OK, handle the error
        throw new Error('Failed to search medicines');
      }
    })
    .then(data => {
      // Once data is fetched, update the table
      updateTable(data);
    })
    .catch(error => console.error('Error searching medicines:', error));
}


// Fetch medicine information when the page loads
window.onload = () => {
  // Check if the access token is stored in localStorage
  fetchMedicines();
  const storedToken = localStorage.getItem('accessToken');
  if (storedToken) {
    accessToken = storedToken;
  } else {
    // Show login form if access token is not stored
    document.getElementById('loginForm').style.display = 'block';
  }
};
