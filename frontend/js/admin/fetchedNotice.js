async function fetchNoticeAndDisplay() {
    try {
      const res = await fetch(`http://localhost:8000/api/notice`); // Make sure this is correct
      const data = await res.json();
      const noticeData = data.data[0]; // If showing only first notice for now
  

      console.log("Notice data:", noticeData); // Debugging line
      document.getElementById("Title").textContent = noticeData.Title;
      document.getElementById("audience").textContent = "Audience: " + noticeData.audience;
      document.getElementById("description").textContent = noticeData.description;
      document.getElementById("dateIssued").textContent = "Date Issued: " + new Date(noticeData.dateIssued).toLocaleDateString();
  
      // Set file link if available
      const fileLink = document.getElementById("notices"); // or use a more specific selector if needed
      if (noticeData.files.length > 0) {
        fileLink.href = noticeData.files[0].fileUrl;
        fileLink.textContent = noticeData.files[0].fileName;
      } else {
        fileLink.textContent = "No file available";
        fileLink.href = "#";
      }
  
    } catch (err) {
      console.error("Error fetching notice:", err);
    }
  }
  
  fetchNoticeAndDisplay();
  