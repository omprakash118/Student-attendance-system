const navBar = document.getElementById("admin-sidebar");

navBar.innerHTML = `
    <nav class="flex-col text-[#8e9baa]">
        <div class="logo text-center p-3  text-3xl max-sm:text-4xl  rounded-2xl shadow-xs shadow-black text-[#415a77] bg-[#1b263b] ">
          <i class="fa-brands fa-mendeley text-[#8e9baa] "></i>
          <span class ="logoName text-[#8e9baa]">MarkMe</span>
        </div>

        <div class="myMenu mt-8 ">
          <ul class=" flex-col rounded-2xl text-xl max-sm:text-2xl">
            
            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl   hover:text-white active:bg-[#415a77] ">
              <div class="hidden">
                <i class="fa-solid fa-gauge"></i>
              </div>
              <a href="" class="block btnHidden nav-link" data-target="dashboard"> <i class="fa-solid fa-gauge pr-4"></i>Dashboard</a>
            </li>
            
            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl   hover:text-white active:bg-[#415a77] ">
              <div class="hidden">
                <i class="fa-regular fa-calendar-check"></i>
              </div>
              <a href="" class="block btnHidden nav-link" data-target="take-attendance"> <i class="fa-regular fa-calendar-check pr-4"></i>Take attendance</a>
            </li>

            <li class=" pt-7 pb-3 pl-1.5 text-[#737b85] labeled">Managment</li>

            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl rounded-2xl  hover:text-white active:bg-[#415a77] block relative dropdownContainer">
              <div class="hidden">
                <i class="fa-solid fa-person-chalkboard"></i>
              </div>
              <button class="flex justify-between items-center container cursor-pointer dropdownBtn transition-all duration-500 btnHidden" >
              <span><i class="fa-solid fa-person-chalkboard pr-4"></i>Manage Teacher</span>
              <i class="fa-solid fa-angle-left left-arrow transition-transform duration-400" ></i>
              </button>
          
              <div class="mt-4 hidden dropdownMenu transition-all duration-500" >
                <ul class="flex-col rounded-2xl text-xl max-sm:text-2xl text-[#737b85] ">
                  <li class="p-3 pl-7  hover:bg-[#0d1b2a] rounded-2xl hover:text-white active:bg-[#415a77]">
                    <a href="" id="fetchTeachers" class="block nav-link" data-target = "Teacher_list">
                      
                      <i class="fa-solid fa-list  pr-3.5"></i>
                      <span>Teacher List</span>
                    </a>
                  </li>
                  <li class="p-3 pl-7  hover:bg-[#0d1b2a] rounded-2xl hover:text-white active:bg-[#415a77]">
                    <a href="" class="block nav-link" data-target = "add_Teacher">
                      
                      <i class="fa-solid fa-user-plus  pr-3.5 "></i> 
                      <span>Add Teacher</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl rounded-2xl  hover:text-white active:bg-[#415a77] block relative dropdownContainer">
              <div class="hidden">
                <i class="fa-solid fa-users"></i>
              </div>
              <button class="flex justify-between items-center container cursor-pointer dropdownBtn transition-all duration-500 btnHidden"  >
              <span><i class="fa-solid fa-users pr-4"></i>Manage Student</span>
              <i class="fa-solid fa-angle-left left-arrow transition-transform duration-400"></i>
              </button>
              <div class="mt-4 hidden dropdownMenu transition-all duration-500" >
                <ul class="flex-col rounded-2xl text-xl max-sm:text-2xl text-[#737b85] ">
                  <li class="p-3 pl-7  hover:bg-[#0d1b2a] rounded-2xl hover:text-white active:bg-[#415a77]">
                    <a href="#" class="block nav-link" data-target="student_list">
                       <i class="fa-solid fa-list  pr-3.5"></i>
                      <span>Student List</span>
                    </a>
                  </li>
                  <li class="p-3 pl-7  hover:bg-[#0d1b2a] rounded-2xl hover:text-white active:bg-[#415a77]">
                    <a href="#" class="block nav-link " data-target="add_Student">
                      <i class="fa-solid fa-user-plus pr-3.5 "></i>
                      <span>Add student</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>  
            
            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl rounded-2xl  hover:text-white active:bg-[#415a77] block relative dropdownContainer">
              <div class="hidden">
                <i class="fa-solid fa-chalkboard"></i>
              </div>
              <button class="flex justify-between items-center container cursor-pointer dropdownBtn transition-all duration-500 btnHidden"  >
              <span><i class="fa-solid fa-chalkboard pr-4"></i>Manage Classes</span>
              <i class="fa-solid fa-angle-left left-arrow transition-transform duration-400"></i>
              </button>
              <div class="mt-4 hidden dropdownMenu transition-all duration-500" >
                <ul class="flex-col rounded-2xl text-xl max-sm:text-2xl text-[#737b85] ">
                  <li class="p-3 pl-7  hover:bg-[#0d1b2a] rounded-2xl hover:text-white active:bg-[#415a77]">
                    <a href="" class="block nav-link" data-target = "class_List">
                      <i class="fa-solid fa-list  pr-3.5"></i>
                      <span>Class list</span>
                    </a>
                  </li>
                  <li class="p-3 pl-7  hover:bg-[#0d1b2a] rounded-2xl hover:text-white active:bg-[#415a77]">
                    <a href="" class="block nav-link" data-target = "add_class">
                      <i class="fa-solid fa-user-plus  pr-3.5 "></i> 
                      <span>Add class</span>
                    </a>
                    </li>
                    <li class="p-3 pl-7  hover:bg-[#0d1b2a] rounded-2xl hover:text-white active:bg-[#415a77]">
                    <a href="" class="block ">
                      <i class="fa-solid fa-user-minus pr-3.5  "></i>
                      <span>Remove class</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>  

            
           
            <li class="text-[#737b85] pt-7 pb-3 pl-1.5 labeled">Notification</li>
            
            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl hover:text-white   active:bg-[#415a77]">
              <div class="hidden">
                <i class="fa-solid fa-bell"></i>
              </div>
              <a href="" class="block btnHidden nav-link" data-target = "notice"><i class="fa-solid fa-bell pr-4"></i>Notice</a>
            </li>
            
            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl  hover:text-white active:bg-[#415a77]">
              <div class="hidden">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <a href="" class="block btnHidden nav-link" data-target = "message"><i class="fa-solid fa-envelope pr-4"></i>Message</a>
            </li>
            
            <li class="text-[#737b85] pt-7 pb-3 pl-1.5 labeled">Personal</li>
            
            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl  hover:text-white active:bg-[#415a77]">
              <div class="hidden">
                <i class="fa-solid fa-gear"></i>
              </div>
              <a href="" class="block btnHidden nav-link" data-target = "setting"><i class="fa-solid fa-gear pr-4"></i>Setting</a>
            </li>
            
            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl   hover:text-red-500 active:bg-[#415a77]">
              <div class="hidden">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </div>
              <a href="" class="block btnHidden"><i class="fa-solid fa-arrow-right-from-bracket pr-4"></i>Logout</a>
            </li>

          </ul>
        </div>
        <div class="flex justify-center items-center mt-32  mr-14 ml-14 ">
  <button id="close-btn" class="neon-button cursor-pointer text-2xl shadow-xl shadow-black text-[#8e9baa] hover:text-[#e0e1dd] 
    bg-[#1b263b] w-15 h-15 rounded-full  text-center">
    <i class="fa-solid fa-xmark rounded-full text-4xl"></i>
  </button>
</div>
      </nav>
`

