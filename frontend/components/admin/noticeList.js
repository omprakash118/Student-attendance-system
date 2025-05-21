const notice = document.getElementById('notice');

notice.innerHTML = `
    <div class="w-full  min-h-[125vh]">

        <div class="flex justify-between items-center text-center titel h-[7rem] bg-[#e0e1dd] shadow-lg  ">
            <h2 class=" title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold w-[40%] ">Notices</h2>
                <button 
                    class="w-[8%] cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 mr-[5rem] max-sm:mr-[2rem] text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77] nav-link"  data-target = "notice_form" >
                    <i class="fa-solid fa-file-circle-plus"></i>
                </button>
        </div>
        <div id="notice-container" class="space-y-4 pl-[5rem] pr-[5rem] max-sm:pl-[2rem] max-sm:pr-[2rem] pt-8">
            
            
        </div>
    </div>

      <div id="delete-Notice" class="fixed inset-0 bg-gray-900 bg-opacity-50 hidden  items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div class="px-6 py-4">
                <div class="flex justify-center mb-4">
                    <div class="bg-red-100 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
                <h3 class="text-lg font-medium text-gray-900 text-center mb-2">Delete Notice</h3>
                <p class="text-gray-500 text-center">Are you sure you want to delete this Notice? This action cannot be undone.</p>
            </div>
            <div class="bg-gray-50 px-6 py-4 flex justify-center gap-3">
                <button id="cancel-delete-btn" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                    Cancel
                </button>
                <button id="confirm-delete-btn" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete
                </button>
            </div>
        </div>
    </div>

    <div id="toast-success" class="fixed bottom-5 right-5 hidden items-center w-full max-w-xs p-4 text-red-100 bg-red-800 rounded-lg shadow-lg" role="alert">
  <svg class="w-6 h-6 mr-2 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  <span class="font-medium">Notice Give successfully!</span>
</div>
`;


const noticeContainer = document.querySelector('#notice-container'); // Your parent div
const deletNotice = document.getElementById('delete-Notice');

async function fetchNotices(isReset) {
  try {
    const res = await fetch('http://localhost:8000/api/notice'); // Replace with your endpoint
    const { data: notices } = await res.json();
    
    if(isReset){
      noticeContainer.innerHTML = '';
    }

    notices.forEach(notice => {
      const formattedDate = new Date(notice.dateIssued).toLocaleDateString();
      const fileSection = notice.files.length > 0
        ? `<a href="${notice.files[0].fileUrl}" target="_blank" class="text-[#e0e1dd] underline">${notice.files[0].fileName}</a>`
        : `<span class="text-[#e0e1dd]">No file attached</span>`;

      const card = `
      
        <div id="notice-${notice._id}" class="rounded-lg border border-[#8e9baa] bg-[#1b263b] p-4 mb-4">
          <h2 class="text-lg font-semibold text-[#e0e1dd]">${notice.Title}</h2>
          <h3 class="text-md font-semibold text-[#e0e1dd]">Audience: ${notice.audience}</h3>
          <p class="mt-2 text-[#8e9baa]">${notice.description}</p>
          <div class="mt-3 text-sm text-[#778da9]">
            <p>Date Issued: ${formattedDate}</p>
          </div>
          <div class="mt-3 text-sm text-[#778da9]  pb-4"  >
            <p>File: ${fileSection}</p>
          </div>
          <button id="noticeDelete" class="delete-notice-btn w-[8%] cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 mr-[5rem] max-sm:mr-[2rem] text-[#e0e1dd] transition duration-300 hover:bg-[#778da944]  hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]" 
            data-id="${notice._id}">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>

      `;

        noticeContainer.innerHTML += card;
      
    });

  } catch (err) {
    console.error('Error fetching notices:', err);
  }
}

fetchNotices(0);

// document.addEventListener("click", async function (e) {
//   if (e.target.closest(".delete-notice-btn")) {
//     const button = e.target.closest(".delete-notice-btn");
//     const noticeId = button.dataset.id;

//     let confirmed = confirm("Are you sure you want to delete this notice?");

//     if (!confirmed) return;

//     try {
//       // Optional: DELETE from server
//       const res = await fetch(`http://localhost:8000/api/notice/${noticeId}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         // Remove the notice card from the DOM
//         const noticeCard = document.getElementById(`notice-${noticeId}`);
//         if (noticeCard) noticeCard.remove();

//         alert("Notice deleted successfully.");

//         fetchNotices(1);
//       } else {
//         alert("Failed to delete notice.");
//       }
//     } catch (err) {
//       console.error("Error deleting notice:", err);
//       alert("Error deleting notice.");
//     }
//   }
// });



let selectedNoticeId = null;

document.addEventListener("click", async function (e) {
  if (e.target.closest(".delete-notice-btn")) {
    const button = e.target.closest(".delete-notice-btn");
    selectedNoticeId = button.dataset.id;

    // Show the modal
    deletNotice.classList.remove("hidden");
    deletNotice.classList.add("flex");
  }
});

// Handle Cancel Button
document.getElementById("cancel-delete-btn").addEventListener("click", () => {
  deletNotice.classList.add("hidden");
  deletNotice.classList.remove("flex");
  selectedNoticeId = null;
});

// Handle Confirm Delete Button
document.getElementById("confirm-delete-btn").addEventListener("click", async () => {
  if (!selectedNoticeId) return;

  try {
    const res = await fetch(`http://localhost:8000/api/notice/${selectedNoticeId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Remove notice from DOM
      const noticeCard = document.getElementById(`notice-${selectedNoticeId}`);
      if (noticeCard) noticeCard.remove();

      deletNotice.classList.add("hidden");
      deletNotice.classList.remove("flex");
      selectedNoticeId = null;

      // Optional toast or alert
      // alert("Notice deleted successfully.");

      showSuccessToast();

      fetchNotices(1); // Refresh
    } else {
      alert("Failed to delete notice.");
    }
  } catch (err) {
    console.error("Error deleting notice:", err);
    alert("Error deleting notice.");
  }
});


function showSuccessToast() {
  const toast = document.getElementById('toast-success');
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  
  // Hide it after 3 seconds
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3000);
}