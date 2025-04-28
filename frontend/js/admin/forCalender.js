const currentMonthElem = document.getElementById("currentMonth");
const calendarDaysElem = document.getElementById("calendarDays");
let currentDate = new Date();

function renderCalendar() {
    calendarDaysElem.innerHTML = "";
    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );
    const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    );
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const today = new Date();

    currentMonthElem.textContent = firstDayOfMonth.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarDaysElem.innerHTML += `<div></div>`; // Empty slots
      }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const isToday =
            today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();
            calendarDaysElem.innerHTML += `<div class="p-[25px] font-bold text-[20px]  text-center flex items-center justify-center   ${
            isToday ? "bg-[#0d1b2a] text-[#e0e1dd]" : "text-[#e0e1dd]"
        }">${day}</div>`;
    }
}

document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
