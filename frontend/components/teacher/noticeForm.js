const noticeForm = document.getElementById('notice_form');

noticeForm.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Add New Notice</h1>
        </div>
    </div>
  <div class="m-6 max-sm:m-3  flex items-start justify-center font-semibold text-[#1b263b] h-auto min-h-[100vh]" id = "notice12">
    <div class="h-auto  w-[80%] max-sm:w-full p-10 max-sm:p-4 rounded-2xl ">
      <div class="mx-auto mt-6 max-w-2xl rounded-lg text-xl max-sm:text-2xl bg-gray-200 p-6 shadow-lg">
        <h2 class="p-4  rounded-lg  text-2xl font-semibold bg-[#415a77] text-[#e0e1dd] mb-8">Add Notice</h2>
        <form>
          <input type="text" placeholder="Title"
            class="mb-3 w-full rounded-lg border  border-gray-300 bg-transparent px-4 py-2  placeholder-[#8e9baa] focus:outline-[#415a77]"
            required />
          <!-- Dropdown Menu -->
          <div class="mb-3 relative">
            <select id="userType"
                    class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2  focus:outline-[#415a77] appearance-none cursor-pointer"
                    required>
                    <option value="" disabled selected class="">Select the type of user</option>
                    <option value="all" class="">All</option>
                        <option value="student" class="">Teacher</option>
                        <option value="teacher" class="">Student</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 ">
                          <i class="fa-solid fa-angle-down"></i>
                    </div>
              </div>

                <textarea placeholder="Description"
                class="mb-3 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2  placeholder-[#8e9baa] focus:outline-[#415a77]"
                required></textarea>

                <!-- File Upload -->
                <div class="mb-3 flex items-center justify-between">
                    <label for="chooseFile"
                      class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">
                      Add File </label>
                    <input type="file" id="chooseFile" class="hidden" />
                    <span id="fileName" class=" text-sm truncate max-w-xs">No file chosen</span>
                </div>

                <!-- Submit Button -->
                    <button type="submit"
                        class="cursor-pointer w-full rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Post
                        Notice</button>
                </form>
            </div>
        </div>
    </div>
`;


// For file choose
document.getElementById('chooseFile').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
    document.getElementById('fileName').textContent = fileName;
});

