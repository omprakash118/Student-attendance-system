const classAdd = document.getElementById("add_class");

classAdd.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Add New Class</h1>
        </div>
    </div>
        <div class="flex justify-center items-start min-h-screen  max-sm:ml-2 max-sm:mr-2 h-auto m-6">
            <div class="max-w-4xl mx-auto w-[80%] max-sm:w-[95%]  bg-gray-200 shadow-md rounded-lg p-6">
            <!-- Header -->
            <h2 class="p-4  rounded-lg  text-lg max-sm:text-2xl font-semibold bg-[#415a77] text-[#e0e1dd]">CLASS DETAILS</h2>

            <!-- Form -->
            <form class="mt-10 text-xl max-sm:text-2xl">
                <div class="grid grid-cols-4 max-sm:grid-cols-2 gap-4 items-center">
                    <!-- Description -->
                    <label class="text-gray-700  font-medium">Description</label>
                    <input type="text" class="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#415a77]" placeholder="Enter class name">

                    <!-- Add Students -->
                    <label class="text-gray-700 font-medium ">Add Students</label>
                    <select class="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#415a77]">
                        <option>Please choose students</option>
                        <option>Student 1</option>
                        <option>Student 2</option>
                        <option>Student 3</option>
                    </select>
                </div>

                <!-- Save Button -->
                <div class="mt-6 flex justify-end">
                    <button type="submit" class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">
                    Save
                    </button>
                </div>
            </form>
        </div>
    </div>
`

// class="bg-gray-100 p-6"
