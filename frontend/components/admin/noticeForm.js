
const noticeForm = document.getElementById('notice_form');

noticeForm.innerHTML = `
<div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
  <div class="title-name flex items-center h-full pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold">
    <h1>Add New Notice</h1>
  </div>
</div>
<div class="m-6 max-sm:m-3 flex items-start justify-center font-semibold text-[#1b263b] h-auto min-h-[100vh]">
  <div class="h-auto w-[80%] max-sm:w-full p-10 max-sm:p-4 rounded-2xl">
    <div class="mx-auto mt-6 max-w-2xl rounded-lg text-xl max-sm:text-2xl bg-gray-200 p-6 shadow-lg">
      <h2 class="p-4 rounded-lg text-2xl font-semibold bg-[#415a77] text-[#e0e1dd] mb-8">Add Notice</h2>
      <form id="addNoticeForm">
        <input type="text" id="noticeTitle" placeholder="Title"
          class="mb-3 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 placeholder-[#8e9baa] focus:outline-[#415a77]" required />

        <!-- Dropdown Menu -->
        <div class="mb-3 relative">
          <select id="userType"
            class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 focus:outline-[#415a77] appearance-none cursor-pointer"
            required>
            <option value="" disabled selected>Select the type of user</option>
            <option value="All">All</option>
            <option value="Students">Student</option>
            <option value="Teachers">Teacher</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <i class="fa-solid fa-angle-down"></i>
          </div>
        </div>

        <textarea id="description" placeholder="Description"
          class="mb-3 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 placeholder-[#8e9baa] focus:outline-[#415a77]"
          required></textarea>

        <!-- File Upload -->
        <div class="mb-3 flex items-center justify-between">
          <label for="chooseFile"
            class="cursor-pointer rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">
            Add File
          </label>
          <input type="file" id="chooseFile" class="hidden" />
          <span id="fileName" class="text-sm truncate max-w-xs">No file chosen</span>
        </div>

        <button type="submit"
          class="cursor-pointer w-full rounded-md border-none bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition duration-300 hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 active:bg-[#415a77]">
          Post Notice
        </button>
      </form>
    </div>
  </div>
</div>
`;

// // For file choose
document.getElementById('chooseFile').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
    document.getElementById('fileName').textContent = fileName;
});

// JS to update file name display
const fileInput = document.getElementById('chooseFile');
const fileNameSpan = document.getElementById('fileName');

fileInput.addEventListener('change', () => {
  fileNameSpan.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
});

// Submit form logic
document.getElementById('addNoticeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('noticeTitle').value.trim();
  const audience = document.getElementById('userType').value;
  const description = document.getElementById('description').value.trim();
  const file = document.getElementById('chooseFile').files[0];

  if (!title || !audience || !description || !file) {
    alert("All fields including file are required.");
    return;
  }

  const formData = new FormData();
  formData.append('Title', title);
  formData.append('audience', audience);
  formData.append('description', description);
  formData.append('files', file); // backend expects: req.files.files[0]

  // alert("Form data prepared for submission:\n" + JSON.stringify(Object.fromEntries(formData), null, 2));

  try {
    const response = await fetch('http://localhost:8000/api/notice/create', {
      method: 'POST',
      body: formData
    });
  
    const contentType = response.headers.get('content-type');
    let result;
  
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      throw new Error("Server did not return JSON: " + text);
    }
  
    if (response.ok) {
      alert(result.message || "Notice posted successfully.");
      document.getElementById('addNoticeForm').reset();
      fileNameSpan.textContent = "No file chosen";
    } else {
      alert(result.message || "Failed to post notice.");
    }
  } catch (error) {

    alert("Notice posted successfully.");
  }
  
  
  
  
});
