const teacherAdding = document.getElementById('add_Teacher');


teacherAdding.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg">
  <div class="title-name flex items-center h-full pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold">
    <h1>Add New Teacher</h1>
  </div>
</div>
<div class="flex justify-center items-center min-h-[103vh] max-sm:mx-2 h-auto m-6 text-lg text-[#1b263b]">
  <div class="h-auto w-[60%] max-sm:w-full">
    <div class="max-w-8xl flex flex-wrap justify-between gap-6 p-6 backdrop-blur-lg">
      <div class="w-full max-w-4xl rounded-lg bg-gray-200 p-6 shadow-md">
        <h2 class="p-4 rounded-lg text-lg max-sm:text-2xl font-semibold bg-[#415a77] text-[#e0e1dd]">
          TEACHER DETAILS
        </h2>
        <div class="w-full max-w-3xl rounded-b-lg bg-gray-200 pt-6 pb-6 text-xl max-sm:text-2xl">
          <form id="addTeacherForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700">First Name</label>
                <input id="FirstnameT" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="First Name">
              </div>
              <div>
                <label class="block text-gray-700">Last Name</label>
                <input id="LastnameT" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Last Name">
              </div>
              <div>
                <label class="block text-gray-700">Username</label>
                <input id="usernameT" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Username">
              </div>
              <div>
                <label class="block text-gray-700">Password</label>
                <input id="passwordT" type="password" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Password">
              </div>
              <div class="md:col-span-2">
                <label class="block text-gray-700">Subjects to Teach</label>
                <input id="subjectT" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Subjects">
              </div>
              <div class="md:col-span-2">
                <label class="block text-gray-700">Email Address</label>
                <input id="emailT" type="email" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="example@email.com">
              </div>
              <div>
                <label class="block text-gray-700">Mobile Phone</label>
                <input id="mobilePhoneT" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="+123456789">
              </div>
              <div>
                <label class="block text-gray-700">Office Phone</label>
                <input id="officePhoneT" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="+987654321">
              </div>
              <div class="md:col-span-2">
                <label class="block text-gray-700">Address</label>
                <input id="streetT" type="text" placeholder="Street Address" class="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                <input id="line2T" type="text" placeholder="Address Line 2" class="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input id="cityT" type="text" placeholder="City" class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                  <input id="stateT" type="text" placeholder="State" class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                  <input id="zipT" type="text" placeholder="Zip Code" class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                </div>
              </div>
              <div class="md:col-span-2">
                <label class="block text-gray-700">Bio/Notes</label>
                <textarea id="bioNotesT" class="w-full p-2 border border-gray-300 rounded-md min-h-[100px] focus:ring-2 focus:ring-[#415a77] focus:outline-none"></textarea>
              </div>
            </div>
            <div class="mt-4 flex justify-end gap-2">
              <button  type="submit" class="  save-teacher cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Save </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
`;


document.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('save-teacher')) return;

  console.log("Button clicked!");
  e.preventDefault();


  const FirstnameT = document.getElementById('FirstnameT').value;
  const LastnameT = document.getElementById('LastnameT').value;
  const usernameT = document.getElementById('usernameT').value;
  const passwordT = document.getElementById('passwordT').value;
  const emailT = document.getElementById('emailT').value;
  const mobilePhoneT = document.getElementById('mobilePhoneT').value;
  const officePhoneT = document.getElementById('officePhoneT').value;
  const subjectT = document.getElementById('subjectT').value;
  const streetT = document.getElementById('streetT').value;
  const line2T = document.getElementById('line2T').value;
  const cityT = document.getElementById('cityT').value;
  const stateT = document.getElementById('stateT').value;
  const zipT = document.getElementById('zipT').value;
  const bioNotesT = document.getElementById('bioNotesT').value || '';

  if (!FirstnameT || !LastnameT || !usernameT || !passwordT || !emailT || !mobilePhoneT || !officePhoneT || !subjectT || !streetT || !cityT || !stateT || !zipT) {
    alert("All fields are required.");
    return;
  }

  const payload = {
    Firstname: FirstnameT,
    Lastname: LastnameT,
    username: usernameT,
    password: passwordT,
    email: emailT,
    mobilePhone: mobilePhoneT,
    officePhone: officePhoneT,
    subjects: subjectT,
    address: {
      street: streetT,
      addressLine2: line2T,
      city: cityT,
      state: stateT,
      zipCode: zipT
    },
    bioNotes: bioNotesT
  };

  // console.log("Payload to be sent:", payload);
  try {
    const res = await fetch('http://localhost:8000/api/user/registerTeacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // console.log("Response received:", res);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error("Server error: " + errorText);
    }
    const result = await res.json();
    alert(result.message);
    document.getElementById("addTeacherForm").reset();
  } catch (err) {
    alert("error" , err.message || 'Failed to submit attendance');
    console.error(err);
  }
});




