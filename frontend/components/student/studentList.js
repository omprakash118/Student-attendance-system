const studentList = document.getElementById("student_list");

studentList.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Student List</h1>
        </div>
    </div>
<div class="flex justify-center items-start min-h-screen box-border h-auto m-6  text-lg max-sm:text-xl">
      <div class="w-full max-w-4xl rounded-lg bg-gray-200 p-6 shadow-md ">
        <div class="mb-4 flex items-center justify-between">
            <input type="text" placeholder="Search..." class="w-1/4 rounded-md border p-2 pt-1.5 pb-1.5 pl-5 text-[1rem] font-bold text-[#0d1b2a]" />
        </div>
    <table class="w-full border-collapse  rounded-[8px] text-[#0d1b2a] text-lg max-sm:text-xl">
    <thead class="bg-[#415a77] text-white">
      <tr>
        <th class="p-3 text-left">FIRST</th>
        <th class="p-3 text-left">LAST</th>
        <th class="p-3 text-left">EMAIL</th>
        <th class="p-3 text-left">MOBILE PHONE</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-[#415a77]  cursor-pointer hover:bg-gray-300  transition duration-200 active:scale-97">
        <td class="p-3">Stive</td>
        <td class="p-3">Smith</td>
        <td class="p-3"></td>
        <td class="p-3"></td>
      </tr>
      <tr class="border-b border-[#415a77]  cursor-pointer hover:bg-gray-300 transition duration-200 active:scale-97">
        <td class="p-3">Jay</td>
        <td class="p-3">Mali</td>
        <td class="p-3"></td>
        <td class="p-3"></td>
      </tr>
      <tr class="border-b border-[#415a77]  cursor-pointer hover:bg-gray-300 transition duration-200 active:scale-97 ">
        <td class="p-3">Joe</td>
        <td class="p-3">Root</td>
        <td class="p-3">joe@gmai.com</td>
        <td class="p-3">(784) 956-3829</td>
      </tr>
      <tr class="border-b border-[#415a77]  cursor-pointer hover:bg-gray-300 transition duration-200 active:scale-97">
        <td class="p-3">Josh</td>
        <td class="p-3">Buttler</td>
        <td class="p-3"></td>
        <td class="p-3"></td>
      </tr>
      <tr class="border-b border-[#415a77]  cursor-pointer hover:bg-gray-300 transition duration-200 active:scale-97">
        <td class="p-3">Rohit</td>
        <td class="p-3">Sharma</td>
        <td class="p-3">sharma@gmail.com</td>
        <td class="p-3"></td>
      </tr>
    </tbody>
  </table>
  <div class="mt-4 flex items-center justify-between">
    <p class="text-[#8e9baa]">Page <strong>1</strong> of 1 :: <strong>5</strong> students</p>
    <div class="flex space-x-2">
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-200 transition duration-300 active:scale-95 ">«</button>
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-200 transition duration-300 active:scale-95 ">‹</button>
      <button class="rounded-md  cursor-pointer bg-[#778da9] px-3 py-1 text-white">1</button>
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-200 transition duration-300 active:scale-95 ">›</button>
      <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-gray-200 transition duration-300 active:scale-95 ">»</button>
    </div>
  </div>
  </div>
</div>

`;

//  class="bg-gray-100 flex items-center justify-center min-h-screen"
