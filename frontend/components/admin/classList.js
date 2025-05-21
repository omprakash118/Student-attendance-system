const classList = document.getElementById('class_List');

const originalClassList = `
    <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Class List</h1>
        </div>
    </div>
    <div class="flex justify-center items-start min-h-[100vh] h-auto m-6">
        <div class="w-[70%] max-sm:w-full max-sm:text-2xl mx-auto bg-gray-200 shadow-md rounded-lg p-6">
            <!-- Buttons and Search -->
            <div class="mb-4 flex items-center justify-between ">
                <button class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 max-sm:mb-3 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77] nav-link" data-target = "add_class" >Add Class</button>
                <input type="text" placeholder="Search..." class="classSearchSetup w-1/4 max-sm:w-[60%] max-sm:mb-3 rounded-md border p-2 pt-1.5 pb-1.5 pl-5 text-[1rem] max-sm:text-xl font-bold text-[#0d1b2a]" />
            </div>

            <!-- Table -->
            <table class="w-full border-collapse rounded-lg rounded-tr-full classTable  text-[#0d1b2a] text-lg max-sm:text-xl">
                <thead class="bg-[#415a77] text-white">
                    <tr>
                        <th class="p-3 text-left font-semibold">Class Name</th>
                        <th class="p-3 text-left font-semibold">SUBJECT COUNT</th>
                        <th class="p-3 text-left font-semibold">STUDENT COUNT</th>
                    </tr>
                </thead>
                <tbody id="classListOP">

                </tbody>
            </table>

            <!-- Pagination -->
            <div class="mt-4 flex items-center justify-between">
                <p class="text-[#8e9baa]" id="totalClasses"></p>
                <div class="flex space-x-2" id="paginationClasses">

                </div>
            </div>
        </div>
</div>


<div class=" toast-error fixed bottom-5 right-5 hidden items-center w-full max-w-xs p-4 text-red-100 bg-red-800 rounded-lg shadow-lg" role="alert">
  <svg class="w-6 h-6 mr-2 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  <span class="font-medium">Error to Load Class</span>
</div>
<div class=" toast-class-delete fixed bottom-5 right-5 hidden items-center w-full max-w-xs p-4 text-red-100 bg-red-800 rounded-lg shadow-lg" role="alert">
  <svg class="w-6 h-6 mr-2 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  <span class="font-medium">Class Deleted</span>
</div>

`;


classList.innerHTML = originalClassList;
// class="bg-gray-100 p-6"

let currentPageClasses = 1;
const itemsPerPageClasses = 5;
let allClasses = [];


async function fetchClasses(){
    try{

        const res = await fetch('http://localhost:8000/api/class/');

        const { data : classes } = await res.json();

        // const classes = data.data;
        allClasses = classes;
        // console.log("Classes :- ", allClasses);

        const length = classes.length;

        document.getElementById("totalClasses").innerHTML = `Total Classes : ${length}`

        renderClassList(currentPageClasses);
        renderPaginationClass();
        setupClassSearch();

    }catch(error){
        showClassError();
    }
}

fetchClasses();


async function showClassDetails(classId) {
    // console.log("Class clicked: ", classId);
    try {
      const res = await fetch(`http://localhost:8000/api/class/${classId}`);
      const data = await res.json();
      const classData = data.data;
  
      if (!classData) throw new Error("Class not found");

    
// Helper function inside showClassDetails
    async function renderSubjectsWithTeachers(subjects) {
    if (!subjects.length) {
      return '<p class="text-gray-500 ml-4">No subjects assigned</p>';
    }
  
    const teacherData = await Promise.all(subjects.map(async (sub) => {
      try {
        // console.log("sub.teacher :", sub.teacher)
        const res = await fetch(`http://localhost:8000/api/teacher/${sub.teacher._id}`);
        const data = await res.json();
        const teacher = data.data.teacher;
        console.log("teacher op :- ", teacher);
        return {
          subjectName: sub.subjectName,
          teacherId: sub.teacher._id,
          teacherName: teacher ? `${teacher.Firstname} ${teacher.Lastname}` : "Unknown"
        };
      } catch {
        return {
          subjectName: sub.subjectName,
          teacherId: sub.teacher,
          teacherName: "Unknown"
        };
      }
    }));
  
    return teacherData.map(item => `
      <li class="ml-4 list-disc mb-2">
        <div class="flex items-center justify-between">
          <span><strong>${item.subjectName}</strong> – ${item.teacherName}</span>
          <button onclick="showClassTeacherDetails('${item.teacherId}')" 
            class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 max-sm:mb-3 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">
            View Details
          </button>
        </div>
      </li>
    `).join('');
    }
  
  // Generate subjectsHTML using the helper
  let subjectsHTML = await renderSubjectsWithTeachers(classData.subjects);
  

      let studentsHTML = classData.students.length > 0
        ? classData.students.map(student => `
            <div class="flex justify-between items-center border-b py-2">
              <p>${student.Firstname} ${student.Lastname}</p>
              <button onclick="showClassStudentdetails('${student._id}')" 
                class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 max-sm:mb-3 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">
                View Details
              </button>
            </div>
          `).join('')
        : '<p class="text-gray-500 ml-4">No students enrolled</p>';
  
      const classHTML = `
        <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg">
          <div class="title-name flex items-center h-full pl-[5rem] text-3xl font-bold">
            <h1>Class Details</h1>
          </div>
        </div>
  
        <div class="p-6 text-[#1b263b]">
          <div class="bg-gray-100 rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-4">Class: ${classData.className}</h2>
  
            <div class="mb-6">
              <h3 class="text-xl font-semibold">Subjects:</h3>
              <ul>${subjectsHTML}</ul>
            </div>
  
            <div class="mb-6">
              <div class="flex justify-between items-center">
                <h3 class="text-xl font-semibold">Students:</h3>
                <div class="flex justify-end mb-2">
                  <button onclick="openAssignStudentModal('${classData._id}')" class="cursor-pointer rounded-md border-none bg-[#415a77] w-full px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">
                    + Assign Existing Student
                  </button>
                </div>
              </div>
              <div>${studentsHTML}</div>
            </div>
  
            <div class="flex justify-center gap-4 mt-6">
                <div class=" flex justify-center items-center gap-6">
                    <button onclick="loadclassList()" class="cursor-pointer rounded-md border-none bg-[#415a77] w-full px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Back</button>
                    <button onclick="deleteClassData('${classData._id}')" class="cursor-pointer rounded-md border-none bg-red-700 w-full px-4 py-2 text-red-100 transition duration-300 hover:bg-red-500 hover:text-red-50 active:scale-95 active:bg-red-900">Delete</button>
                </div>
            </div>
          </div>
        </div>

<div id="assignStudentModal" class="fixed inset-0 z-50 hidden bg-black bg-opacity-50 items-center justify-center">
  <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
    <h2 class="text-xl font-bold mb-4 text-center">Assign Student to Class</h2>

    <select id="studentSelect" class="w-full p-2 border border-gray-300 rounded mb-4">
      <option disabled selected value="">-- Select Student --</option>
      <!-- Students will be populated dynamically -->
    </select>

    <div class="flex justify-end gap-4">
      <button onclick="closeAssignStudentModal()" class="cursor-pointer rounded-md border-none bg-gray-600 w-full px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-gray-100 hover:text-gray-700 active:scale-95 active:bg-gray-500">Cancel</button>
      <button onclick="assignSelectedStudent()" class=" cursor-pointer rounded-md border-none bg-[#415a77] w-full px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Assign</button>
    </div>
  </div>
</div>

        
<div id="delete-class" class="fixed inset-0 bg-[#000000cf]  bg-opacity-50 hidden items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div class="px-6 py-4">
                <div class="flex justify-center mb-4">
                    <div class="bg-red-100 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
                <h3 class="text-lg font-medium text-gray-900 text-center mb-2">Delete Class</h3>
                <p class="text-gray-500 text-center">Are you sure you want to delete this Class? This action cannot be undone.</p>
            </div>
            <div class="bg-gray-50 px-6 py-4 flex justify-center gap-3 rounded-lg shadow-lg">
                <button id="cancel-delete-btnC" class="px-4 py-2 cursor-pointer border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                    Cancel
                </button>
                <button id="confirm-delete-btnC" class="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700">
                    Delete
                </button>
            </div>
        </div>
    </div>



  
        <!-- Success Toast -->
        <div class="toast-class-load fixed bottom-5 right-5 hidden items-center w-full max-w-xs p-4 text-green-100 bg-green-800 rounded-lg shadow-lg transition-all duration-300" role="alert">
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-green-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="ml-3 text-sm font-medium">Class details loaded successfully</div>
        </div>


        <!-- Class Student Details -->
        <div id="ClassStudentDetails" class="fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50 hidden"></div>
        
        <!-- Class Teacher Details -->
        <div id="ClassTeacherDetails" class="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-50 "></div>

      `;
  
      classList.innerHTML = classHTML;

      showClassLoad();
  
    } catch (error) {
      console.error("Error loading class details:", error);
      showClassError();
    }
  }

// This is call when we need to fetchClass again 
function loadclassList(){

    classList.innerHTML = originalClassList;

    fetchClasses();
}

function deleteClassData(classId){
    // console.log("Classdetails :- ", classId);

  const modalC = document.getElementById("delete-class");
  const cancelBtn = document.getElementById("cancel-delete-btnC");
  const confirmBtn = document.getElementById("confirm-delete-btnC");

  // Show the modal
  modalC.classList.remove("hidden");
  modalC.classList.add("flex");

  // Remove existing event listeners to avoid stacking
  const newCancelBtn = cancelBtn.cloneNode(true);
  const newConfirmBtn = confirmBtn.cloneNode(true);
  cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  document.body.style.overflow = "hidden";

  // console.log("newCanclBtn :- ", newCancelBtn);
  // console.log("newConfirmBtn :- ", newConfirmBtn);
  
  // Cancel button hides the modal
  newCancelBtn.addEventListener("click", () => {
    modalC.classList.add("hidden");
    modalC.classList.remove("flex");
    document.body.style.overflow = "";
  });

  // Confirm delete
  newConfirmBtn.addEventListener("click", async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/class/${classId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete student");

      modalC.classList.add("hidden");
      // alert("Teacher deleted successfully");
      modalC.classList.remove("flex");
      document.body.style.overflow = "";

      loadclassList(); // reload the CLass list
      showClassDelete(); 

      
    } catch (err) {
      console.error(err);

      alert("Error deleting teacher");
    }
  });
}



let selectedClassId = null;

function openAssignStudentModal(classId) {
  selectedClassId = classId;
  document.getElementById("assignStudentModal").classList.remove("hidden");
  document.getElementById("assignStudentModal").classList.add("flex");

  // Load unassigned students
  
  fetch('http://localhost:8000/api/student/getUnassignedStudents')  // You must create this route
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("studentSelect");
      select.innerHTML = `<option disabled selected value="">-- Select Student --</option>`;
      console.log("data :- ", data);
      data.forEach(student => {
        const option = document.createElement("option");
        option.value = student._id;
        option.textContent = `${student.Firstname} ${student.Lastname}`;
        select.appendChild(option);
      });
    })
    .catch(err => console.error('Error loading students:', err));
}

function closeAssignStudentModal() {
  const assignStudentModal = document.getElementById("assignStudentModal");
  assignStudentModal.classList.add("hidden");
  assignStudentModal.classList.remove("flex");
  selectedClassId = null;
}

function assignSelectedStudent() {
  const studentId = document.getElementById("studentSelect").value;
  if (!studentId || !selectedClassId) return alert("Please select a student.");

  console.log("Assigning student:", studentId);

  fetch('http://localhost:8000/api/class/add-student', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId, classId: selectedClassId })
  })
    .then(res => res.json())
    .then(data => {
      alert("✅ Student assigned successfully!");
      closeAssignStudentModal();
      // Optionally refresh the class view
    })
    .catch(err => console.error('Assign failed:', err));
}


async function addStudentToClass(studentId, classId) {
  try {
    const res = await fetch('/api/class/add-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, classId })
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ Student added to class successfully');
      // Optionally reload the class details here
      // loadClassDetails(classId);
    } else {
      alert(`❌ Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Failed to add student:", error);
  }
}



function showClassLoad(){
    const toast = document.querySelector('.toast-class-load');
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  // Hide it after 3 seconds
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3000);
}

function renderClassList(page){
    const classListOP = document.getElementById("classListOP");
    
    classListOP.innerHTML = "";

    const startClass = (page - 1) * itemsPerPageClasses;
    const endClass = startClass + itemsPerPageClasses;

    const pageClass = allClasses.slice(startClass, endClass);

    // console.log("PageCLass :- ", pageClass);
    pageClass.forEach(classp => {
    const card = `
      <tr id="${classp._id}" class="border-b border-[#415a77]  cursor-pointer hover:bg-gray-300 transition duration-200 active:scale-97" onclick="showClassDetails('${classp._id}')">
        <td class="p-3">${classp.className}</td>
        <td class="p-3">${classp.subjects.length}</td>
        <td class="p-3">${classp.students.length}</td>
      </tr>
    `;
    classListOP.innerHTML += card;
  });
}

function renderPaginationClass(){
    const pagination = document.getElementById("paginationClasses");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(allClasses.length / itemsPerPageClasses);


  // Previous Button
  const prevBtn = document.createElement("button");
  prevBtn.innerText = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.className = pageBtnStyleClass();
  prevBtn.onclick = () => {
    currentPage--;
    renderClassList(currentPage);
    renderPaginationClass();
  };
  pagination.appendChild(prevBtn);

  // Page Number Buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = pageBtnStyleClass(i === currentPage);
    btn.onclick = () => {
      currentPage = i;
      renderClassList(currentPage);
      renderPaginationClass();
    };
    pagination.appendChild(btn);
  }

  // Next Button
  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.className = pageBtnStyleClass();
  nextBtn.onclick = () => {
    currentPage++;
    renderStudentList(currentPage);
    renderPaginationClass();
  };
  pagination.appendChild(nextBtn);
}

function pageBtnStyleClass(active = false){
    return `
    px-3 py-1 rounded-md border border-[#415a77] text-sm font-medium transition-all duration-200 
    ${active ? 'bg-[#415a77] text-white' : 'bg-white text-[#415a77] hover:bg-gray-200'}
  `;
}

function setupClassSearch(){
    const searchInputCD = document.querySelector('.classSearchSetup');
    const rowsCD = document.querySelectorAll('.classTable tbody tr');
  
    searchInputCD.addEventListener('input', () => {
      const searchTermCD = searchInputCD.value.toLowerCase();
  
      rowsCD.forEach(row => {
        const name = row.querySelector('td').textContent.toLowerCase();
        row.style.display = name.includes(searchTermCD) ? '' : 'none';
      });
    });
}

function showClassDelete(){
    const toastDE = document.querySelector('.toast-class-delete');
    console.log("toastDE :- ", toastDE);
  toastDE.classList.remove('hidden');
  toastDE.classList.add('flex');
  // Hide it after 3 seconds
  setTimeout(() => {
    toastDE.classList.add('hidden');
    toastDE.classList.remove('flex');
  }, 3000);
}

async function showClassStudentdetails(studentId) {
    // console.log("button clicked :- ", studentId);
  
    try {
      const res = await fetch(`http://localhost:8000/api/student/${studentId}`);
      const { data: student } = await res.json();
      if (!student) throw new Error("Student not found");
  
      const ClassStudentDetails = document.getElementById("ClassStudentDetails");
  
      ClassStudentDetails.innerHTML = `
        <div class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-2xl scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <!-- Close Button -->
          <button onclick="classStudentDetailsRemove()"
            class="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-bold cursor-pointer"
          >&times;</button>
  
          <h2 class="text-2xl font-bold text-[#1b263b] mb-6 border-b pb-2">Student Information</h2>
  
          <form class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-base">
            ${renderInput("First Name", student.Firstname)}
            ${renderInput("Last Name", student.Lastname)}
            ${renderInput("Username", student.username)}
            ${renderInput("Email", student.email, "email")}
            ${renderInput("Mobile Phone", student.mobilePhone, "tel")}
            ${renderInput("Parents Phone", student.parentsPhone, "tel")}
  
            <div class="sm:col-span-2">
              <label class="block mb-1 font-semibold">Street Address</label>
              <input type="text" disabled value="${student.address?.street || ''}" class="w-full rounded border px-3 py-2 bg-gray-100 mb-2" />
              <input type="text" disabled value="${student.address?.addressLine2 || ''}" class="w-full rounded border px-3 py-2 bg-gray-100" />
            </div>
  
            ${renderInput("City", student.address?.city)}
            ${renderInput("State", student.address?.state)}
            ${renderInput("Zip Code", student.address?.zipCode)}
  
            <div class="sm:col-span-2">
              <label class="block mb-1 font-semibold">Bio Notes</label>
              <textarea disabled class="w-full rounded border px-3 py-2 bg-gray-100 resize-none" rows="3">${student.bioNotes || ''}</textarea>
            </div>
          </form>
        </div>
      `;
  
      ClassStudentDetails.classList.remove("hidden");
      ClassStudentDetails.classList.add("flex");
      document.body.style.overflow = "hidden";
  
      showStudentLoad(); // show a toast/loader
  
    } catch (err) {
      console.error("Error fetching student:", err);
      showStudentError(); // toast on failure
    }
  }
  
  // ✅ Helper to DRY up the repeated input blocks
function renderInput(label, value = "", type = "text") {
    return `
      <div>
        <label class="block mb-1 font-semibold">${label}</label>
        <input type="${type}" disabled value="${value}" class="w-full rounded border px-3 py-2 bg-gray-100" />
      </div>
    `;
}
  
  // ✅ Modal Close
function classStudentDetailsRemove() {
    const ClassStudentDetails = document.getElementById("ClassStudentDetails");
    ClassStudentDetails.classList.remove("flex");
    ClassStudentDetails.classList.add("hidden");
    document.body.style.overflow = "";
}
  

async function showClassTeacherDetails(teacherId) {
    // console.log("Fetching teacher details:", teacherId);
  
    try {
      const res = await fetch(`http://localhost:8000/api/teacher/${teacherId}`);
      const { data: teacher } = await res.json();
      if (!teacher) throw new Error("Teacher not found");

      const teacherData = teacher.teacher;
      const ClassTeacherDetails = document.getElementById("ClassTeacherDetails");
  
      ClassTeacherDetails.innerHTML = `
        <div class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-2xl scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <!-- Close Button -->
          <button onclick="classTeacherDetailsRemove()"
            class="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-bold cursor-pointer"
          >&times;</button>
  
          <h2 class="text-2xl font-bold text-[#1b263b] mb-6 border-b pb-2">Teacher Information</h2>
  
          <form class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-base">
            ${renderInput("First Name", teacherData.Firstname)}
            ${renderInput("Last Name", teacherData.Lastname)}
            ${renderInput("Username", teacherData.username)}
            ${renderInput("Email", teacherData.email, "email")}
            ${renderInput("Phone", teacherData.mobilePhone, "tel")}
            ${renderInput("Phone", teacherData.officePhone, "tel")}
            ${renderInput("Subject", teacherData.subjects)}

             <div class="sm:col-span-2">
              <label class="block mb-1 font-semibold">Street Address</label>
              <input type="text" disabled value="${teacherData.address?.street || ''}" class="w-full rounded border px-3 py-2 bg-gray-100 mb-2" />
              <input type="text" disabled value="${teacherData.address?.addressLine2 || ''}" class="w-full rounded border px-3 py-2 bg-gray-100" />
            </div>
  
            ${renderInput("City", teacherData.address?.city)}
            ${renderInput("State", teacherData.address?.state)}
            ${renderInput("Zip Code", teacherData.address?.zipCode)}
  
            <div class="sm:col-span-2">
              <label class="block mb-1 font-semibold">Bio</label>
              <textarea disabled class="w-full rounded border px-3 py-2 bg-gray-100 resize-none" rows="3">${teacherData.bioNotes || ''}</textarea>
            </div>
          </form>
        </div>
      `;
  

      ClassTeacherDetails.classList.remove("hidden");
      ClassTeacherDetails.classList.add("flex");
      document.body.style.overflow = "hidden";
  
      showTeacherLoad(); // optional loader/toast
    } catch (err) {
      console.error("Error fetching teacher:", err);
      showTeacherError(); // optional toast
    }
  }
  
  function classTeacherDetailsRemove() {
    const ClassTeacherDetails = document.getElementById("ClassTeacherDetails");
    ClassTeacherDetails.classList.remove("flex");
    ClassTeacherDetails.classList.add("hidden");
    document.body.style.overflow = "";
  }
  
  // Helper to render inputs (same as student modal)
