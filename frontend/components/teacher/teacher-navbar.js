const navBar = document.getElementById("teacher-sidebar");

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
              <a href="" class="block btnHidden nav-link" data-target = "dashboard"> <i class="fa-solid fa-gauge pr-4"></i>Dashboard</a>
            </li>
            
            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl   hover:text-white active:bg-[#415a77] ">
              <div class="hidden">
                <i class="fa-regular fa-calendar-check"></i>
              </div>
              <a href="" class="block btnHidden nav-link" data-target="take-attendance"> <i class="fa-regular fa-calendar-check pr-4"></i>Take attendance</a>
            </li>

            <li class=" pt-7 pb-3 pl-1.5 text-[#737b85] labeled">Managment</li>

            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl hover:text-white   active:bg-[#415a77]">
              <div class="hidden">
                <i class="fa-solid fa-person-chalkboard"></i>
                </div>
                <a href="" class="block btnHidden nav-link"  data-target = "Teacher_list"><i class="fa-solid fa-person-chalkboard  pr-3.5"></i>Teacher List</a>
            </li>

            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl hover:text-white   active:bg-[#415a77]">
              <div class="hidden">
                <i class="fa-solid fa-users"></i>
              </div>
              <a href="" class="block btnHidden nav-link" data-target="student_list"><i class="fa-solid fa-users  pr-3.5"></i>Student List</a>
            </li>
            
            

            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl hover:text-white   active:bg-[#415a77]">
              <div class="hidden">
                <i class="fa-solid fa-chalkboard"></i>
              </div>
              <a href="" class="block btnHidden nav-link" data-target = "class_List"><i class="fa-solid fa-chalkboard  pr-3.5"></i>Class List</a>
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
            
            <li class="p-3 pl-7 hover:bg-[#1b263b] hover:rounded-2xl   hover:text-red-500 active:bg-[#415a77]">
              <div class="hidden">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </div>
              <a href="http://127.0.0.1:5500/frontend/pages/login.page.html" onclick="logout()" class="block btnHidden"><i class="fa-solid fa-arrow-right-from-bracket pr-4"></i>Logout</a>
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



async function logout() {
  try {
    const response = await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      credentials: 'include', // important to send cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'teacher' }) // or 'admin', 'student'
    });

    const data = await response.json();
    console.log(data.message);

    alert(data.message);
    // Redirect to login page
    // window.location.href = 'http://127.0.0.1:5500/frontend/pages/login.page.html';
  } catch (error) {
    console.error('Logout failed:', error);
  }
}