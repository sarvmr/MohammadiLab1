import Note from "./Note.js";

const noteList = document.getElementById("noteList");
const lastRetrieveTime = document.getElementById("lastRetrieveTime");

function retrieveNotes() {
    // Load notes from localStorage and display them
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    noteList.innerHTML = "";

    notes.forEach((noteData, index) => {
        const note = new Note(noteData.text, noteData.timestamp, false); // Exclude "update" and "remove" buttons
        noteList.appendChild(note.getNoteElement());
    });

    // Update the "Last retrieved" time
    const currentTime = new Date().toLocaleTimeString();
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
