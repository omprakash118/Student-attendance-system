const myHeader = document.getElementById("teacher-header");

myHeader.innerHTML = `
    <div class="flex 2xl:ml-[5rem] max-sm:ml-[4rem]">
        <button id="sidebarToggle" class="cursor-pointer  bg-[#e0e1dd] hover:bg-[#415a77] text-[#415a77] hover:text-[#e0e1dd] p-1.5 pl-2.5 pr-2.5  rounded-[8px] w-[2.2rem] mr-5">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>

        <form action="#">
            <div class="border rounded-[8px] bg-[#e0e1dd] flex text-[#415a77]  border-none ">
              <input type="text" placeholder="search" class="pl-5 pt-1.5 pb-1.5 w-[14rem] hover:text-[#415a77] text-[#415a77] font-bold text-xl " >
              <span class = "flex justify-center items-center">
                <i class="fa-solid fa-magnifying-glass pr-2 cursor-pointer"></i>
              </span>
            </div>
        </form>
      </div>


<div class="relative mr-[4rem] max-sm:mr-[2rem] max-sm:ml-[2rem]">
    <button id="dropdownBtn" class="flex items-center px-4 py-2 bg-[#e0e1dd] hover:text-[#e0e1dd] active:bg-[#8e9baa] hover:bg-[#415a77] rounded-lg shadow-md  text-[#415a77] transition cursor-pointer">
        <i class="fa-regular fa-user  mr-2"></i>
        <span class="font-semibold ">josh</span>
        <i class="fa-solid fa-angle-left ml-2 transition-transform transform" id="arrowIcon"></i>
    </button>

    <div id="dropdownMenu" class=" w-60 bg-gray-200  shadow-md rounded-lg p-4 absolute right-0 mt-2 h-auto border border-[#415a77] hidden  transition-all duration-300 ease-in-out z-10  ">
      <div class="px-4 py-3  h-[7rem] text-center  text-2xl text-[#1b263b] border-b border-[#415a77]">
          <i class="fa-regular fa-user  text-3xl"></i>
          <p class="font-semibold mt-1">josh prajapat</p>
      </div>

      <ul class="mt-2 space-y-2 text-[#1b263b]">
        <li>
          <a href="#" class="block  p-3.5 text-xl  hover:bg-gray-300 rounded-md nav-link" data-target = "profile">Profile</a>
        </li>
        <li>
          <a href="#" class="block  p-3.5 text-xl  hover:bg-gray-300 rounded-md nav-link" data-target = "setting">Settings</a>
        </li>
        <li>
          <a href="#" class="block  p-3.5 text-xl text-red-600 hover:bg-gray-300 rounded-md">Log Out</a>
        </li>
      </ul>
    </div>
</div>

`;


const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const arrowIcon = document.getElementById("arrowIcon");
const navLinks = document.querySelectorAll(".nav-link");

dropdownBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event from bubbling up
  dropdownMenu.classList.toggle("hidden");

  // Toggle button colors
  dropdownBtn.classList.toggle("bg-[#415a77]");
  dropdownBtn.classList.toggle("bg-[#e0e1dd]");
  dropdownBtn.classList.toggle("text-[#415a77]");
  dropdownBtn.classList.toggle("text-[#e0e1dd]");

  arrowIcon.classList.toggle("-rotate-90");
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
    closeDropdown();
  }
});


navLinks.forEach(link => {
  link.addEventListener("click", () => {
      closeDropdown();
  });
});

function closeDropdown() {
  dropdownMenu.classList.add("hidden");

    // Reset button styles
    dropdownBtn.classList.remove("bg-[#415a77]");
    dropdownBtn.classList.add("bg-[#e0e1dd]");
    dropdownBtn.classList.add("text-[#415a77]");
    dropdownBtn.classList.remove("text-[#e0e1dd]");

    arrowIcon.classList.remove("-rotate-90");
}