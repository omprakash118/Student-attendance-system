const messlist = document.getElementById('message');

messlist.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Message List</h1>
        </div>
    </div>
<div class="flex justify-center items-center min-h-[100vh] h-auto m-6 max-sm:m-3 text-lg max-sm:text-2xl">
                        
                        <div class="w-[60%] max-sm:w-[95%] h-auto m-6 max-sm:m-3">
                            <div class="w-full max-w-4xl rounded-lg bg-gray-200 p-6 shadow-md ">
                                <!-- Buttons and Search -->
                                <div class="flex justify-between items-center mb-4 ">
                                    <button 
                                    class="flex items-center cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77] nav-link"  data-target = "messageForm" >
                                        <i class="fa-solid fa-paper-plane mr-2 h-5 w-5"></i>
                                        Send Message
                                    </button>
                                    <input type="text" placeholder="Search..." class="w-1/4 max-sm:w-1/3 rounded-md border  p-2 pt-1.5 pb-1.5 pl-5  font-bold text-[#0d1b2a]" />
                                </div>
                    
                                <!-- Table -->
                                <table class="w-full border-collapse  rounded-[8px] text-[#0d1b2a] text-lg max-sm:text-xl">
                                    <thead class="bg-[#415a77] text-white">
                                        <tr>
                                            <th class="p-3 text-left font-semibold uppercase">Recipients</th>
                                            <th class="p-3 text-left font-semibold uppercase">Message</th>
                                            <th class="p-3 text-left font-semibold uppercase">Sent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97 ">
                                            <td class="p-3 ">om</td>
                                            <td class="p-3 ">Hello..</td>
                                            <td class="p-3 ">2025-03-09 </br> 10:55:24</td>
                                        </tr>
                                        <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97 ">
                                            <td class="p-3 ">om</td>
                                            <td class="p-3 ">Hello..</td>
                                            <td class="p-3 ">2025-03-09 </br> 10:55:24</td>
                                        </tr>
                                        <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97 ">
                                            <td class="p-3 ">om</td>
                                            <td class="p-3 ">Hello..</td>
                                            <td class="p-3 ">2025-03-09 </br> 10:55:24</td>
                                        </tr>
                                        <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97 ">
                                            <td class="p-3 ">om</td>
                                            <td class="p-3 ">Hello..</td>
                                            <td class="p-3 ">2025-03-09 </br> 10:55:24</td>
                                        </tr>
                                        <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97 ">
                                            <td class="p-3 ">om</td>
                                            <td class="p-3 ">Hello..</td>
                                            <td class="p-3 ">2025-03-09 </br> 10:55:24</td>
                                        </tr>
                                        <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97 ">
                                            <td class="p-3 ">om</td>
                                            <td class="p-3 ">Hello..</td>
                                            <td class="p-3 ">2025-03-09 </br> 10:55:24</td>
                                        </tr>
                                        <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97 ">
                                            <td class="p-3 ">om</td>
                                            <td class="p-3 ">Hello..</td>
                                            <td class="p-3 ">2025-03-09 </br> 10:55:24</td>
                                        </tr>
                                        <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300  transition duration-300 active:scale-97 ">
                                            <td class="p-3 ">om</td>
                                            <td class="p-3 ">Hello..</td>
                                            <td class="p-3 ">2025-03-09 </br> 10:55:24</td>
                                        </tr>
                                    
                                    </tbody>
                                </table>
                    
                                <!-- Pagination -->
                                <div class="mt-4 flex items-center justify-between">
                                    <p class="text-[#8e9baa]">Page <strong>1</strong> of 1 :: <strong>1</strong> Message</p>
                                    <div class="flex space-x-2">
                                        <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-[#415a7779] hover:text-white transition duration-300 active:scale-95 ">«</button>
                                        <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-[#415a7779] hover:text-white transition duration-300 active:scale-95 ">‹</button>
                                        <button class="rounded-md  cursor-pointer bg-[#778da9] px-3 py-1 text-white">1</button>
                                        <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-[#415a7779] hover:text-white transition duration-300 active:scale-95 ">›</button>
                                        <button class="cursor-pointer rounded-md  px-2 py-1 text-[#8e9baa] hover:bg-[#415a7779] hover:text-white transition duration-300 active:scale-95 ">»</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
`;