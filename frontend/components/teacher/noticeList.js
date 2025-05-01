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
`;


const noticeContainer = document.querySelector('#notice-container'); // Your parent div

async function fetchNotices() {
  try {
    const res = await fetch('http://localhost:8000/api/notice'); // Replace with your endpoint
    const { data: notices } = await res.json();

    
    notices.forEach(notice => {
      const formattedDate = new Date(notice.dateIssued).toLocaleDateString();

      const fileSection = notice.files.length > 0
        ? `<a href="${notice.files[0].fileUrl}" target="_blank" class="text-[#e0e1dd] underline">${notice.files[0].fileName}</a>`
        : `<span class="text-[#e0e1dd]">No file attached</span>`;

      const card = `
        <div class="rounded-lg border border-[#8e9baa] bg-[#1b263b] p-4 mb-4">
          <h2 class="text-lg font-semibold text-[#e0e1dd]">${notice.Title}</h2>
          <h3 class="text-md font-semibold text-[#e0e1dd]">Audience: ${notice.audience}</h3>
          <p class="mt-2 text-[#8e9baa]">${notice.description}</p>
          <div class="mt-3 text-sm text-[#778da9]">
            <p>Date Issued: ${formattedDate}</p>
          </div>
          <div class="mt-3 text-sm text-[#778da9]">
            <p>File: ${fileSection}</p>
          </div>
        </div>
      `;

      noticeContainer.innerHTML += card;

    });

  } catch (err) {
    console.error('Error fetching notices:', err);
  }
}

fetchNotices();
