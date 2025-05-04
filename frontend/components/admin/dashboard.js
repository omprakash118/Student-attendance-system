const dashboard = document.getElementById("dashboard");


// dashboard.innerHTML = `
//   <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg">
//     <div class="title-name flex items-center h-full pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold max-sm:text-4xl">
//       <h1>Dashboard</h1>
//     </div>
//   </div>

//   <div class="flex justify-center items-center m-6 max-sm:m-2">
//     <div class="w-[80%] max-sm:w-[95%]">
//       <div class="flex flex-col gap-6 p-6 w-full backdrop-blur-lg rounded-lg  shadow-lg bg-gray-200 ">
//         <!-- Controls -->
//         <div class="flex flex-wrap justify-evenly items-center gap-4 w-[80%]  p-6  ">
//           <div class=" text-[#e0e1dd]  p-4 rounded-lg w-[30%] shadow-lg bg-[#415a77]" style="width: 40%;">
//             <label for="classSelect" class="block mb-2 font-semibold">Select Class:</label>
//             <select id="classSelect" class="  w-full border border-gray-800 rounded px-3 py-2 text-[#1b263b] cursor-pointer">
//               <option value="">-- Select --</option>
//             </select>
//           </div>

//           <div class=" text-[#e0e1dd] p-4 rounded-lg shadow-lg w-[30%] bg-[#415a77]" style="width: 40%;">
//             <label for="dateInput" class="block mb-2 font-semibold">Select Date:</label>
//             <input type="date" id="dateInput" class="w-full border border-gray-800 rounded px-3 py-2 cursor-pointer">
//           </div>
//         </div>

//         <!-- Chart -->
//         <div class="w-full mt-6">
//           <canvas id="attendanceChart" class="w-full h-[300px]  "></canvas>
//         </div>
//       </div>
//     </div>
//   </div>
               
// `;

// dashboard.innerHTML = `
//   <div class="titel h-20 bg-gradient-to-r from-[#1b263b] to-[#415a77] shadow-xl">
//     <div class="title-name flex items-center h-full pl-20 max-sm:pl-6 text-3xl font-bold max-sm:text-2xl text-white">
//       <svg class="w-8 h-8 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
//       </svg>
//       <h1>Dashboard</h1>
//     </div>
//   </div>

//   <div class="flex justify-center items-center m-8 max-sm:m-4">
//     <div class="w-full max-w-5xl">
//       <div class="flex flex-col gap-8 p-8 max-sm:p-4 w-full backdrop-blur-lg rounded-xl shadow-xl bg-white/90">
//         <!-- Controls -->
//         <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//           <div class="bg-gradient-to-br from-[#415a77] to-[#1b263b] p-6 rounded-lg shadow-lg text-white">
//             <label for="classSelect" class="block mb-3 font-semibold text-lg">Select Class:</label>
//             <select id="classSelect" class="w-full border-0 rounded-md px-4 py-3 text-gray-800 font-medium cursor-pointer focus:ring focus:ring-blue-300 transition duration-200">
//               <option value="">-- Select --</option>
//             </select>
//           </div>

//           <div class="bg-gradient-to-br from-[#415a77] to-[#1b263b] p-6 rounded-lg shadow-lg text-white">
//             <label for="dateInput" class="block mb-3 font-semibold text-lg">Select Date:</label>
//             <input type="date" id="dateInput" class="w-full border-0 rounded-md px-4 py-3 text-gray-800 font-medium cursor-pointer focus:ring focus:ring-blue-300 transition duration-200">
//           </div>
//         </div>

//         <!-- Chart -->
//         <div class="w-full mt-4 bg-gray-50 p-6 rounded-xl shadow-lg">
//           <h2 class="text-xl font-bold text-gray-700 mb-4">Attendance Overview</h2>
//           <div class="relative">
//             <canvas id="attendanceChart" class="w-full h-80"></canvas>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// `;



dashboard.innerHTML = `
    <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg">
    <div class="title-name flex items-center h-full pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold max-sm:text-4xl">
      <h1>Dashboard</h1>
    </div>
  </div>

  <div class="flex justify-center items-center m-8 max-sm:m-4">
    <div class="w-full max-w-5xl">
      <div class="flex flex-col gap-8 p-8 max-sm:p-4 w-full backdrop-blur-lg rounded-xl shadow-xl bg-white/90">
        <!-- Controls -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div class="bg-gradient-to-br from-[#415a77] to-[#1b263b] p-6 rounded-lg shadow-lg text-white">
            <label for="classSelect" class="block mb-3 font-semibold text-lg">Select Class:</label>
            <select id="classSelect" class="w-full border-0 rounded-md  px-4 py-3 text-[#e0e1dd] font-medium cursor-pointer focus:ring focus:ring-blue-300 transition duration-200">
              <option class="text-black" value="">-- Select --</option>
            </select>
          </div>

          <div class="bg-gradient-to-br from-[#415a77] to-[#1b263b] p-6 rounded-lg shadow-lg text-white">
            <label for="dateInput" class="block mb-3 font-semibold text-lg">Select Date:</label>
            <input type="date" id="dateInput" class="w-full border-0 rounded-md px-4 py-3 text-[#e0e1dd] font-medium cursor-pointer focus:ring focus:ring-blue-300 transition duration-200">
          </div>
        </div>

        <!-- Chart -->
        <div class="w-full mt-4 bg-gray-50 p-6 rounded-xl shadow-lg">
          <h2 class="text-xl font-bold text-gray-700 mb-4">Attendance Overview</h2>
          <div class="relative">
            <canvas id="attendanceChart" class="w-full h-80"></canvas>
          </div>
        </div>

        <!-- Attendance Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-blue-50 p-6 rounded-xl shadow-lg text-center border-t-4 border-blue-500">
            <h3 class="text-lg font-semibold text-blue-800 mb-1">Total Students</h3>
            <p class="text-3xl font-bold text-blue-900" id="totalStudentsIn">0</p>
          </div>
          
          <div class="bg-green-50 p-6 rounded-xl shadow-lg text-center border-t-4 border-green-500">
            <h3 class="text-lg font-semibold text-green-800 mb-1">Present</h3>
            <p class="text-3xl font-bold text-green-900" id="presentStudentsIn">0</p>
          </div>
          
          <div class="bg-red-50 p-6 rounded-xl shadow-lg text-center border-t-4 border-red-500">
            <h3 class="text-lg font-semibold text-red-800 mb-1">Absent</h3>
            <p class="text-3xl font-bold text-red-900" id="absentStudentsIn">0</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const classSelect = document.getElementById("classSelect");
const dateInput = document.getElementById("dateInput");
let chartInstance = null;

// Load classes into dropdown
async function loadClasses() {
  try {
    const res = await fetch("http://localhost:8000/api/class");
    const result = await res.json();

    result.data.forEach((cls) => {
      const option = document.createElement("option");
      option.value = cls._id;
      option.textContent = cls.className;
      option.classList = "text-black";
      classSelect.appendChild(option);

      // console.log(cls._id, cls.className);
      // console.log("Class loaded:", cls);
    });
  } catch (err) {
    console.error("Error loading classes:", err);
  }
}


// Render the attendance chart
async function renderChart() {
  const classId = classSelect.value;
  const date = dateInput.value;
  if (!classId || !date) return;
  console.log("Class ID:", classId);
  console.log("Date:", date);

  try {
    const res = await fetch(
      `http://localhost:8000/api/attendance/get-attendance-by-class?classId=${classId}&date=${date}`
    );

    const result = await res.json();

    console.log("Attendance data:", result.data);

    const attendanceData = result.data?.attendanceData || [];

    const present = attendanceData.filter((a) => a.status === "Present").length;
    const absent = attendanceData.filter((a) => a.status === "Absent").length;

    console.log("Present:", present);
    console.log("Absent:", absent);
    const data = {
      labels: ["Present", "Absent"],
      datasets: [
        {
          label: ["Present", "Absent"],
          data: [present, absent],
          backgroundColor: ["#10b981", "#ef4444"],
        },
      ],
    };

    const config = {
      type: "bar",
      data: {
        labels: ["Attendance"], // Single group/category label
        datasets: [
          {
            label: "Present",
            data: [present],
            backgroundColor: "#10b981",
          },
          {
            label: "Absent",
            data: [absent],
            backgroundColor: "#ef4444",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Bar Chart - Present vs Absent",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Destroy old chart if exists
    if (chartInstance) chartInstance.destroy();
    const ctx = document.getElementById("attendanceChart").getContext("2d");
    chartInstance = new Chart(ctx, config);
  } catch (err) {
    console.error("Error fetching attendance:", err);
  }
}


//   const classDropdown = document.getElementById('classDropdown');
//   const classId = classDropdown.getAttribute('data-class-id');
//   const dateInput = document.getElementById('dateInput'); // Make sure this exists
//   const date = dateInput?.value;

//   if (!classId || !date) {
//     console.warn("Missing class ID or date");
//     return;
//   }

//   console.log("Class ID:", classId);
//   console.log("Date:", date);

//   try {
//     const res = await fetch(
//       `http://localhost:8000/api/attendance/get-attendance-by-class?classId=${classId}&date=${date}`
//     );

//     const result = await res.json();
//     const attendanceData = result.data?.attendanceData || [];

//     const present = attendanceData.filter(a => a.status === "Present").length;
//     const absent = attendanceData.filter(a => a.status === "Absent").length;

//     const config = {
//       type: "bar",
//       data: {
//         labels: ["Attendance"],
//         datasets: [
//           {
//             label: "Present",
//             data: [present],
//             backgroundColor: "#10b981",
//           },
//           {
//             label: "Absent",
//             data: [absent],
//             backgroundColor: "#ef4444",
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           title: {
//             display: true,
//             text: "Bar Chart - Present vs Absent",
//           },
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     };

//     // Destroy old chart if exists
//     if (chartInstance) chartInstance.destroy();
//     const ctx = document.getElementById("attendanceChart").getContext("2d");
//     chartInstance = new Chart(ctx, config);
//   } catch (err) {
//     console.error("Error fetching attendance:", err);
//     alert("Failed to load attendance data");
//   }
// }


// // Event listeners
classSelect.addEventListener("change", renderChart);
dateInput.addEventListener("change", renderChart);

// // Initialize
loadClasses();


