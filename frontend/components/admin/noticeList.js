const notice = document.getElementById('notice');

notice.innerHTML = `
    <div class="w-full  h-[125vh]">

        <div class="flex justify-between items-center text-center titel h-[7rem] bg-[#e0e1dd] shadow-lg  ">
            <h2 class=" title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold w-[40%] ">Notices</h2>
                <button 
                    class="w-[8%] cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 mr-[5rem] max-sm:mr-[2rem] text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77] nav-link"  data-target = "notice_form" >
                    <i class="fa-solid fa-file-circle-plus"></i>
                </button>
        </div>
        <div class="space-y-4 pl-[5rem] pr-[5rem] max-sm:pl-[2rem] max-sm:pr-[2rem] pt-8">
            <!-- Notice Card -->
            <div class="rounded-lg border border-[#8e9baa] bg-[#1b263b] p-4 transition duration-300 active:scale-97 cursor-pointer">
                <h3 class="text-lg max-sm:text-2xl font-semibold text-[#e0e1dd]">Exam Date Update</h3>
                <p class="mt-2 text-[#8e9baa] max-sm:text-xl">The exam date is postponed to 15th March.</p>
                <div class="mt-3 text-sm max-sm:text-xl text-[#778da9]">
                    <p>Posted by: <span class="font-medium">Admin</span></p>
                    <p>09 March 2025</p>
                </div>
            </div>

            <div class="rounded-lg border border-[#8e9baa] bg-[#1b263b] p-4 transition duration-300 active:scale-97 cursor-pointer">
                <h3 class="text-lg max-sm:text-2xl font-semibold text-[#e0e1dd]">Holiday Notice</h3>
                <p class="mt-2 text-[#8e9baa] max-sm:text-xl">The college will remain closed on 10th March.</p>
                <div class="mt-3 text-sm text-[#778da9] max-sm:text-xl">
                    <p>Posted by: <span class="font-medium">Principal</span></p>
                    <p>08 March 2025</p>
                </div>
            </div>
        </div>
    </div>
`;

