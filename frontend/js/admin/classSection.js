
function toggle(id) {
  document.querySelectorAll("ul[id^='dropdownMenu-class']").forEach((menu) => {
    if (menu.id !== `dropdownMenu-class${id}`) {
      menu.classList.add("hidden", "opacity-0");
      const dropdownId = menu.id.replace("dropdownMenu-class", "");
      document.getElementById(`caret${dropdownId}`).classList.remove("rotate-180");
    }
  });

  const dropdownMenu = document.getElementById(`dropdownMenu-class${id}`);
  const caret = document.getElementById(`caret${id}`);
  
  // Toggle visibility
  dropdownMenu.classList.toggle("hidden");
  dropdownMenu.classList.toggle("opacity-0");
  caret.classList.toggle("rotate-180");
}



document.querySelectorAll("ul[id^='dropdownMenu-class'] li").forEach((item) => {
  item.addEventListener("click", function () {
    const dropdownId = this.closest("ul").id.replace("dropdownMenu-class", "");
    const selectedOption = document.getElementById(`selectedOption${dropdownId}`);
    const dropdownMenu = document.getElementById(`dropdownMenu-class${dropdownId}`);
    const caret = document.getElementById(`caret${dropdownId}`);
    
    selectedOption.innerText = this.innerText;
    dropdownMenu.classList.add("hidden", "opacity-0");
    caret.classList.remove("rotate-180");

   if (dropdownId === "2") {
    const action = this.innerText.trim(); // "Present" or "Absent"

    // Reset all buttons to default
    document.querySelectorAll(".attend").forEach((button) => {
      button.classList.remove("bg-green-500", "text-white", "bg-red-500");
    });

    // Apply styles to only the selected type
    document.querySelectorAll(".attend").forEach((button) => {
      if (button.textContent.trim() === action) {
        button.classList.add(action === "Present" ? "bg-green-500" : "bg-red-500");
        button.classList.add("text-white");
      }
    });
  }
  });
});

// Close dropdown if clicked outside
document.addEventListener("click", (event) => {
  document.querySelectorAll("ul[id^='dropdownMenu-class']").forEach((menu) => {
    if (!menu.closest(".relative").contains(event.target)) {
      menu.classList.add("hidden", "opacity-0");
      const dropdownId = menu.id.replace("dropdownMenu-class", "");
      document.getElementById(`caret${dropdownId}`).classList.remove("rotate-180");
    }
  });
});

document.querySelectorAll(".attend").forEach((button) => {
  button.addEventListener("click", function () {
    const isPresent = this.textContent.trim() === "Present";

    // Reset both Present & Absent buttons in the row
    const row = this.closest("tr");

    
    row.querySelectorAll(".attend").forEach((btn) => {
      btn.classList.remove("bg-green-500", "bg-red-500", "text-white");
    });    
    

    // Toggle the clicked button
    this.classList.toggle(isPresent ? "bg-green-500" : "bg-red-500");
    this.classList.toggle("text-white");


  });
});

