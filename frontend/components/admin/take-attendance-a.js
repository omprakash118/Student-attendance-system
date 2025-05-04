
const takeattendance = document.getElementById('take-attendance');

// ---------------------- Render Layout ----------------------
takeattendance.innerHTML = `
  <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
    <div class="title-name flex items-center h-full pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold max-sm:text-4xl">
      <h1>Attendance</h1>
    </div>
  </div>
  <div class="flex justify-center items-center m-6 max-sm:m-2">
    <div class="w-[80%] max-sm:w-[95%]">
      <div class="flex flex-wrap justify-center gap-6 p-6 w-full backdrop-blur-lg rounded-lg shadow-lg">
        <!-- Attendance Section -->
        <div class="flex-1 flex flex-col items-start text-[#e0e1dd]" id="attendance-section">
          <div class="header">
            <div class="controls">
              <div class="dropdown-container max-sm:text-2xl ">
                <button class="dropdown-button" id="classDropdown">
                  <span id="selectedClass">Select Class</span>
                  <i class="fa-solid fa-angle-down"></i>
                </button>
                <div class="dropdown-menu" id="classMenu"></div>
              </div>
              <div class="date-selector">
                <input type="date" class="date-picker" id="attendanceDate">
              </div>
            </div>
          </div>
          <div class="content w-full">
            <div class="search-bar">
              <input type="text" class="search-input max-sm:text-2xl" placeholder="Search students...">
            </div>
            <table class="attendance-table max-sm:text-2xl">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody class="text-[#0d1b2a]"></tbody>
            </table>
            <div class="action-buttons">
              <button class="action-button save-button">Save Attendance</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
<div id="toast-success" class="fixed bottom-5 right-5 hidden items-center w-full max-w-xs p-4 text-green-100 bg-green-800 rounded-lg shadow-lg" role="alert">
  <svg class="w-6 h-6 mr-2 text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  <span class="font-medium">Attendance registered successfully!</span>
</div>
`;

// ---------------------- Setup Class Dropdown ----------------------
async function loadClasses() {
    try {
      const res = await fetch('http://localhost:8000/api/class');
      const response = await res.json();
      const classes = response.data || [];
        
      // console.log(classes); // Debugging line to check the classes fetched
      const menu = document.getElementById('classMenu');
      menu.innerHTML = '';

      // console.log(menu); // Debugging line to check the dropdown menu element
  
      classes.forEach(cls => {
        const div = document.createElement('div');
        div.className = 'dropdown-item';
        div.setAttribute('data-value', cls._id);
        div.textContent = `${cls.className} - ${cls.subject}`;
        div.addEventListener('click', async () => {
          document.getElementById('selectedClass').textContent = div.textContent;
          document.getElementById('classDropdown').setAttribute('data-class-id', cls._id);
          document.getElementById('classDropdown').setAttribute('data-teacher-id', cls.teacher._id);
          await fetchAndRenderStudents(cls._id);
        });
        menu.appendChild(div);
        // console.log(div); // Debugging line to check the dropdown items
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load classes");
    }
  }
  
// ---------------------- Load Existing Attendance ----------------------
async function loadExistingAttendance(classId, date) {
  try {
    const res = await fetch(`http://localhost:8000/api/get-attendance-by-class?classId=${classId}&date=${date}`);
    const result = await res.json();
    return result.data || null;
  } catch (err) {
    console.error('Failed to load attendance history:', err);
    return null;
  }
}

// ---------------------- Fetch and Render Students ----------------------
async function fetchAndRenderStudents(classId) {
  const date = document.getElementById('attendanceDate').value;
  const tbody = document.querySelector('.attendance-table tbody');
  tbody.innerHTML = '<tr><td colspan="2">Loading...</td></tr>';

  try {
    const res = await fetch(`http://localhost:8000/api/class/${classId}`);
    const result = await res.json();
    const students = result.data.students;
    const teacherId = result.data.teacher._id;

    document.getElementById('classDropdown').setAttribute('data-class-id', classId);
    document.getElementById('classDropdown').setAttribute('data-teacher-id', teacherId);

    const existingAttendance = await loadExistingAttendance(classId, date);
    const attendanceMap = existingAttendance
      ? Object.fromEntries(
          existingAttendance.attendanceData.map(item => [item.studentId._id, item.status])
        )
      : {};

    tbody.innerHTML = '';
    students.forEach(s => {
      const status = attendanceMap[s._id] || 'Present';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${s.Firstname} ${s.Lastname}</td>
        <td>
          <div class="status-buttons" data-student-id="${s._id}">
            <button class="status-button present-button ${status === 'Present' ? 'active' : ''}">Present</button>
            <button class="status-button absent-button ${status === 'Absent' ? 'active' : ''}">Absent</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });

    setupStatusButtons();
    setupSearch();
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="2">Failed to load students</td></tr>';
    console.error(err);
  }
}

// ---------------------- Status Buttons ----------------------
function setupStatusButtons() {
  const statusButtons = document.querySelectorAll('.status-button');

  statusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const siblings = button.parentElement.querySelectorAll('.status-button');
      siblings.forEach(sib => sib.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

// ---------------------- Search ----------------------
function setupSearch() {
  const searchInput = document.querySelector('.search-input');
  const rows = document.querySelectorAll('.attendance-table tbody tr');

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    rows.forEach(row => {
      const name = row.querySelector('td').textContent.toLowerCase();
      row.style.display = name.includes(searchTerm) ? '' : 'none';
    });
  });
}

// ---------------------- Save Attendance ----------------------
document.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('save-button')) return;

  const classId = document.getElementById('classDropdown').getAttribute('data-class-id');
  const teacherId = document.getElementById('classDropdown').getAttribute('data-teacher-id');
  const date = document.getElementById('attendanceDate').value;

  const attendanceData = Array.from(document.querySelectorAll('.status-buttons')).map(btnGroup => {
    const studentId = btnGroup.dataset.studentId;
    const status = btnGroup.querySelector('.present-button').classList.contains('active') ? 'Present' : 'Absent';
    return { studentId, status };
  });

  const payload = { classId, teacherId, date, attendanceData };

  try {
    const res = await fetch('http://localhost:8000/api/attendance/take-attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    showSuccessToast();
  } catch (err) {
    alert("Failed to submit attendance");
    console.error(err);
  }
});

// ---------------------- Listen to Date Change ----------------------
document.getElementById('attendanceDate').addEventListener('change', () => {
  const classId = document.getElementById('classDropdown').getAttribute('data-class-id');
  if (classId) {
    fetchAndRenderStudents(classId);
  }
});

// ---------------------- Initialize ----------------------
document.addEventListener('DOMContentLoaded', () => {
  loadClasses();
});

const classDropdown = document.getElementById('classDropdown');
const classMenu = document.getElementById('classMenu');

classDropdown.addEventListener('click', () => {
  classMenu.classList.toggle('active');
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
    if (!classDropdown.contains(e.target) && !classMenu.contains(e.target)) {
      classMenu.classList.remove('active');
    }
  });

  classMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
      const selectedClass = e.target.textContent; // Get the text content of the clicked item
      document.getElementById('selectedClass').textContent = selectedClass; // Update the button text
      classMenu.classList.remove('active'); // Close the dropdown
    }
  });


  function showSuccessToast() {
    const toast = document.getElementById('toast-success');
    toast.classList.remove('hidden');
  
    // Hide it after 3 seconds
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }