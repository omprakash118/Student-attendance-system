const classAdd = document.getElementById("add_class");
getUnassignedStudents();

let students = [];         // For storing all unassigned Student
let teachers = [];         // For storing all teachers data 
let matchingTeachers = []; // For storing all matchingTeachers who teaches particular subject
let subjectName ;          // For storing subject name 


// This is to render Form 
function renderForm(){
    classAdd.innerHTML = `
    <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg">
      <div class="title-name flex items-center h-full pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold">
        <h1>Add New Class</h1>
      </div>
    </div>
    
    
    <div class="flex justify-center h-auto  m-6 max-sm:mx-2">
      <div class="max-w-4xl w-4/5 max-sm:w-[95%] bg-gray-200 shadow-md rounded-lg p-6">
        <h2 class="p-4 rounded-lg text-lg max-sm:text-2xl font-semibold bg-[#415a77] text-gray-200">CLASS DETAILS</h2>
    
        <form id="classForm" class="mt-10 ml-4 mr-4 text-xl max-sm:text-2xl">
          <div class="grid grid-cols-4 max-sm:grid-cols-2 gap-4 items-center">
            <label class="text-gray-700 font-medium flex items-center col-span-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Class Name
            </label>
            <div class="col-span-3 max-sm:col-span-1">
              <input type="text" id="className" class="border border-gray-300 rounded-lg px-4 py-3 w-full focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200" placeholder="Enter class name" required>
            </div>
            
            <label class="text-gray-700 font-medium flex items-center mt-[-2rem] col-span-1">
              <i class="fa-solid fa-book-open mr-2"></i>
              Subjects
            </label>
            <div class="col-span-3 max-sm:col-span-1" id="subjectsContainer">
              <div class="flex gap-3 mb-3 items-center">
                <div class="w-1/2">
                  <input type="text" placeholder="Subject Name" class="subjectName border border-gray-300 rounded-lg px-4 py-3 w-full focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200" onchange="handleSubjectInput(this)">
                </div>
                <div class="w-1/2">
                  <select class="teacherSelect border border-gray-300 rounded-lg px-4 py-3 w-full focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200">
                    <option value="">Select Teacher</option>
                    
                  </select>
                </div>
              </div>
              <button type="button" id="addSubjectBtn" class="text-sm cursor-pointer font-medium text-blue-700 hover:text-blue-900 flex items-center transition-colors duration-200">
                <i class="fa-solid fa-plus mr-2"></i>
                Add another subject
              </button>
            </div>
    
    
            <label class="text-gray-700 font-medium">
            <i class="fa-solid fa-user-plus mr-2"></i>
            Add Students</label>
            <div class="w-xs m-5 col-span-3">
                <select id="studentSelect" multiple style="width: 100%;">
                     ${students.map(s => `<option value="${s._id}">${s.Firstname} ${s.Lastname}</option>`).join('')}
                </select>
            </div>
    
          <div class="mt-6 flex justify-end col-span-4">
            <button  type="submit" class="  save-class cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Save </button>
          </div>
        </form>
      </div>
    </div>

    <div id="toast-class-success" class="fixed bottom-5 right-5 hidden items-center w-full max-w-xs p-4 text-green-100 bg-green-800 rounded-lg shadow-lg" role="alert">
  <svg class="w-6 h-6 mr-2 text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  <span class="font-medium">Student registered successfully!</span>
</div>
    `;


    $(document).ready(function() {
        $('#studentSelect').select2({
          placeholder: 'Select students',
          width: 'resolve' // Makes it follow the select element's width
        });
      });

// This is to set more subjects
      document.getElementById("addSubjectBtn").addEventListener("click", () => {
        const container = document.getElementById("subjectsContainer");
      
        const subjectBlock = document.createElement("div");
        subjectBlock.className = "flex gap-3 mb-3 items-center";
      
        subjectBlock.innerHTML = `
          <div class="w-1/2">
            <input type="text" placeholder="Subject Name"
              class="subjectName border border-gray-300 rounded-lg px-4 py-3 w-full focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
              onchange="handleSubjectInput(this)">
          </div>
          <div class="w-1/2">
            <select class="teacherSelect border border-gray-300 rounded-lg px-4 py-3 w-full focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200">
              <option value="">Select Teacher</option>
            </select>
          </div>
        `;
      
        container.insertBefore(subjectBlock, document.getElementById("addSubjectBtn"));
      });
      
}



// This is to get all unassigned Student 
async function getUnassignedStudents(){
    try {
        
        const res = await fetch('http://localhost:8000/api/student/getUnassignedStudents');
        students = await res.json();

        renderForm();
        
    } catch (error) {
        console.log("Error :- ", error);       
    }
}

// This is to get all teachers data
async function getTeacher(){
    try {
        
        const res = await fetch('http://localhost:8000/api/teacher');

        const { data: teachersData } = await res.json();

        console.log("Teachers:- ", teachersData);

        teachers = teachersData;

    } catch (error) {
        console.log("Error", error);
    }
}

// This is to get a teacher who teaches the particular subject
function handleSubjectInput(inputElement){
    subjectName = inputElement.value.trim().toLowerCase();
    const teacherSelect = inputElement.parentElement.nextElementSibling.querySelector(".teacherSelect");


     matchingTeachers = teachers.filter(t =>
        t.subjects.toLowerCase() === subjectName
    );

    if (matchingTeachers.length === 0) {
      teacherSelect.innerHTML = `<option>No teacher found</option>`;
      return;
    }

    teacherSelect.innerHTML =  matchingTeachers.map(t => `<option value="${t._id}">${t.Firstname} ${t.Lastname}</option>`).join('');
}


document.addEventListener('click' , async (e) =>{
  if(!e.target.classList.contains('save-class')) return;

  // console.log('Button clicked');
  e.preventDefault();

  const className = document.getElementById('className').value;                            // Class name 

  const subjectSelectElements = document.querySelectorAll('.subjectName');                 // subject Name
  const classSubjectValues = Array.from(subjectSelectElements).map(select => select.value);

  const teacherSelectElements = document.querySelectorAll('.teacherSelect');               // Teacher Select
  const classTeacherValues = Array.from(teacherSelectElements).map(select => select.value); 
  
  const subjects = classSubjectValues.map((subjectName, index) => ({                        // Combination of subject and teacher
    subjectName,
    teacher: classTeacherValues[index]
  }));
  

  const studentSelect = document.getElementById("studentSelect");                           // Student list
  const selectedStudents = Array.from(studentSelect.selectedOptions).map(option => option.value);
                   

  if(!className || !subjects  || !selectedStudents){
    alert("All field required");
    return;
  }

  const payload = {
    className : className,
    subjects : subjects,
    students : selectedStudents
  }

  try {
    
    const res = await fetch('http://localhost:8000/api/class/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error("Server error: " + errorText);
    }



    const result = await res.json();
    // console.log("result :- ", result);

    document.getElementById("classForm").reset();

    showSuccessToastClass();
    
    res.status(201).json({ message: 'Class created and students assigned', result });
  } catch (error) {
      console.log("Error :- ", error);
  }

});

getTeacher();
getUnassignedStudents();

function showSuccessToastClass() {
  const toast = document.getElementById('toast-class-success');
  toast.classList.remove('hidden');

  // Hide it after 3 seconds
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}
