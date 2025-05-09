const login = document.getElementById('login');

login.innerHTML = `


    <div class="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#0d1b2a] to-[#415a77] p-4">
  <div class="w-full max-w-md rounded-lg bg-gray-100 backdrop-blur-md backdrop-saturate-50 p-8 shadow-md">
    <div class="mb-8 flex flex-col items-center text-[#1b263b]">
      <!-- Title -->
      <div class="text-center flex justify-center items-center gap-4">
        <div class="mb-2 text-5xl">
          <i class="fa-brands fa-mendeley"></i>
        </div>
        <h1 class="mb-1 text-4xl font-semibold logoname font">Mark Me</h1>
      </div>
      <h2 class="mt-2 text-xl font-medium text-[#415a77]">Online Attendance System</h2>
    </div>

    <!-- Login Form -->
    <form id="loginForm" class="space-y-4 text-xl">
      <h3 class="mb-4 font-semibold text-center text-[#1b263b]">Login</h3>

      <!-- Email -->
      <div>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          required
          class="w-full rounded border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none"
        />
      </div>

      <!-- Username -->
      <div>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
          class="w-full rounded border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none"
        />
      </div>

      <!-- Password -->
      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          class="w-full rounded border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none"
        />
      </div>

      <!-- User Type -->
      <div>
        <select
          id="userType"
          name="userType"
          required
          class="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none"
        >
          <option value="" disabled selected>Select User Type</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      <!-- Captcha -->
      <div class="flex space-x-2">
        <div class="flex w-1/3 items-center justify-center rounded bg-gray-300 px-4 py-2">
          <span class="font-medium text-[#415a77]">997087</span>
        </div>
        <input
          type="text"
          id="captcha"
          name="captcha"
          placeholder="Captcha"
          required
          class="w-2/3 rounded border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none"
        />
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-2 gap-4 pt-2">
        <button
          type="submit"
          class="cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]"
        >
          Login
        </button>
        <button
          type="reset"
          class="cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>

`;



document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
    const captcha = document.getElementById('captcha').value;

    if (captcha !== '997087') {
      alert('Invalid captcha!');
      return;
    }

    try {
        const res = await fetch('http://localhost:8000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password, role: userType })  // <== FIXED
          });
          

      console.log(res);

      const data = await res.json();

      if (res.ok) {
        alert('Login successful!');
        window.location.href = `/${this.role}/.page.html`;
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error!');
    }
  });


//   <div class="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#0d1b2a] to-[#415a77]  p-4  ">
//   <div class="w-full max-w-md rounded-lg  bg-gray-100 backdrop-blur-md backdrop-saturate-50 p-8 shadow-md">
//       <div class="mb-8 flex flex-col items-center text-[#1b263b]">
//           <!-- Title -->
//           <div class="text-center flex justify-center items-center gap-4">
//               <div class="mb-2 text-5xl ">
//                   <i class="fa-brands fa-mendeley"></i>
//               </div>
//               <h1 class="mb-1 text-4xl font-semibold logoname font">Mark Me</h1>
//           </div>
//           <h2 class="mt-2 text-xl font-medium text-[#415a77]">Online Attendance System</h2>
//       </div>
//       <!-- Login Form -->
//       <form class="space-y-4  text-xl">
//           <h3 class="mb-4 font-semibold text-center  text-[#1b263b]">Login</h3>

//           <!-- Username field -->
//           <div>
//               <input type="text" placeholder="Email"
//                   class="w-full rounded border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none" />
//           </div>
//           <!-- Username field -->
//           <div>
//               <input type="text" placeholder="UserName"
//                   class="w-full rounded border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none" />
//           </div>

//           <!-- Password field -->
//           <div>
//               <input type="password" placeholder="Password"
//                   class="w-full rounded border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none" />
//           </div>

//           <div>
//               <select
//                   class="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none">
//                   <option value="" disabled selected>Select User Type</option>
//                   <option value="admin">Admin</option>
//                   <option value="teacher">Teacher</option>
//                   <option value="student">Student</option>
//               </select>
//           </div>

//           <!-- Captcha -->
//           <div class="flex space-x-2">
//               <div class="flex w-1/3 items-center justify-center rounded bg-gray-300 px-4 py-2">
//                   <span class="font-medium text-[#415a77]">997087</span>
//               </div>
//               <input type="text" placeholder="Captcha"
//                   class="w-2/3 rounded border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#415a77] focus:outline-none" />
//           </div>

//           <!-- Buttons -->
//           <div class="grid grid-cols-2 gap-4 pt-2">
//               <button type="submit"
//                   class="cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Login</button>
//               <button type="button"
//                   class="cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Cancel</button>
//           </div>
//       </form>

//   </div>
// </div>

