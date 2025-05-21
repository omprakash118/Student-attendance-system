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
              <form id="addStudentForm">
                <div class="grid grid-cols-1 md:grid-cols-2  gap-4 ">
                  <div>
                      <label class="block text-gray-700 max-sm:mb-3.5">First Name</label>
                      <input id="FirstnameS" type="text" class="w-full p-2 border max-sm:mb-4 border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="First Name">
                  </div>
                  <div>
                    <label class="block text-gray-700 max-sm:mb-3.5">Last Name</label>
                    <input id="LastnameS" type="text" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Last Name">
                  </div>
                  <div>
                      <label class="block text-gray-700 max-sm:mb-3.5">Username</label>
                      <input id="usernameS" type="text" class="w-full p-2 border max-sm:mb-4 border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Username">
                  </div>
                  <div>
                    <label class="block text-gray-700 max-sm:mb-3.5">Password</label>
                    <input id="passwordS" type="password" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="Password">
                  </div>
                  <div class="md:col-span-2">
                      <label class="block text-gray-700 max-sm:mb-3.5">Class</label>
                      <select id="classAssignedS" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" required>
                        <option value=''>Select Class</option>
                    </select>
                  </div>

                  <div class="md:col-span-2">
                    <label class="block text-gray-700 max-sm:mb-3.5">Email Address</label>
                    <input id="emailS" type="email" class="w-full p-2 border border-gray-300 max-sm:mb-3.5 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="example@email.com">
                  </div>
                  <div>
                    <label class="block text-gray-700 max-sm:mb-3.5">Mobile Phone</label>
                    <input id="mobilePhoneS" type="text" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="+123456789">
                  </div>
                  <div>
                    <label class="block text-gray-700 max-sm:mb-3.5">Parents Phone</label>
                    <input id="parentPhoneS" type="text" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" placeholder="+987654321">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-gray-700 max-sm:mb-3.5">Address</label>
                    <input id="streetS" type="text" placeholder="Street Address" class="w-full p-2 max-sm:mb-3 border border-gray-300 rounded-md mb-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                    <input id="line2S" type="text" placeholder="Address Line 2" class="w-full p-2 max-sm:mb-3 border border-gray-300 rounded-md mb-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input id="cityS" type="text" placeholder="City" class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                      <input id="stateS" type="text" placeholder="State" class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                      <input id="zipS" type="text" placeholder="Zip Code" class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                </div>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-gray-700 max-sm:mb-3.5">Bio/Notes</label>
                    <textarea id="bioNotesS" class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md min-h-[100px] focus:ring-2 focus:ring-[#415a77] focus:outline-none"></textarea>
                  </div>
                </div>
                <div class="mt-4 flex justify-end gap-2">
              <button  type="submit" class="  save-student cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">Save </button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    
<!-- Toast Notification -->
<div id="toast-success-addStudent" class="fixed bottom-5 right-5 hidden items-center w-full max-w-xs p-4 text-green-100 bg-green-800 rounded-lg shadow-lg" role="alert">
  <svg class="w-6 h-6 mr-2 text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  <span class="font-medium">Student registered successfully!</span>
</div>

`


document.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('save-student')) return;

  console.log("Button clicked!");
  e.preventDefault();


  const FirstnameS = document.getElementById('FirstnameS').value;
  const LastnameS = document.getElementById('LastnameS').value;
  const usernameS = document.getElementById('usernameS').value;
  const passwordS = document.getElementById('passwordS').value;
  const emailS = document.getElementById('emailS').value;
  const mobilePhoneS = document.getElementById('mobilePhoneS').value;
  const parentPhoneS = document.getElementById('parentPhoneS').value;
  const classAssignedS = document.getElementById('classAssignedS').value || null;
  const streetS = document.getElementById('streetS').value;
  const line2S = document.getElementById('line2S').value;
  const cityS = document.getElementById('cityS').value;
  const stateS = document.getElementById('stateS').value;
  const zipS = document.getElementById('zipS').value;
  const bioNotesS = document.getElementById('bioNotesS').value || '';

  if (!FirstnameS || !LastnameS || !usernameS || !passwordS || !emailS || !mobilePhoneS || !parentPhoneS || !streetS || !cityS || !stateS || !zipS) {
    alert("All fields are required.");
    return;
  }

  const payload = {
    Firstname: FirstnameS,
    Lastname: LastnameS,
    username: usernameS,
    password: passwordS,
    email: emailS,
    mobilePhone: mobilePhoneS,
    parentsPhone: parentPhoneS,
    classAssigned: classAssignedS,
    address: {
      street: streetS,
      addressLine2: line2S,
      city: cityS,
      state: stateS,
      zipCode: zipS
    },
    bioNotes: bioNotesS
  };

  // console.log("Payload to be sent:", payload);
  try {
    const res = await fetch('http://localhost:8000/api/user/registerStudent', {
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
    console.log("Result received:", result);

    if (result.data.classAssigned !== null) {

      const studentID = result.data._id;
      const classID = result.data.classAssigned;
      console.log("Student ID:", studentID);
      console.log("Class ID:", classID);

      fetch('http://localhost:8000/api/class/add-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId : studentID, classId: classID })
      })
      .then(res => res.json())
      .then(data => {
        console.log('Student assigned to class:', data);
        // Optionally refresh the class view
      })
      .catch(err => console.error('Assign failed:', err));

    }

    showSuccessToastaddstu(); 
    // alert(result.message); 
    document.getElementById("addStudentForm").reset();
  } catch (err) {
    alert("error" , err.message || 'Failed to submit attendance');
    console.error(err);
  }
});


function showSuccessToastaddstu() {
  const toast = document.getElementById('toast-success-addStudent');
  toast.classList.remove('hidden');

  // Hide it after 3 seconds
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', async () => { 
  try {
    const res = await fetch("http://localhost:8000/api/class"); 

    const { data : classes } = await res.json();
    
    console.log("Classes fetched:", classes);

    classes.forEach((classItem) => {

      const option = document.createElement("option");
      option.value = classItem._id; 
      option.textContent = classItem.className;
      document.getElementById("classAssignedS").appendChild(option); 
      
      console.log("Option created:", option);
    });


  } catch (error) {
    console.error("Error fetching classes:", error);
  }
});