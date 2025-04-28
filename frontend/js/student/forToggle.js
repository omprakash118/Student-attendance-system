// document.querySelectorAll(".dropdownBtn").forEach((button) => {
//   button.addEventListener("click", () => {
//     // Find the associated dropdown menu
//     const dropdownMenu = button.nextElementSibling;

//     const dropdownContainer = button.closest(".dropdownContainer");
//     // Toggle the visibility of the clicked dropdown
//     dropdownMenu.classList.toggle("hidden");

//     dropdownContainer.classList.add("bg-[#1b263b]"); // Active state
//     dropdownContainer.classList.remove("bg-transparent"); // Default
//     const icon = button.querySelector(".left-arrow");
//     icon.classList.toggle("-rotate-90");

//     // Close other open dropdowns
//     document.querySelectorAll(".dropdownMenu").forEach((menu) => {
//       if (menu !== dropdownMenu) {
//         menu.classList.add("hidden");
//       }
//     });

//     document.querySelectorAll(".dropdownContainer").forEach((me) => {
//       if (me !== dropdownContainer) {
//         me.classList.remove("bg-[#1b263b]");
//         me.classList.add("bg-transparent");
//       }
//     });
//   });
// });

// Close dropdown when clicking outside
// document.addEventListener("click", (event) => {
//   if (!event.target.closest(".dropdownContainer")) {
//     document.querySelectorAll(".dropdownMenu").forEach((menu) => {
//       menu.classList.add("hidden");
//       menu.classList.remove("bg-[#1b263b]");
//       menu.classList.add("bg-transparent");
//     });
//   }
// });

// This is for hiding and enabling aside navbar

document.getElementById("sidebarToggle").addEventListener("click", () => {
  // document.getElementById('admin-sidebar').classList.toggle('-translate-x-full');
  // document.getElementById('admin-sidebar').classList.toggle('hidden');

  const sidebar = document.getElementById("student-sidebar");
  const screenWidth = window.innerWidth;
  const notice12 = document.getElementById("notice12");
  if (screenWidth > 640) {
    if (sidebar.classList.contains("w-80")) {
      sidebar.classList.toggle("w-80");
      sidebar.classList.toggle("w-20");

      document.querySelectorAll(".btnHidden").forEach((btn) => {
        const icons = btn.previousElementSibling;
        const parent = btn.parentElement;
        const logoName = document.querySelector(".logoName");
        const logoParent = logoName.parentElement;
        document.querySelectorAll(".labeled").forEach((labe) => {
          labe.classList.add("hidden");
        });
        logoName.classList.add("hidden");
        logoParent.classList.remove("border-b", "rounded-2xl", "p-3");
        icons.classList.toggle("hidden");
        btn.classList.toggle("hidden");
        parent.classList.toggle("pl-7");
      });
    } else if (sidebar.classList.contains("w-20")) {
      sidebar.classList.toggle("w-80");
      sidebar.classList.toggle("w-20");

      document.querySelectorAll(".btnHidden").forEach((btn) => {
        const icons = btn.previousElementSibling;
        const parent = btn.parentElement;
        const logoName = document.querySelector(".logoName");
        const logoParent = logoName.parentElement;
        document.querySelectorAll(".labeled").forEach((labe) => {
          labe.classList.remove("hidden");
        });
        logoName.classList.remove("hidden");
        logoParent.classList.add("border-b", "rounded-2xl", "p-3");
        icons.classList.toggle("hidden");
        btn.classList.toggle("hidden");
        parent.classList.toggle("pl-7");
      });
    }
    notice12.classList.add('h-auto');
    notice12.classList.remove("h-[125vh]");
  } else {
    sidebar.classList.toggle('show'); 
    notice12.classList.remove('h-auto');
    notice12.classList.add("h-[125vh]");
  }
  document.getElementById('close-btn').addEventListener('click', () => {
    sidebar.classList.remove('show'); 
  });
});


document.querySelectorAll('#student-sidebar a').forEach((item) => {
  item.addEventListener('click', () => {
    const screenWidth = window.innerWidth;  
    if (screenWidth <= 640) {  
      document.getElementById('student-sidebar').classList.remove('show');
    }
  });
});


