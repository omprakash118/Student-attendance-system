/* ----------------------------------------------------------------
  0. CONFIG / CURRENT USER
---------------------------------------------------------------- */

const API_BASE        = "http://localhost:8000/api";
// These two values should come from your auth layer (e.g. JWT, localStorage)
const currentUserId   = localStorage.getItem("userId");
const currentUserRole = localStorage.getItem("userRole"); // "student" | "teacher" | "admin"

console.log("Current user:", currentUserId, currentUserRole);

if (!currentUserId || !currentUserRole) {
  console.error("Message list: missing current user info");
}

/* ----------------------------------------------------------------
  1. BUILD STATIC MARKUP (same as before)
---------------------------------------------------------------- */

const messlist = document.getElementById("message");

messlist.innerHTML = /* html */ `
  <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg">
    <div class="title-name flex items-center h-full pl-20 max-sm:pl-8 text-3xl font-bold">
      <h1>Message List</h1>
    </div>
  </div>

  <div class="flex justify-center items-start min-h-[100vh] h-auto m-6 max-sm:m-3 text-lg max-sm:text-2xl">
    <div class="w-[60%] max-sm:w-[95%]">
      <div class="w-full max-w-4xl rounded-lg bg-gray-200 p-6 shadow-md">
        <!-- header row -->
        <div class="mb-4 flex items-center justify-between">
          <button class="flex items-center cursor-pointer rounded-md bg-[#415a77] px-4 py-2 text-[#e0e1dd] transition hover:bg-[#778da944] hover:text-[#0d1b2a] active:scale-95 nav-link" data-target="messageForm">
            <i class="fa-solid fa-paper-plane mr-2 h-5 w-5"></i>
            Send Message
          </button>
          <input id="messageSearch" type="text" placeholder="Search…" class="w-1/4 max-sm:w-1/3 rounded-md border p-2 pl-5 font-bold text-[#0d1b2a]" />
        </div>

        <!-- table -->
        <table class="w-full border-collapse rounded-[8px] text-[#0d1b2a] text-lg max-sm:text-xl">
          <thead class="bg-[#415a77] text-white">
            <tr>
              <th class="p-3 text-left font-semibold uppercase">Recipient</th>
              <th class="p-3 text-left font-semibold uppercase">Message</th>
              <th class="p-3 text-left font-semibold uppercase">Sent</th>
            </tr>
          </thead>
          <tbody id="messageListS"></tbody>
        </table>

        <!-- pagination -->
        <div class="mt-4 flex items-center justify-between">
          <p class="text-[#8e9baa]" id="totalMessage"></p>
          <div class="flex space-x-2" id="msgPagination"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal placeholder -->
  <div id="messageDetails" class="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-50"></div>
`;

/* ----------------------------------------------------------------
  2. STATE
---------------------------------------------------------------- */

let allMessages      = [];   // full dataset (only *relevant* messages)
let filteredMessages = [];   // after search, before pagination
let msgCurrentPage   = 1;
const msgPerPage     = 10;

/* ----------------------------------------------------------------
  3. FETCH MESSAGES INVOLVING CURRENT USER
---------------------------------------------------------------- */

async function loadMessages() {
  try {
    // Prefer a backend filter (recommended) ---------------------
    const url = `${API_BASE}/message?userId=${currentUserId}&role=${currentUserRole}`;
    const res = await fetch(url);

    // console.log("Message list: loading messages from", url);  
    // console.log("response", res);
    if (res.ok) {
      const { data } = await res.json();
      allMessages = data;

      // console.log("Message list: loaded", allMessages.length, "messages");
      // console.log("Message list: allMessages", allMessages);
    } else {
      // Fallback: fetch *all* then filter on client -------------
      console.warn("/message?userId filter not available — fetching all and filtering client‑side");
      const res2 = await fetch(`${API_BASE}/message`);
      const { data } = await res2.json();
      allMessages = data.filter(m =>
        (m.senderId     === currentUserId && m.senderRole     === currentUserRole) ||
        (m.recipientId  === currentUserId && m.recipientRole  === currentUserRole)
      );
    }

    // Initialise filtered list & UI -----------------------------
    filteredMessages = [...allMessages];
    document.getElementById("totalMessage").textContent = `Total Messages: ${allMessages.length}`;
    renderMessageList();
    renderPagination();
  } catch (err) {
    console.error("Error loading messages:", err);
  }
}

/* ----------------------------------------------------------------
  4. RENDERERS
---------------------------------------------------------------- */

function renderMessageList(isReset = false) {
  const tbody = document.getElementById("messageListS");
  tbody.innerHTML = "";

  if(isReset){
      tbody.innerHTML = "";
  }

  const start = (msgCurrentPage - 1) * msgPerPage;
  const pageSlice = filteredMessages.slice(start, start + msgPerPage);

  pageSlice.forEach(m => {
    const who = (m.sender?.id === currentUserId
      ? `To: ${nameOf(m.recipient?.name, m.recipient?.role)}`
      : `From: ${nameOf(m.sender?.name, m.sender?.role)}`);

    tbody.insertAdjacentHTML("beforeend", `
      <tr class="border-b border-[#415a77] cursor-pointer hover:bg-gray-300 transition duration-200 active:scale-97" onclick="showMessageDetails('${m._id}')">
        <td class="p-3">${who}</td>
        <td class="p-3 truncate max-w-[22rem]">${m.messageBody}</td>
        <td class="p-3">${new Date(m.createdAt || m.sentAt).toLocaleString()}</td>
      </tr>`);
  });
}

function nameOf(possibleName, role) {
  if (possibleName) return possibleName;
  if (typeof role === "string") {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }
  return "Unknown";
}


function renderPagination() {
  const pag = document.getElementById("msgPagination");
  pag.innerHTML = "";
  const totalPages = Math.ceil(filteredMessages.length / msgPerPage) || 1;

  const btnClass = active => `px-3 py-1 rounded-md border border-[#415a77] text-sm font-medium transition-all
    ${active ? "bg-[#415a77] text-white" : "bg-white text-[#415a77] hover:bg-gray-200"}`;

  const makeBtn = (text, disabled, onClick, active = false) => {
    const b = document.createElement("button");
    b.textContent = text;
    b.disabled = disabled;
    b.className = btnClass(active);
    b.onclick = onClick;
    pag.appendChild(b);
  };

  makeBtn("Prev", msgCurrentPage === 1, () => { msgCurrentPage--; renderMessageList(); renderPagination(); });

  for (let i = 1; i <= totalPages; i++) {
    makeBtn(i, false, () => { msgCurrentPage = i; renderMessageList(); renderPagination(); }, i === msgCurrentPage);
  }

  makeBtn("Next", msgCurrentPage === totalPages, () => { msgCurrentPage++; renderMessageList(); renderPagination(); });
}


/* ----------------------------------------------------------------
  5. SEARCH
---------------------------------------------------------------- */

document.getElementById("messageSearch").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  filteredMessages = allMessages.filter(m =>
    m.messageBody.toLowerCase().includes(term) ||
    (m.subject && m.subject.toLowerCase().includes(term))
  );
  msgCurrentPage = 1;
  renderMessageList();
  renderPagination();
});

/* ----------------------------------------------------------------
  6. DETAILS MODAL
---------------------------------------------------------------- */

async function showMessageDetails(id) {
  try {
    const res = await fetch(`${API_BASE}/message/${id}`);
    const { data: msg } = await res.json();

    console.log("Message details:", msg);

    const modal = document.getElementById("messageDetails");
    modal.innerHTML = /* html */ `
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#000000cf] bg-opacity-50">
        <div class="h-auto w-[90%] max-w-xl rounded-lg bg-white p-6 shadow-lg">
          <h2 class="mb-4 text-xl font-bold">Message Details</h2>

          <div class="space-y-2 text-base text-gray-700">
            <p><strong>From:</strong> ${nameOf(msg.sender.name, msg.sender.role)}</p>
            <p><strong>To:</strong>   ${nameOf(msg.recipient.name, msg.recipient.role)}</p>
            <p><strong>Subject:</strong>   ${nameOf(msg.subject)}</p>
            <p><strong>Sent:</strong> ${new Date(msg.createdAt || msg.sentAt).toLocaleString()}</p>
            <p class="whitespace-pre-line break-words"><strong>Message:</strong><br>${msg.messageBody}</p>
          </div>
          <div class="mt-4 flex items-center justify-between gap-4">
            <button id="closeDetails" class="rounded-md bg-[#415a77] px-4 py-2 w-full text-[#e0e1dd] cursor-pointer transition hover:bg-[#1b263b] active:scale-95">Close</button>
            <button onclick="deleteMessageData('${msg._id}')" class="cursor-pointer rounded-md w-full border-none bg-red-700  px-4 py-2 text-red-100 transition duration-300 hover:bg-red-500 hover:text-red-50 active:scale-95 active:bg-red-900">Delete</button>
          </div>
          </div>
      </div>`;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    document.getElementById("closeDetails").onclick = () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    };
  } catch (err) {
    console.error("Error fetching message details:", err);
  }
};

/* ----------------------------------------------------------------
  7. INIT
---------------------------------------------------------------- */

async function deleteMessageData(msgID){
  console.log("Delete Button clicked");
  console.log("Message ID", msgID);

  try {
      const res = await fetch(`${API_BASE}/message/${msgID}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete Message");

      const modal = document.getElementById("messageDetails");

      modal.classList.add("hidden");

      renderMessageList(1);


  } catch (error) {
    console.log("Error in deleting message");
  }
}



loadMessages();
