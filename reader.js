import Note from './Note.js';
// Function to retrieve and display notes from localStorage
function retrieveNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteList = document.getElementById("noteList");

    if (notes.length === 0) {
        noteList.innerHTML = "<p>No notes found.</p>";
    } else {
        noteList.innerHTML = "";
        notes.forEach((note, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>Note ${index + 1}:</strong> ${note.text} (Created: ${note.timestamp})`;
            noteList.appendChild(listItem);
        });
    }

    // Update the "Last retrieved" time
    const currentTime = new Date().toLocaleTimeString();
    const lastRetrieveTime = document.getElementById("lastRetrieveTime");
    lastRetrieveTime.textContent = `Last retrieved: ${currentTime}`;
}

// Add an event listener to the "Back to Index" button
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to index.html
});


// Retrieve and display notes initially
retrieveNotes();

// Automatically retrieve and display notes every 2 seconds
setInterval(retrieveNotes, 2000);
