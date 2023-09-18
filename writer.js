import Note from "./Note.js";

const notesContainer = document.getElementById("notesContainer");
const addNoteButton = document.getElementById("addNoteButton");
const lastSaveTime = document.getElementById("lastSaveTime"); // Element for displaying last save time

addNoteButton.addEventListener("click", () => addNote());

function addNote() {
    const newNote = new Note("", "", true); // Include "update" and "remove" buttons
    notesContainer.appendChild(newNote.getNoteElement());
    updateLastSaveTime(); // Update the last save time when a new note is added
}

// Load notes from localStorage and display them
const notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.forEach((noteData) => {
    const note = new Note(noteData.text, noteData.timestamp);
    notesContainer.appendChild(note.getNoteElement());
});

// Add an event listener to the "Back to Index" button
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to index.html
});

// Function to update and display the last save time
function updateLastSaveTime() {
    const currentTime = new Date().toLocaleTimeString();
    lastSaveTime.textContent = `Last saved: ${currentTime}`;
}

// Automatically save notes every 2 seconds
setInterval(() => {
    notes.forEach((note, index) => {
        note.updateText(); // Update the text content of each note
        note.saveToLocalStorage(); // Save the notes to local storage
    });
    updateLastSaveTime();
}, 2000);