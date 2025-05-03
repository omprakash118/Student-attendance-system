const studentList = document.getElementById("student_list");

studentList.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Student List</h1>
        </div>
    </div>
<div class="flex justify-center items-start min-h-screen box-border h-auto m-6  text-lg max-sm:text-xl">
      <div class="w-full max-w-4xl rounded-lg bg-gray-200 p-6 shadow-md ">
        <div class="mb-4 flex items-center justify-between">
          <div class="space-x-2">
            <button class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77] nav-link" data-target = "add_Student">Add Student</button>
           </div>
          <input type="text" placeholder="Search..." class="w-1/4 rounded-md border p-2 pt-1.5 pb-1.5 pl-5 text-[1rem] font-bold text-[#0d1b2a]" />
        </div>
    <table class="w-full border-collapse  rounded-[8px] text-[#0d1b2a] text-lg max-sm:text-xl">
    <thead class="bg-[#415a77] text-white">
      <tr>
        <th class="p-3 text-left">FIRST</th>
        <th class="p-3 text-left">LAST</th>
        <th class="p-3 text-left">EMAIL</th>
        <th class="p-3 text-left">CLASS</th>
      </tr>
    </thead>
    <tbody id="studentListOP">
      
    </tbody>
  </table>
  <div class="mt-4 flex items-center justify-between">
    <p class="text-[#8e9baa]" id="totalStudents"></p>
    <div class="flex space-x-2">
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-200 transition duration-300 active:scale-95 ">«</button>
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-200 transition duration-300 active:scale-95 ">‹</button>
      <button class="rounded-md  cursor-pointer bg-[#778da9] px-3 py-1 text-white">1</button>
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-200 transition duration-300 active:scale-95 ">›</button>
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-200 transition duration-300 active:scale-95 ">»</button>
    </div>
  </div>
  </div>
</div>

`;

//  class="bg-gray-100 flex items-center justify-center min-h-screen"


const studentListOP = document.getElementById("studentListOP");

async function fetchStudents() {
  try { 
    const res = await fetch('http://localhost:8000/api/student'); // Replace with your endpoint
    const { data: students } = await res.json();

    const length = students.length;

    const totalStudents = document.getElementById("totalStudents");
    totalStudents.innerHTML = `Total Students: ${length}`; // Display the total number of students

    students.forEach(student => {
      const card = `
        <tr class="border-b border-[#415a77]  cursor-pointer hover:bg-gray-300 transition duration-200 active:scale-97">
          <td class="p-3">${student.Firstname}</td>
          <td class="p-3">${student.Lastname}</td>
          <td class="p-3">${student.email}</td>
          <td class="p-3">${student.mobilePhone}</td>
        </tr>
      `;
      studentListOP.innerHTML += card;
    });

  }
  catch (err) {
    console.error("Error fetching students:", err);
    alert("Error fetching students. Please try again later.");
  }
}

fetchStudents();