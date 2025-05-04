const dashboard = document.getElementById("dashboard");


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

classSelect.addEventListener("change", renderChart);
dateInput.addEventListener("change", renderChart);

// // Initialize
loadClasses();



// // Event listeners
classSelect.addEventListener("change", renderChart);
dateInput.addEventListener("change", renderChart);

// // Initialize
loadClasses();


