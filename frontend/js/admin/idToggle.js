const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");

  dropdownBtn.classList.add("bg-[#415a77]");
  dropdownBtn.classList.remove("bg-[#e0e1dd]");
  dropdownBtn.classList.remove("text-[#415a77]");
  dropdownBtn.classList.add("text-[#e0e1dd]");
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (
    !dropdownBtn.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.classList.add("hidden");
    dropdownBtn.classList.remove("bg-[#415a77]");
  dropdownBtn.classList.add("bg-[#e0e1dd]");
  dropdownBtn.classList.add("text-[#415a77]");
  dropdownBtn.classList.remove("text-[#e0e1dd]");
  }
});
