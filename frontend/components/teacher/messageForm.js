
/* ----------------------------------------------------------------
  0. GLOBAL CONFIG
---------------------------------------------------------------- */

// const API_BASE        = "http://localhost:8000/api"; // adjust if needed
// const currentUserRole = "admin";                       // ← set dynamically

/* ----------------------------------------------------------------
  1. BUILD THE FORM MARKUP
---------------------------------------------------------------- */

const formShell = document.getElementById("messageForm");
formShell.innerHTML = `
  <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
    <div class="title-name flex items-center h-full pl-20 max-sm:pl-8 text-3xl font-bold">
      <h1>Message</h1>
    </div>
  </div>

  <div class="flex justify-center items-start min-h-[100vh] mx-4 h-auto m-6 text-[#1b263b]">
    <div class="w-full max-w-2xl p-6 rounded-2xl">
      <div class="rounded-lg bg-gray-200 p-6 shadow-lg">
        <h2 class="mb-4 rounded-lg bg-[#415a77] p-4 text-xl font-semibold text-[#e0e1dd] flex items-center justify-between">
          <span> Send Message  </span>
          <button id="closeMessageForm" class="float-right h-10 w-10  bg-[#e0e1dd] p-1  hover:text-[#e0e1dd] active:bg-[#8e9baa] hover:bg-[#658cb8] rounded-lg shadow-md  text-[#415a77] transition cursor-pointer  nav-link" data-target="message">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </h2>

        <form id="sendMessageForm" class="space-y-4">
          <!-- Recipient ROLE -->
          <div>
            <label class="mb-2 block font-semibold text-gray-700" for="recipientRole">Recipient Role</label>
            <select id="recipientRole" name="recipientRole" required
                    class="w-full rounded-md border border-gray-300 bg-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#415a77]">
              <option value="">Please choose…</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <!-- Recipient USER (populated dynamically) -->
          <div id="recipientUserWrap" class="hidden">
            <label id="recipientUserLabel" class="mb-2 block font-semibold text-gray-700" for="recipientUser">Recipient</label>
            <select id="recipientUser" name="recipientId" required
                    class="w-full rounded-md border border-gray-300 bg-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#415a77]">
              <option value="">Loading…</option>
            </select>
          </div>

          <!-- Subject -->
          <div>
            <label for="subject" class="mb-2 block font-semibold text-gray-700">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Enter subject"
                   required
                   class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#415a77]" />
          </div>

          <!-- Message Body -->
          <div>
            <label for="messageBody" class="mb-2 block font-semibold text-gray-700">Message</label>
            <textarea id="messageBody" name="messageBody" rows="4" placeholder="Write your message here…"
                      required
                      class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#415a77]"></textarea>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-2 pt-2">
            <button type="reset" class="rounded-md cursor-pointer bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600">Cancel</button>
            <button type="submit" class="rounded-md cursor-pointer bg-[#415a77] px-4 py-2 text-white transition hover:bg-[#1b263b]">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Toasts -->
  <div class="toast toast-message-success hidden fixed bottom-5 right-5  items-center max-w-xs rounded-lg bg-green-800 p-4 text-green-100 shadow-lg">
    <svg class="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span class="font-medium">Message sent successfully!</span>
  </div>

  <div class="toast toast-message-error hidden fixed bottom-5 right-5  items-center max-w-xs rounded-lg bg-red-800 p-4 text-red-100 shadow-lg">
    <svg class="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span class="font-medium">Failed to send message!</span>
  </div>
  `;

/* ----------------------------------------------------------------
  2. DATA CACHES
---------------------------------------------------------------- */

const cache = {
  student: [],
  teacher: [],
  admin:   [] // optional — depends on your API
};

/* ----------------------------------------------------------------
  3. DOM NODES
---------------------------------------------------------------- */

const roleSelect      = document.getElementById("recipientRole");
const userWrap        = document.getElementById("recipientUserWrap");
const userSelect      = document.getElementById("recipientUser");
const userLabel       = document.getElementById("recipientUserLabel");
const sendMessageForm = document.getElementById("sendMessageForm");

/* ----------------------------------------------------------------
  4. HELPERS
---------------------------------------------------------------- */

function showToastMessage(id) {
  const t = document.querySelector(id);
  t.classList.remove("hidden");
  t.classList.add("flex");
  setTimeout(() => {
    t.classList.add("hidden");
    t.classList.remove("flex");

  }, 3000);
}

function optionTemplate({ _id, Firstname, Lastname, username }) {
  const name = Firstname ? `${Firstname} ${Lastname ?? ""}`.trim() : username;
  return `<option value="${_id}">${name}</option>`;
}

async function fetchUsers(role) {
  if (cache[role]?.length) return cache[role]; // already cached
  try {
    const res = await fetch(`${API_BASE}/${role}`);
    const { data } = await res.json();
    cache[role] = data;
    return data;
  } catch (err) {
    console.error(`Error fetching ${role}s:`, err);
    showToast("toast-error");
    return [];
  }
}

async function populateRecipientList(role) {
  // Hide container until we load
  userWrap.classList.add("hidden");
  userSelect.innerHTML = "<option value>Loading…</option>";

  const list = await fetchUsers(role);
  if (!list.length) {
    userSelect.innerHTML = "<option value>— No users available —</option>";
    return;
  }

  userSelect.innerHTML = list.map(optionTemplate).join("\n");
  userLabel.textContent = role.charAt(0).toUpperCase() + role.slice(1) + " Name";
  userWrap.classList.remove("hidden");
}

/* ----------------------------------------------------------------
  5. EVENT LISTENERS
---------------------------------------------------------------- */

roleSelect.addEventListener("change", e => {
  const role = e.target.value;
  if (!role) {
    userWrap.classList.add("hidden");
    return;
  }
  populateRecipientList(role);
});

sendMessageForm.addEventListener("submit", async e => {
  e.preventDefault();

  // Basic validation (recipient role already required)
  const recipientRole = roleSelect.value;
  const recipientId   = userSelect.value;
  const recipientName = userSelect.options[userSelect.selectedIndex].text;
  const senderName   = localStorage.getItem('userName'); // replace with actual sender name


  console.log("Recipient Name:", recipientName);
  console.log("Sender Name:", senderName);
  if (!recipientId) {
    alert("Please choose a recipient.");
    return;
  }

  const payload = {
    senderName,     // optional
    senderId:       currentUserId, // replace with actual user ID
    senderRole:     currentUserRole,
    recipientName,  // optional
    recipientRole,  // student | teacher | admin
    recipientId,    // Mongo _id
    subject:        e.target.subject.value.trim(),
    messageBody:    e.target.messageBody.value.trim()
  };

  console.log("Sending message:", payload);

  try {
    const res = await fetch(`http://localhost:8000/api/message/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    console.log("Response:", res);
    if (!res.ok) throw new Error("Network response was not ok");

    // success
    showToastMessage(".toast-message-success");
    sendMessageForm.reset();
    userWrap.classList.add("hidden");

  } catch (err) {
    console.error("Error sending message:", err);
    showToast(".toast-message-error");
  }
});

/* ----------------------------------------------------------------
  6. INITIALISATION
---------------------------------------------------------------- */
// nothing to do until user picks a role, but you can preload caches:
Promise.all([
  fetchUsers("student"),
  fetchUsers("teacher")
  // fetchUsers("admin") // uncomment if you have an admin endpoint
]);
