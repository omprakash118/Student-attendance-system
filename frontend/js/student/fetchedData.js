document.addEventListener('DOMContentLoaded', () => {
    const studentId = localStorage.getItem('userId'); // Get userId from localStorage

    if (!studentId) {
        alert('You are not logged in.');
        window.location.href = '/login.page.html'; // Redirect to login if not logged in
    } else {
        console.log('Student ID:', studentId); // Log the admin ID for debugging
        fetchAdminDetails(studentId); // Fetch admin details from the backend
    }
});

async function fetchAdminDetails(studentId) {
    try {
        const response = await fetch(`http://localhost:8000/api/student/${studentId}`);
        const result = await response.json();

        if (!response.ok) {
            alert(result.message || 'Failed to fetch admin data');
            return;
        }
        const data = result.data;
        // Populate form fields
        document.getElementById('firstName').value = data.Firstname || '';
        document.getElementById('lastName').value = data.Lastname || '';
        document.getElementById('username').value = data.username || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('mobilePhone').value = data.mobilePhone || '';
        document.getElementById('parentsPhone').value = data.parentsPhone || '';
        document.getElementById('classAssigned').value = data.classAssigned || '';
        document.getElementById('bioNotes').value = data.bioNotes || '';

        // Address fields
        const address = data.address || {};
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
