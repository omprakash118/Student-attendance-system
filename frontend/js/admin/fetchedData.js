document.addEventListener('DOMContentLoaded', () => {
    const adminId = localStorage.getItem('userId'); // Get userId from localStorage
    if (!adminId) {
        alert('You are not logged in.');
        window.location.href = '/login.page.html'; // Redirect to login if not logged in
    } else {
        console.log('Admin ID:', adminId); // Log the admin ID for debugging
        fetchAdminDetails(adminId); // Fetch admin details from the backend
    }
});

async function fetchAdminDetails(adminId) {
    try {
        const response = await fetch(`http://localhost:8000/api/admin/${adminId}`);
        const result = await response.json();

        
        if (!response.ok) {
            alert(result.message || 'Failed to fetch admin data');
            return;
        }
        const data = result.data;

        console.log('Fetched admin data:', data); // Log the fetched data for debugging
        // Populate form fields
        document.getElementById('firstName').value = data.Firstname || '';
        document.getElementById('lastName').value = data.Lastname || '';
        document.getElementById('username').value = data.username || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('mobilePhone').value = data.mobilePhone || '';
        document.getElementById('officePhone').value = data.officePhone || '';
        document.getElementById('bioNotes').value = data.bioNotes || '';

        document.getElementById('logname').textContent = data.Firstname || ''; // Set the logged-in username in the header
        document.getElementById('firstLast').textContent = `${data.Firstname || ''} ${data.Lastname || ''}`; // Set the full name in the dropdown

        // Address fields
        const address = data.address || {};
        console.log('Address:', address); // Log the address for debugging
        document.getElementById('street').value = address.street || '';
        document.getElementById('addressLine2').value = address.addressLine2 || '';
        document.getElementById('city').value = address.city || '';
        document.getElementById('state').value = address.state || '';
        document.getElementById('zipCode').value = address.zipCode || '';
    } catch (error) {
        console.error('Error fetching admin details:', error);
        alert('Error fetching admin details.');
    }
}
