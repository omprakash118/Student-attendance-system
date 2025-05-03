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
          <div class="space-x-2">
            <button id="addTeacherBTN" class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77] nav-link" data-target = "add_Teacher">Add Teacher</button>
          </div>
          <input type="text" placeholder="Search..." class="w-1/4 rounded-md border p-2 pt-1.5 pb-1.5 pl-5 text-[1rem] font-bold text-[#0d1b2a]" />
        </div>
    <table class="w-full border-collapse  rounded-[8px] text-[#0d1b2a] text-lg max-sm:text-xl">
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
    <div class="flex space-x-2">
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-300  transition duration-300 active:scale-95 ">«</button>
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-300 transition duration-300 active:scale-95 ">‹</button>
      <button class="rounded-md  cursor-pointer bg-[#778da9] px-3 py-1 text-white">1</button>
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-300 transition duration-300 active:scale-95 ">›</button>
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-300 transition duration-300 active:scale-95 ">»</button>
    </div>
  </div>
  </div>
</div>





`;

TeacherList.innerHTML = originalTeacherList;

// const teacherList = document.getElementById("teacherList");

async function fetchTeachers() {
  try{

    const res = await fetch('http://localhost:8000/api/teacher'); // Replace with your endpoint
    const { data: teachers } = await res.json();

    console.log(teachers); // Debugging line to check the teachers fetched

    const teacherList = document.getElementById("teacherList");

    const length = teachers.length;

    const totalTeacher = document.getElementById("totalTeacher");
    totalTeacher.innerHTML = `Total Teachers: ${length}`; // Display the total number of teachers
    console.log(length); // Debugging line to check the length of teachers
    
    teachers.forEach(teacher => {
      const card = `
        <tr id="${teacher._id}" class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300 transition duration-200 active:scale-97"  onclick="showTeacherdetails('${teacher._id}')">
          <td class="p-3">${teacher.Firstname}</td> 
          <td class="p-3">${teacher.Lastname}</td>
          <td class="p-3">${teacher.email}</td>
          <td class="p-3">${teacher.mobilePhone}</td>
        </tr>
      `;

      teacherList.innerHTML += card;
    });

  }catch(err){
    console.error("Error fetching teachers:", err);
    alert("Error fetching teachers. Please try again later.");
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
             <label class="mb-2 block   text-gray-700" for="bioNotes">classAssigned</label>
             <input type="tel" value='${teacher.bioNotes}' id="bioNotesD" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
          </div>
      </form>
  </div>
  <button onclick="loadteacherList()" class="cursor-pointer rounded-md border-none bg-[#415a77] w-full px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Back</button>
  </div>
</div>
</div>

</div>

  `;

  TeacherList.innerHTML = detailHTML;


  }catch(err){
    alert("Error loading teacher details");
//     console.error(error);
  }
}

function loadteacherList(){

  TeacherList.innerHTML = originalTeacherList;
  
  fetchTeachers();
}


// document.addEventListener("click", async (e) => {
//   const row = e.target.closest("tr"); // find closest tr
//   if (!row || !row.id) return; // ignore clicks outside table rows

//   const teacherId = row.id;

//   try {
//     const res = await fetch(`http://localhost:8000/api/teacher/${teacherId}`);
//     const data = await res.json();

//     const teacher = data.data.teacher;

//     console.log(teacher);
//     if (!teacher) throw new Error("Teacher not found");

//     document.getElementById("firstNameD").value = teacher.Firstname || "";
//     document.getElementById("lastNameD").value = teacher.Lastname || "";
//     document.getElementById("usernameD").value = teacher.username || "";
//     document.getElementById("emailD").value = teacher.email || "";
//     document.getElementById("mobilePhoneD").value = teacher.mobilePhone || "";
//     document.getElementById("officePhoneD").value = teacher.officePhone || "";
//     document.getElementById("streetD").value = teacher.address?.street || "";
//     document.getElementById("addressLine2D").value = teacher.address?.addressLine2 || "";
//     document.getElementById("cityD").value = teacher.address?.city || "";
//     document.getElementById("stateD").value = teacher.address?.state || "";
//     document.getElementById("zipCodeD").value = teacher.address?.zipCode || "";
//     document.getElementById("bioNotesD").value = teacher.bioNotes || "";


//     // Show modal


//   } catch (error) {
//     alert("Error loading teacher details");
//     console.error(error);
//   }
// });


fetchTeachers();

// const detailHTML = `
// <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
//     <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
//         <h1>Teacher Details</h1>
//     </div>
// </div>
// <div class="flex justify-center items-center min-h-[100vh] max-sm:ml-2 max-sm:mr-2  h-auto m-6 text-lg text-[#1b263b]">
//   <div class="h-auto  w-[60%] max-sm:w-full ">
//     <div class="max-w-8xl flex h-auto w-full flex-wrap justify-between gap-6  p-6  backdrop-blur-lg">
//       <div class="w-full max-w-4xl rounded-lg bg-gray-200  p-6 shadow-md  ">
//         <h2 class="p-4  rounded-lg  text-lg max-sm:text-2xl font-semibold bg-[#415a77] text-[#e0e1dd]">Your Information</h2>
//         <div class="w-full max-w-3xl rounded-b-lg bg-gray-200 pt-6 pb-6 text-xl max-sm:text-2xl">
//         <form class="space-y-4">
//         <div>
//             <label class="mb-2 block text-gray-700" for="name">Name</label>
//             <div class="flex space-x-2 max-sm:flex-col max-sm:gap-4">
//                 <input type="text" id="firstNameD" placeholder="josh" class="flex-1 max-sm:flex-col rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//                 <input type="text" id="lastNameD" placeholder="prajapat" class="flex-1 max-sm:flex-col rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//             </div>
//         </div>

//         <div>
//             <label class="mb-2 block   text-gray-700" for="groupName">userName</label>
//             <input type="text" id="usernameD" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//         </div>

//         <div>
//           <label class="mb-2 block  text-gray-700" for="email">Email</label>
//           <input type="email" id="emailD" placeholder="josprajapat@gmail.com" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//         </div>

//         <div>
//           <label class="mb-2 block   text-gray-700" for="mobilePhone">Mobile Phone</label>
//           <input type="tel" id="mobilePhoneD" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//         </div>

//         <div>
//            <label class="mb-2 block   text-gray-700" for="officePhone">Office Phone</label>
//            <input type="tel" id="officePhoneD" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//         </div>
//         <div>
//             <label class="mb-2 block   text-gray-700">Address</label>
//             <input id="streetD" type="text" placeholder="Street" class="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//             <input id="addressLine2D" type="text" placeholder="addressLine2" class="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//             <div class="flex max-sm:flex-col max-sm:gap-2.5 space-x-2">
//                 <input type="text" placeholder="City" id="cityD" class="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//                 <div class = " w-full flex justify-center gap-2">
//                     <input type="text" placeholder="State" id="stateD" class="focus:ring-[#415a77]focus:outline-none w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none" / disabled>
//                     <input type="text" placeholder="Zip Code" id="zipCodeD" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//                 </div>
//             </div>
//         </div>

//         <div>
//            <label class="mb-2 block   text-gray-700" for="bioNotes">classAssigned</label>
//            <input type="tel" id="bioNotesD" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
//         </div>
//     </form>
// </div>
// </div>
// </div>
// </div>
// <button onclick="loadteacherList()" class="cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Back</button>

// </div>

// `;
