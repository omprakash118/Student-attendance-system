document.addEventListener('DOMContentLoaded', () => {
    const teacherId = localStorage.getItem('userId'); // Get userId from localStorage

    if (!teacherId) {
        alert('You are not logged in.');
        window.location.href = '/login.page.html'; // Redirect to login if not logged in
    } else {
        console.log('teacher ID:', teacherId); // Log the admin ID for debugging
        fetchAdminDetails(teacherId); // Fetch admin details from the backend
    }
});

async function fetchAdminDetails(teacherId) {
    try {
        const response = await fetch(`http://localhost:8000/api/teacher/${teacherId}`);
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
        document.getElementById('officePhone').value = data.officePhone || '';
        document.getElementById('subjects').value = data.subjects || '';
        document.getElementById('customSubjects').value = data.customSubjects || '';
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
