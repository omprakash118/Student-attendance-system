const messageForm = document.getElementById('messageForm');

messageForm.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Message</h1>
        </div>
    </div>
<div class="flex justify-center items-start min-h-[100vh]  max-sm:ml-2 max-sm:mr-2 h-auto m-6 text-[#1b263b]">
    <div class="h-auto  w-[80%] max-sm:w-full  p-10 max-sm:p-4  rounded-2xl ">
        <div class="mx-auto mt-6 max-w-2xl rounded-lg  bg-gray-200 p-6 shadow-lg">
            <h2 class="p-4  rounded-lg  text-xl max-sm:text-2xl  bg-[#415a77] text-[#e0e1dd] mb-4">Add Notice</h2>
            <div class="w-full max-w-3xl rounded-b-lg bg-gray-200 pt-6 pb-6 text-xl  max-sm:text-2xl">
                <form id="messageForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2" for="recipient">To</label>
                        <div class="relative">
                            <select id="recipient"
                                class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md bg-gray-200 focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                                <option value="">Please Choose...</option>
                                <option value="students">Students</option>
                                <option value="class-students">Class Students</option>
                                <option value="teacher">Teacher</option>
                            </select>
                            <!-- <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            </div> -->
                        </div>
                    </div>

                    <div id="studentNameContainer" class="hidden">
                        <label class="block text-gray-700 font-semibold mb-2" for="studentName">Student Name</label>
                        <input type="text" id="studentName" placeholder="Enter student name"
                            class="w-full p-2 border border-gray-300 max-sm:mb-3.5 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" disabled>
                    </div>
                    <div id="teacherNameContainer" class="hidden">
                        <label class="block text-gray-700 font-semibold mb-2" for="studentName">Teacher Name</label>
                        <input type="text" id="teacherName" placeholder="Enter teacher name"
                            class="w-full p-2 border border-gray-300 max-sm:mb-3.5 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none" disabled>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2" for="subject">Subject</label>
                        <input type="text" id="subject" placeholder="Enter message subject"
                            class="w-full p-2 border border-gray-300 max-sm:mb-3.5 rounded-md focus:ring-2 focus:ring-[#415a77] focus:outline-none">
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2" for="message">Message</label>
                        <textarea id="message" rows="4" placeholder="Write your message here..."
                            class="w-full p-2 border border-gray-300 max-sm:mb-4 rounded-md min-h-[100px] focus:ring-2 focus:ring-[#415a77] focus:outline-none"></textarea>
                    </div>

                    <div class="flex justify-between items-center">
                        <div class="flex space-x-2">
                            <button type="button"
                                class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">
                                Cancel
                            </button>
                            <button type="submit"
                                class="cursor-pointer rounded-md border-none  bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">
                                Send Message
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

document.getElementById('recipient').addEventListener('change', function () {
    const studentNameContainer = document.getElementById('studentNameContainer');
    const studentNameInput = document.getElementById('studentName');
    const teacherNameContainer = document.getElementById('teacherNameContainer');
    const teacherNameInput = document.getElementById('teacherName');

    // Show/hide and enable/disable student name input based on selection
    if (this.value === 'students' || this.value === 'class-students') {
        studentNameContainer.classList.remove('hidden');
        studentNameInput.disabled = false;
    } else {
        studentNameContainer.classList.add('hidden');
        studentNameInput.disabled = true;
        studentNameInput.value = ''; // Clear the input
    }

    if(this.value === 'teacher'){
        teacherNameContainer.classList.remove('hidden');
        teacherNameInput.disabled = false;
    }
    else{
        studentNameContainer.classList.add('hidden');
        studentNameInput.disabled = true;
        studentNameInput.value = '';
    }
});

// Optional: Form submission handling
document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const studentName = document.getElementById('studentName').value;
    const teacherName = document.getElementById('teacherName').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (recipient === '') {
        alert('Please select a recipient');
        return;
    }

    if ((recipient === 'students' || recipient === 'class-students' || recipient === 'teacher') && studentName.trim() === '' && teacherName.trim() === '') {
        alert('Please enter a name');
        return;
    }

    // Here you would typically send the message via an API
    console.log('Sending message:', {
        recipient,
        studentName,
        teacherName,
        subject,
        message
    });

    alert('Message prepared for sending!');
});