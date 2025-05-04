const TeacherList = document.getElementById("Teacher_list");

// TeacherList.innerHTML = 

const originalTeacherList = `
    <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg text-[#0d1b2a] ">
      <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
          <h1>Teacher List</h1>
      </div>
    </div>
    <div class="flex justify-center items-start min-h-[100vh] h-auto  m-6 text-lg max-sm:text-xl">
      <div class="w-full max-w-4xl rounded-lg bg-gray-200 p-6 shadow-md ">
        <div class="mb-4 flex items-center justify-between">
          <input type="text" placeholder="Search..." class="teacherSearchSetup w-1/4 rounded-md border p-2 pt-1.5 pb-1.5 pl-5 text-[1rem] font-bold text-[#0d1b2a]" />
        </div>
    <table class="teacherTable w-full border-collapse  rounded-[8px] text-[#0d1b2a] text-lg max-sm:text-xl">
    <thead class="bg-[#415a77] text-white">
      <tr>
        <th class="p-3 text-left">FIRST</th>
        <th class="p-3 text-left">LAST</th>
        <th class="p-3 text-left">EMAIL</th>
        <th class="p-3 text-left">MOBILE PHONE</th>
      </tr>
    </thead>
    <tbody id="teacherList" >
    
    </tbody>
  </table>
  <div class="mt-4 flex items-center justify-between">
    <p class="text-[#8e9baa]" id="totalTeacher"></p>
    <div class="flex space-x-2" id="pagination">
      
    </div>
  </div>
  </div>
</div>


<div class=" toast-error fixed bottom-5 right-5 hidden items-center w-full max-w-xs p-4 text-red-100 bg-red-800 rounded-lg shadow-lg" role="alert">
  <svg class="w-6 h-6 mr-2 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  <span class="font-medium">Error to Load student</span>
</div>



`;

TeacherList.innerHTML = originalTeacherList;

// const teacherList = document.getElementById("teacherList");

let currentPage = 1;
const itemsPerPage = 10;
let allTeachers = [];


async function fetchTeachers() {
  try{

    const res = await fetch('http://localhost:8000/api/teacher'); // Replace with your endpoint
    const { data: teachers } = await res.json();

    allTeachers = teachers; 

    const length = teachers.length;
    
    document.getElementById("totalTeacher").innerHTML = `Total Teachers: ${length}`; // Display the total number of teachers
 
    renderTeacherList(currentPage);
    renderPagination();
    setupTeacherSearch();
  

  }catch(err){
    // console.error("Error fetching teachers:", err);
    showTeacherError();
    // alert("Error fetching teachers. Please try again later.");
  }
}

async function showTeacherdetails(teacherId){ 
  
  try{
    const res = await fetch(`http://localhost:8000/api/teacher/${teacherId}`);
    const data = await res.json();

    const teacher = data.data.teacher;
    if (!teacher) throw new Error("Teacher not found");
    
  const detailHTML = `
  <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
      <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
          <h1>Teacher Details</h1>
      </div>
  </div>
  <div class="flex justify-center items-center min-h-[100vh] max-sm:ml-2 max-sm:mr-2  h-auto m-6 text-lg text-[#1b263b]">
    <div class="h-auto  w-[70%] max-sm:w-full ">
      <div class="max-w-8xl flex h-auto w-full flex-wrap justify-between gap-6  p-6  backdrop-blur-lg">
        <div class="w-full max-w-4xl rounded-lg bg-gray-200  p-6 shadow-md  ">
          <h2 class="p-4  rounded-lg  text-lg max-sm:text-2xl font-semibold bg-[#415a77] text-[#e0e1dd]">Your Information</h2>
          <div class="w-full max-w-3xl rounded-b-lg bg-gray-200 pt-6 pb-6 text-xl max-sm:text-2xl">
          <form class="space-y-4">
          <div>
              <label class="mb-2 block text-gray-700" for="name">Name</label>
              <div class="flex space-x-2 max-sm:flex-col max-sm:gap-4">
                  <input type="text" id="firstNameD" placeholder="josh" class="flex-1 max-sm:flex-col rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77]  focus:outline-none" / disabled value = '${teacher.Firstname}'>
                  <input type="text" id="lastNameD" placeholder="prajapat" class="flex-1 max-sm:flex-col rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled  value = '${teacher.Lastname}'>
              </div>
          </div>

          <div>
              <label class="mb-2 block   text-gray-700" for="groupName">userName</label>
              <input type="text" id="usernameD" value='${teacher.username}' class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
          </div>

          <div>
            <label class="mb-2 block  text-gray-700" for="email">Email</label>
            <input type="email" id="emailD" value='${teacher.email}' placeholder="josprajapat@gmail.com" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
          </div>
          <div>
            <label class="mb-2 block   text-gray-700" for="mobilePhone">Mobile Phone</label>
            <input type="tel" id="mobilePhoneD" value='${teacher.mobilePhone}' class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
          </div>

          <div>
             <label class="mb-2 block   text-gray-700" for="officePhone">Office Phone</label>
             <input type="tel" id="officePhoneD" value='${teacher.officePhone}' class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
          </div>
          <div>
              <label class="mb-2 block   text-gray-700">Address</label>
              <input id="streetD" type="text" value='${teacher.address?.street}' placeholder="Street" class="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
              <input id="addressLine2D" type="text" value='${teacher.address?.addressLine2}' placeholder="addressLine2" class="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
              <div class="flex max-sm:flex-col max-sm:gap-2.5 space-x-2">
                  <input type="text" value='${teacher.address?.city}' placeholder="City" id="cityD" class="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
                  <div class = " w-full flex justify-center gap-2">
                      <input type="text" value='${teacher.address?.state}' placeholder="State" id="stateD" class="focus:ring-[#415a77]focus:outline-none w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none" / disabled>
                      <input type="text" value='${teacher.address?.zipCode}' placeholder="Zip Code" id="zipCodeD" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
                  </div>
              </div>
          </div>

          <div>
             <label class="mb-2 block   text-gray-700" for="bioNotes">BioNotes</label>
             <input type="tel" value='${teacher.bioNotes}' id="bioNotesD" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
          </div>
      </form>
  </div>
  <div class=" flex justify-center items-center gap-6">
  <button onclick="loadteacherList()" class="cursor-pointer rounded-md border-none bg-[#415a77] w-full px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Back</button>
   </div>
  </div>
  </div>
  </div>

  </div>

  <div class="toast-load fixed bottom-5 right-5 hidden items-center w-full max-w-xs p-4 text-green-100 bg-green-800 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-green-700">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div class="ml-3 text-sm font-medium">Teacher details loaded successfully</div>
  </div>

  `;

  TeacherList.innerHTML = detailHTML;

  showTeacherLoad();

  }catch(err){
    // alert("Error loading teacher details");

    showTeacherError();
//     console.error(error);
  }
}

function loadteacherList(){

  TeacherList.innerHTML = originalTeacherList;
  
  currentPage = 1;

  fetchTeachers();
}



fetchTeachers();

function showTeacherError() {
  const toast = document.getElementById('toast-error');
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  // Hide it after 3 seconds
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3000);
}

function showTeacherLoad() {
  const toast = document.querySelector('.toast-load');
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  // Hide it after 3 seconds
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3000);
}

 
function renderTeacherList(page) {
  const teacherList = document.getElementById("teacherList");
  teacherList.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const pageTeachers = allTeachers.slice(start, end);

  pageTeachers.forEach(teacher => {
    const row = `
      <tr id="${teacher._id}" class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300 transition duration-200 active:scale-97" onclick="showTeacherdetails('${teacher._id}')">
        <td class="p-3">${teacher.Firstname}</td>
        <td class="p-3">${teacher.Lastname}</td>
        <td class="p-3">${teacher.email}</td>
        <td class="p-3">${teacher.mobilePhone}</td>
      </tr>
    `;
    teacherList.innerHTML += row;
  });
}


function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(allTeachers.length / itemsPerPage);

  // Previous Button
  const prevBtn = document.createElement("button");
  prevBtn.innerText = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.className = pageBtnStyle();
  prevBtn.onclick = () => {
    currentPage--;
    renderTeacherList(currentPage);
    renderPagination();
  };
  pagination.appendChild(prevBtn);

  // Page Number Buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = pageBtnStyle(i === currentPage);
    btn.onclick = () => {
      currentPage = i;
      renderTeacherList(currentPage);
      renderPagination();
    };
    pagination.appendChild(btn);
  }

  // Next Button
  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.className = pageBtnStyle();
  nextBtn.onclick = () => {
    currentPage++;
    renderTeacherList(currentPage);
    renderPagination();
  };
  pagination.appendChild(nextBtn);
}


function pageBtnStyle(active = false) {
  return `
    px-3 py-1 rounded-md border border-[#415a77] text-sm font-medium transition-all duration-200 
    ${active ? 'bg-[#415a77] text-white' : 'bg-white text-[#415a77] hover:bg-gray-200'}
  `;
}


function setupTeacherSearch() {
  const searchInputTD = document.querySelector('.teacherSearchSetup');
  const rowsTD = document.querySelectorAll('.teacherTable tbody tr');

  searchInputTD.addEventListener('input', () => {
    const searchTermTD = searchInputTD.value.toLowerCase();

    rowsTD.forEach(row => {
      const name = row.querySelector('td').textContent.toLowerCase();
      row.style.display = name.includes(searchTermTD) ? '' : 'none';
    });
  });
}