const mainContent = document.getElementById("student-main");

mainContent.innerHTML = `
    <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] text-3xl font-bold  ">
            <h1>Attendance</h1>
        </div>
    </div>
    <div class="flex justify-center items-center h-auto m-6">
    <div class="w-[80%] min-h-0 h-auto">
    
        <div class="flex flex-wrap justify-between gap-6 p-6 h-auto max-w-8xl w-full backdrop-blur-lg rounded-lg shadow-lg">

            <!-- Calendar Section -->
            <div class="p-4 max-w-md h-auto flex flex-col bg-[#0d1b2a] text-[#e0e1dd] rounded-2xl shadow-2xl flex-1">
                <div class="flex justify-between items-center mb-4 p-4 rounded-2xl bg-[#415a77]">
                    <h2 id="currentMonth" class="text-2xl font-bold"></h2>
                    <div>
                        <button id="todayDate" class="p-2 bg-[#0d1b2a] w-[5rem] text-[1rem] font-bold hover:bg-[#e0e1dd] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0d1b2a] shadow-black rounded">Today</button>
                        <button id="prevMonth" class="p-2 bg-[#0d1b2a] w-[3rem] text-[1rem] font-bold hover:bg-[#e0e1dd] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0d1b2a] shadow-black rounded">
                            <i class="fa-solid fa-caret-left"></i>
                        </button>
                        <button id="nextMonth" class="p-2 bg-[#0d1b2a] w-[3rem] text-[1rem] font-bold hover:bg-[#e0e1dd] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0d1b2a] shadow-black rounded">
                            <i class="fa-solid fa-caret-right"></i>
                        </button>
                    </div>
                </div>
                <div class="rounded-2xl bg-[#415a77] p-3">
                    <div class="grid grid-cols-7 gap-4 text-center text-[#e0e1dd]">
                        <div class="font-bold p-3">Sun</div>
                        <div class="font-bold p-3">Mon</div>
                        <div class="font-bold p-3">Tue</div>
                        <div class="font-bold p-3">Wed</div>
                        <div class="font-bold p-3">Thu</div>
                        <div class="font-bold p-3">Fri</div>
                        <div class="font-bold p-3">Sat</div>
                    </div>
                    <div id="calendarDays" class="grid grid-cols-7 gap-1"></div>
                </div>
            </div>

            <!-- Attendance Section -->
            
        </div>
    </div>
</div>


`;
