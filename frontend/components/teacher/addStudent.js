const studentAdding = document.getElementById("add_Student");

studentAdding.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Add New Student</h1>
        </div>
    </div>
<div class="flex justify-center items-center min-h-[103vh] max-sm:ml-2 max-sm:mr-2  h-auto m-6 text-lg text-[#1b263b]">
      <div class="h-auto  w-[60%] max-sm:w-full ">
        <div
          class="max-w-8xl flex h-auto w-full flex-wrap justify-between gap-6  p-6  backdrop-blur-lg">
          <div class="w-full max-w-4xl rounded-lg bg-gray-200  p-6 shadow-md  ">
            <h2 class="p-4  rounded-lg  text-lg max-sm:text-2xl font-semibold bg-[#415a77] text-[#e0e1dd]">STUDENT DETAILS</h2>
            <div class="w-full max-w-3xl rounded-b-lg bg-gray-200 pt-6 pb-6 text-xl max-sm:text-2xl">
              <form>
                <div class="grid grid-cols-1 md:grid-cols-2  gap-4 ">
                  <div>
                      <label class="block text-gray-700 max-sm:mb-3.5">First Name</label>
                      <input type="text" class="w-full p-2 border max-sm:mb-4 border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="First Name">
                  </div>
                  <div>
                    <label class="block text-gray-700 max-sm:mb-3.5">Last Name</label>
                    <input type="text" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Last Name">
                  </div>
                  <div>
                      <label class="block text-gray-700 max-sm:mb-3.5">Username</label>
                      <input type="text" class="w-full p-2 border max-sm:mb-4 border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Username">
                  </div>
                  <div>
                    <label class="block text-gray-700 max-sm:mb-3.5">Password</label>
                    <input type="text" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Password">
                  </div>
                  <div class="md:col-span-2">
                      <label class="block text-gray-700 max-sm:mb-3.5">Subjects to Teach</label>
                      <select class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md bg-gray-200 focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                        <option value="" disabled selected>Select a department</option>
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                        <option>Computer Science</option>
                        <option>English</option>
                        <option>History</option>
                        <option>Geography</option>
                      </select>
                      <input type="text" placeholder="Or enter a custom subject" class="w-full p-2 border max-sm:mb-4 border-gray-300 rounded-md mt-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                  </div>

                  <div class="md:col-span-2">
                    <label class="block text-gray-700 max-sm:mb-3.5">Email Address</label>
                    <input type="email" class="w-full p-2 border border-gray-300 max-sm:mb-3.5 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="example@email.com">
                  </div>
                  <div>
                    <label class="block text-gray-700 max-sm:mb-3.5">Mobile Phone</label>
                    <input type="text" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="+123456789">
                  </div>
                  <div>
                    <label class="block text-gray-700 max-sm:mb-3.5">Parents Phone</label>
                    <input type="text" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="+987654321">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-gray-700 max-sm:mb-3.5">Address</label>
                    <input type="text" placeholder="Street Address" class="w-full p-2 max-sm:mb-3 border border-gray-300 rounded-md mb-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                    <input type="text" placeholder="Address Line 2" class="w-full p-2 max-sm:mb-3 border border-gray-300 rounded-md mb-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input type="text" placeholder="City" class="p-2 border border-gray-300 max-sm:mb-3 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                        <input type="text" placeholder="State" class="p-2 border border-gray-300 max-sm:mb-3 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                        <input type="text" placeholder="Zip Code" class="p-2 border border-gray-300 max-sm:mb-3 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                    </div>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-gray-700 max-sm:mb-3.5">Bio/Notes</label>
                    <textarea class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md min-h-[100px] focus:ring-2 focus:ring-[#415a77] focus:outline-none"></textarea>
                  </div>
                </div>
                <div class="mt-4 flex justify-end gap-2">
                  <button
                    class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Save
                    & Add Another</button>
                  <button
                    class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      
`

/*

    class="bg-gray-100 flex items-center justify-center min-h-screen

*/