// Retrieve existing notes from localStorage or initialize an empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];
const notesContainer = document.getElementById("notesContainer");
const lastSaveTime = document.getElementById("lastSaveTime");
// Attach event listener to the "Add Note" button
const addNoteButton = document.getElementById("addNoteButton");
addNoteButton.addEventListener("click", addNote);


// Function to display notes in the container
function displayNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.innerHTML = `
            <textarea id="noteText_${index}">${note.text}</textarea>
            <button onclick="updateNote(${index})">Update</button>
            <button onclick="removeNote(${index})">Remove</button>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

// Function to add a new note
function addNote() {
    const newNote = { text: "", timestamp: "" };
    notes.push(newNote);
    
    const noteDiv = document.createElement("div");
    noteDiv.innerHTML = `
        <textarea id="noteText_${notes.length - 1}"></textarea>
        <button onclick="updateNote(${notes.length - 1})">Update</button>
        <button onclick="removeNote(${notes.length - 1})">Remove</button>
    `;
    notesContainer.appendChild(noteDiv);

    // Push the "Add Note" button down
    const addButton = document.getElementById("addNoteButton");
    addButton.style.marginTop = "10px";

    // Save the notes
    saveNotes();
}

// Function to update a note
function updateNote(index) {
    const updatedNoteText = document.getElementById(`noteText_${index}`).value;
    notes[index].text = updatedNoteText;
    notes[index].timestamp = new Date().toLocaleString();
    displayNotes();
    saveNotes();
}

// Function to remove a note
function removeNote(index) {
    notes.splice(index, 1);
    displayNotes();
    saveNotes();
}

// Function to save notes to local storage and update last save time
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
    const currentTime = new Date().toLocaleTimeString();
    lastSaveTime.textContent = `Last saved: ${currentTime}`;
}

// Add an event listener to the "Back to Index" button
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to index.html
});

// Display initial notes
displayNotes();

// Automatically save notes every 2 seconds
setInterval(saveNotes, 2000);
