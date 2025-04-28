const classList = document.getElementById('class_List');

classList.innerHTML = `
    <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Class List</h1>
        </div>
    </div>
    <div class="flex justify-center items-start min-h-[100vh] h-auto m-6">
        <div class="w-[70%] max-sm:w-full max-sm:text-2xl mx-auto bg-gray-200 shadow-md rounded-lg p-6">
            <!-- Buttons and Search -->
            <div class="mb-4 flex items-center justify-between ">
                <button class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 max-sm:mb-3 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77] nav-link" data-target = "add_class" >Add Class</button>
                <input type="text" placeholder="Search..." class="w-1/4 max-sm:w-[60%] max-sm:mb-3 rounded-md border p-2 pt-1.5 pb-1.5 pl-5 text-[1rem] max-sm:text-xl font-bold text-[#0d1b2a]" />
            </div>

            <!-- Table -->
            <table class="w-full border-collapse rounded-lg rounded-tr-full  text-[#0d1b2a] text-lg max-sm:text-xl">
                <thead class="bg-[#415a77] text-white">
                    <tr>
                        <th class="p-3 text-left font-semibold">DESCRIPTION</th>
                        <th class="p-3 text-left font-semibold">STUDENT COUNT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97">
                        <td class="p-3 ">English</td>
                        <td class="p-3 ">4</td>
                    </tr>
                    <tr  class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97">
                        <td class="p-3 ">Hindi</td>
                        <td class="p-3 ">4</td>
                    </tr>
                    <tr  class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97">
                        <td class="p-3 ">Math</td>
                        <td class="p-3">3</td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination -->
            <div class="mt-4 flex items-center justify-between">
                <p class="text-[#8e9baa]">Page <strong>1</strong> of 1 :: <strong>5</strong> students</p>
                <div class="flex space-x-2">
                    <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-300 transition duration-300 active:scale-95 ">«</button>
                    <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-300 transition duration-300 active:scale-95 ">‹</button>
                    <button class="rounded-md  cursor-pointer bg-[#778da9] px-3 py-1 text-white">1</button>
                    <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-300 transition duration-300 active:scale-95 ">›</button>
                    <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-300 transition duration-300 active:scale-95 ">»</button>
                </div>
            </div>
        </div>
</div>
`;

// class="bg-gray-100 p-6"