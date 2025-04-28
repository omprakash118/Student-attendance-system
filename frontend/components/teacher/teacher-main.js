const mainContent = document.getElementById("teacher-main");

mainContent.innerHTML = `
    <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] text-3xl font-bold  ">
            <h1>Dashboard</h1>
        </div>
    </div>
    

`;



// <div class="flex justify-center items-center h-auto m-6">
//     <div class="w-[80%] min-h-0 h-auto">
    
//         <div class="flex flex-wrap justify-between gap-6 p-6 h-auto max-w-8xl w-full backdrop-blur-lg rounded-lg shadow-lg">

//             <!-- Calendar Section -->
//             <div class="p-4 max-w-md h-auto flex flex-col bg-[#0d1b2a] text-[#e0e1dd] rounded-2xl shadow-2xl flex-1">
//                 <div class="flex justify-between items-center mb-4 p-4 rounded-2xl bg-[#415a77]">
//                     <h2 id="currentMonth" class="text-2xl font-bold"></h2>
//                     <div>
//                         <button id="todayDate" class="p-2 bg-[#0d1b2a] w-[5rem] text-[1rem] font-bold hover:bg-[#e0e1dd] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0d1b2a] shadow-black rounded">Today</button>
//                         <button id="prevMonth" class="p-2 bg-[#0d1b2a] w-[3rem] text-[1rem] font-bold hover:bg-[#e0e1dd] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0d1b2a] shadow-black rounded">
//                             <i class="fa-solid fa-caret-left"></i>
//                         </button>
//                         <button id="nextMonth" class="p-2 bg-[#0d1b2a] w-[3rem] text-[1rem] font-bold hover:bg-[#e0e1dd] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0d1b2a] shadow-black rounded">
//                             <i class="fa-solid fa-caret-right"></i>
//                         </button>
//                     </div>
//                 </div>
//                 <div class="rounded-2xl bg-[#415a77] p-3">
//                     <div class="grid grid-cols-7 gap-4 text-center text-[#e0e1dd]">
//                         <div class="font-bold p-3">Sun</div>
//                         <div class="font-bold p-3">Mon</div>
//                         <div class="font-bold p-3">Tue</div>
//                         <div class="font-bold p-3">Wed</div>
//                         <div class="font-bold p-3">Thu</div>
//                         <div class="font-bold p-3">Fri</div>
//                         <div class="font-bold p-3">Sat</div>
//                     </div>
//                     <div id="calendarDays" class="grid grid-cols-7 gap-1"></div>
//                 </div>
//             </div>

//             <!-- Attendance Section -->
//             <div class="flex-1 flex items-start justify-center text-[#e0e1dd]">
//                 <div class="bg-[#0d1b2a] p-6 rounded-lg shadow-lg w-full max-w-lg">
                    
//                     <!-- Title & Dropdown -->
//                     <div class="flex items-center space-x-2 mb-4">
//                         <div class="relative w-full flex gap-5 text-xl">
//                             <span> Attendance For </span>
                            
//                             <!-- Dropdown Button -->
//                             <div class="bg-gray-800 text-white flex justify-between w-60 items-center border-2 border-gray-800 rounded-md px-4 py-3 cursor-pointer transition duration-300 hover:bg-gray-700 focus:ring-2 focus:ring-blue-400 outline-none" id="dropdownButton-class1" onclick="toggle('1')">
//                                 <span id="selectedOption1">Select Class</span>
//                                 <div class="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white text-2xl transform transition-transform duration-300" id="caret1"></div>
//                             </div>

//                             <!-- Dropdown Menu -->
//                             <ul class="absolute w-full text-2xl bg-gray-800 border border-gray-700 shadow-lg rounded-2xl mt-15 text-gray-300 opacity-0 hidden transition-opacity duration-200 z-10" id="dropdownMenu-class1">
//                                 <li class="px-4 py-2 hover:bg-gray-700 cursor-pointer">Math</li>
//                                 <li class="px-4 py-2 hover:bg-gray-700 cursor-pointer">English</li>
//                                 <li class="px-4 py-2 hover:bg-gray-700 cursor-pointer">Computer</li>
//                                 <li class="px-4 py-2 hover:bg-gray-700 cursor-pointer">Science</li>
//                             </ul>

//                             <div class="bg-gray-800 text-white flex justify-between w-60 items-center border-2 border-gray-800 rounded-md px-4 py-3 cursor-pointer transition duration-300 hover:bg-gray-700 focus:ring-2 focus:ring-blue-400 outline-none" id="dropdownButton-class2" onclick="toggle('2')">
//                                 <span id="selectedOption2">Mark All</span>
//                                 <div class="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white text-2xl transform transition-transform duration-300" id="caret2"></div>
//                             </div>

//                             <!-- Dropdown Menu -->
//                             <ul class="absolute w-1/2 left-1/2 bg-gray-800 border border-gray-700 shadow-lg rounded-md mt-15 text-gray-300 opacity-0 hidden transition-opacity duration-200 z-10" id="dropdownMenu-class2">
//                                 <li class="px-4 py-2 hover:bg-gray-700 cursor-pointer text-end">Present</li>
//                                 <li class="px-4 py-2 hover:bg-gray-700 cursor-pointer text-end">Absent</li>
//                             </ul>
//                         </div>
//                     </div>

//                     <!-- Table -->
//                     <table class="w-full border-collapse border-[#0d1b2a] shadow-lg rounded-2xl table-auto">
//                         <thead class="bg-[#415a77] text-[#e0e1dd]">
//                             <tr>
//                                 <th class="w-1/3 px-6 py-3 text-left">Big Column</th>
//                                 <th class="px-4 py-3 text-left">Column 2</th>
//                                 <th class="px-4 py-3 text-left">Column 3</th>
//                             </tr>
//                         </thead>
//                         <tbody class="font-bold">
//                             <tr class="border-b border-[#415a77] shadow-lg shadow-black">
//                                 <td class="px-6 py-3">Om</td>
//                                 <td class="px-4 py-3"><button class="rounded border cursor-pointer active:bg-green-400 transition duration-300 active:scale-95 border-green-600 text-green-500 hover:bg-[#00800080] px-4 py-2 hover:text-[#e0e1dd] attend">Present</button></td>
//                                 <td class="px-4 py-3"><button class="rounded border cursor-pointer active:bg-red-400 transition duration-300 active:scale-95 border-red-600 hover:bg-[#ff000080] hover:text-white px-4 py-2 text-red-500 attend">Absent</button></td>
//                             </tr>
//                             <tr class="border-b border-[#415a77] shadow-lg shadow-black">
//                                 <td class="px-6 py-3">Narayan</td>
//                                 <td class="px-4 py-3"><button class="rounded border cursor-pointer active:bg-green-400 transition duration-300 active:scale-95 border-green-600 text-green-500 hover:bg-[#00800080] px-4 py-2 hover:text-[#e0e1dd] attend">Present</button></td>
//                                 <td class="px-4 py-3"><button class="rounded border cursor-pointer active:bg-red-400 transition duration-300 active:scale-95 border-red-600 hover:bg-[#ff000080] hover:text-white px-4 py-2 text-red-500 attend">Absent</button></td>
//                             </tr>
//                             <tr class="border-b border-[#415a77] shadow-lg shadow-black">
//                                 <td class="px-6 py-3">sadie sink</td>
//                                 <td class="px-4 py-3"><button class="rounded border cursor-pointer active:bg-green-400 transition duration-300 active:scale-95 border-green-600 text-green-500 hover:bg-[#00800080] px-4 py-2 hover:text-[#e0e1dd] attend">Present</button></td>
//                                 <td class="px-4 py-3"><button class="rounded border cursor-pointer active:bg-red-400 transition duration-300 active:scale-95 border-red-600 hover:bg-[#ff000080] hover:text-white px-4 py-2 text-red-500 attend">Absent</button></td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     <!-- Save & Delete Buttons -->
//                     <div class="save-delete flex justify-between m-5 mb-0">
//                         <button class="attend cursor-pointer rounded border border-red-600 px-4 py-2 text-red-500 transition duration-300 hover:bg-[#ff000080] hover:text-white active:scale-95 active:bg-red-400">Delete</button>
//                         <button class="attend cursor-pointer rounded border border-green-600 px-4 py-2 text-green-500 transition duration-300 hover:bg-[#00800080] hover:text-[#e0e1dd] active:scale-95 active:bg-green-400">Save</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </div>
