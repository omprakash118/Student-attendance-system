const dashboard = document.getElementById("dashboard");


dashboard.innerHTML = `
  <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg">
    <div class="title-name flex items-center h-full pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold max-sm:text-4xl">
      <h1>Dashboard</h1>
    </div>
  </div>

  <div class="flex justify-center items-center m-6 max-sm:m-2">
    <div class="w-[80%] max-sm:w-[95%]">
      <div class="flex flex-col gap-6 p-6 w-full backdrop-blur-lg rounded-lg  shadow-lg bg-gray-200 ">
        <!-- Controls -->
        <div class="flex flex-wrap justify-evenly items-center gap-4 w-[80%]  p-6  ">
          <div class=" text-[#e0e1dd]  p-4 rounded-lg w-[30%] shadow-lg bg-[#415a77]" style="width: 40%;">
            <label for="classSelect" class="block mb-2 font-semibold">Select Class:</label>
            <select id="classSelect" class="  w-full border border-gray-800 rounded px-3 py-2 text-[#1b263b] cursor-pointer">
              <option value="">-- Select --</option>
            </select>
          </div>

          <div class=" text-[#e0e1dd] p-4 rounded-lg shadow-lg w-[30%] bg-[#415a77]" style="width: 40%;">
            <label for="dateInput" class="block mb-2 font-semibold">Select Date:</label>
            <input type="date" id="dateInput" class="w-full border border-gray-800 rounded px-3 py-2 cursor-pointer">
          </div>
        </div>

        <!-- Chart -->
        <div class="w-full mt-6">
          <canvas id="attendanceChart" class="w-full h-[300px]  "></canvas>
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


