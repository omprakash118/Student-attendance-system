const takeattendance = document.getElementById('take-attendance');

takeattendance.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
    <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold max-sm:text-4xl ">
        <h1>Attendance</h1>
    </div>
</div>
<div class="flex justify-center items-center h-auto m-6 max-sm:m-2">
<div class="w-[80%] min-h-0 h-auto max-sm:w-[95%]">

    <div class="flex flex-wrap flex-row  justify-center gap-6 p-6 h-auto max-w-8xl w-full backdrop-blur-lg rounded-lg shadow-lg">

        <!-- Calendar Section -->
        <div class="p-4 max-w-md h-fit flex flex-col  bg-[#0d1b2a] text-[#e0e1dd] rounded-2xl shadow-2xl flex-1" id = "calender">
            <div class="flex justify-between items-center max-sm:flex-col mb-4 p-4 rounded-2xl bg-[#415a77]">
                <h2 id="currentMonth" class="text-2xl font-bold max-sm:text-[2rem]"></h2>
                <div class= " flex max-sm:flex max-sm:justify-between max-sm:w-full max-sm:mt-5">
                    <button id="todayDate" class="p-2 mr-2 bg-[#0d1b2a] w-[5rem] max-sm:w-auto max-sm:pr-3 max-sm:pl-3 text-[1rem] max-sm:text-[2rem] font-bold hover:bg-[#e0e1dd] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0d1b2a] shadow-black rounded">Today</button>
                    <div class= ""> 
                        <button id="prevMonth" class="p-2 bg-[#0d1b2a] w-[3rem] max-sm:w-[4rem] text-[1rem] max-sm:text-[2rem] font-bold hover:bg-[#e0e1dd] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0d1b2a] shadow-black rounded">
                            <i class="fa-solid fa-caret-left"></i>
                        </button>
                        <button id="nextMonth" class="p-2 bg-[#0d1b2a] w-[3rem] max-sm:w-[4rem] text-[1rem] max-sm:text-[2rem] font-bold hover:bg-[#e0e1dd] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0d1b2a] shadow-black rounded">
                            <i class="fa-solid fa-caret-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="rounded-2xl bg-[#415a77] p-3 max-sm:text-xl">
                <div class="grid grid-cols-7 gap-4 text-center text-[#e0e1dd]">
                    <div class="font-bold p-3 max-sm:">Sun</div>
                    <div class="font-bold p-3 max-sm:">Mon</div>
                    <div class="font-bold p-3 max-sm:">Tue</div>
                    <div class="font-bold p-3 max-sm:">Wed</div>
                    <div class="font-bold p-3 max-sm:">Thu</div>
                    <div class="font-bold p-3 max-sm:">Fri</div>
                    <div class="font-bold p-3 max-sm:">Sat</div>
                </div>
                <div id="calendarDays" class="grid grid-cols-7 gap-1"></div>
            </div>
        </div>

        <!-- Attendance Section -->
        <div class="flex-1 flex items-start justify-center text-[#e0e1dd]" id = "attendance-section">
            <div class="attendance-container">
        <div class="header">
            <div class="controls">
                <div class="dropdown-container max-sm:text-2xl">
                    <button class="dropdown-button " id="classDropdown">
                        <span id="selectedClass">Select Class</span>
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="dropdown-menu" id="classMenu">
                        <div class="dropdown-item" data-value="math">Mathematics</div>
                        <div class="dropdown-item" data-value="english">English</div>
                        <div class="dropdown-item" data-value="computer">Computer Science</div>
                        <div class="dropdown-item" data-value="science">Science</div>
                        <div class="dropdown-item" data-value="history">History</div>
                    </div>
                </div>
                
                <div class="date-selector">
                    <input type="date" class="date-picker" id="attendanceDate" value="2025-03-21">
                </div>
                
                <div class="dropdown-container max-sm:text-2xl">
                    <button class="dropdown-button" id="bulkActionDropdown">
                        <span id="selectedAction">Bulk Action</span>
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="dropdown-menu" id="bulkActionMenu">
                        <div class="dropdown-item" data-value="present">Mark All Present</div>
                        <div class="dropdown-item" data-value="absent">Mark All Absent</div>
                        <div class="dropdown-item" data-value="late">Remove All Mark</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="content">
            <div class="search-bar">
                <input type="text" class="search-input max-sm:text-2xl" placeholder="Search students...">
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                

            </div>
            
            <table class="attendance-table max-sm:text-2xl">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Aisha Johnson</td>
                        <td>
                            <div class="status-buttons">
                                <button class="status-button present-button active">Present</button>
                                <button class="status-button absent-button">Absent</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Benjamin Cooper</td>
                        <td>
                            <div class="status-buttons">
                                <button class="status-button present-button">Present</button>
                                <button class="status-button absent-button active">Absent</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Chen Wei</td>
                        <td>
                            <div class="status-buttons">
                                <button class="status-button present-button">Present</button>
                                <button class="status-button absent-button">Absent</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Denise Williams</td>
                        <td>
                            <div class="status-buttons">
                                <button class="status-button present-button active">Present</button>
                                <button class="status-button absent-button">Absent</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Elijah Robinson</td>
                        <td>
                            <div class="status-buttons">
                                <button class="status-button present-button active">Present</button>
                                <button class="status-button absent-button">Absent</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            
                    <div class="action-buttons">
                        <button class="action-button delete-button">Delete Record</button>
                        <button class="action-button save-button">Save Attendance</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


`;


// document.getElementById('sidebarToggle').addEventListener('click', function () {
//     let sidebar = document.getElementById('admin-sidebar');
//     sidebar.classList.toggle('show');
// });


      
        function setupDropdowns() {
            const classDropdown = document.getElementById('classDropdown');
            const classMenu = document.getElementById('classMenu');
            const bulkActionDropdown = document.getElementById('bulkActionDropdown');
            const bulkActionMenu = document.getElementById('bulkActionMenu');
            
            const toggleDropdown = (button, menu) => {
                menu.classList.toggle('active');
                
                // Close other dropdowns
                if (menu !== classMenu) classMenu.classList.remove('active');
                if (menu !== bulkActionMenu) bulkActionMenu.classList.remove('active');
            };
            
            classDropdown.addEventListener('click', () => toggleDropdown(classDropdown, classMenu));
            bulkActionDropdown.addEventListener('click', () => toggleDropdown(bulkActionDropdown, bulkActionMenu));
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.dropdown-container')) {
                    classMenu.classList.remove('active');
                    bulkActionMenu.classList.remove('active');
                }
            });
            
            // Handle dropdown item selection
            const classItems = classMenu.querySelectorAll('.dropdown-item');
            const bulkActionItems = bulkActionMenu.querySelectorAll('.dropdown-item');
            
            classItems.forEach(item => {
                item.addEventListener('click', () => {
                    document.getElementById('selectedClass').textContent = item.textContent;
                    classMenu.classList.remove('active');
                });
            });
            
            bulkActionItems.forEach(item => {
                item.addEventListener('click', () => {
                    document.getElementById('selectedAction').textContent = item.textContent;
                    bulkActionMenu.classList.remove('active');
                    
                    // Apply bulk action to all students
                    const action = item.dataset.value;
                    const rows = document.querySelectorAll('.attendance-table tbody tr');
                    
                    rows.forEach(row => {
                        const buttons = row.querySelectorAll('.status-button');
                        buttons.forEach(button => button.classList.remove('active'));
                        
                        if (action === 'present') {
                            row.querySelector('.present-button').classList.add('active');
                        } else if (action === 'absent') {
                            row.querySelector('.absent-button').classList.add('active');
                        } 
                        // else if (action === 'late') {
                        //     row.querySelector('.late-button').classList.add('active');
                        // }
                    });
                });
            });
        }
        
        // Handle status button toggling
        function setupStatusButtons() {
            const statusButtons = document.querySelectorAll('.status-button');
            
            statusButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from siblings
                    const siblings = button.parentElement.querySelectorAll('.status-button');
                    siblings.forEach(sibling => sibling.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                });
            });
        }
        
        // Search functionality
        function setupSearch() {
            const searchInput = document.querySelector('.search-bar .search-input');
            const rows = document.querySelectorAll('.attendance-table tbody tr');
            
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                
                rows.forEach(row => {
                    const studentName = row.querySelector('td').textContent.toLowerCase();
                    if (studentName.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        }
        
        // Initialize all components
        document.addEventListener('DOMContentLoaded', () => {
            setupDropdowns();
            setupStatusButtons();
            setupSearch();
        });
    