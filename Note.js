// Note.js

class Note {
    constructor(text) {
        this.text = text;
        this.timestamp = new Date().toLocaleString();
        this.createNoteElement();
    }

    createNoteElement() {
        const noteDiv = document.createElement("div");
        noteDiv.innerHTML = `
            <textarea>${this.text}</textarea>
            <button onclick="this.updateNote()">Update</button>
            <button onclick="this.removeNote()">Remove</button>
        `;
        document.getElementById("notesContainer").appendChild(noteDiv);
    }

    updateNote() {
        const textArea = this.getNoteTextArea();
        const updatedText = textArea.value;
        this.text = updatedText;
        this.timestamp = new Date().toLocaleString();
        textArea.value = updatedText;

        // Save the notes after updating
        this.saveNote();
    }

    removeNote() {
        const notesContainer = document.getElementById("notesContainer");
        notesContainer.removeChild(this.noteDiv); // Remove the note element itself

        // Remove the note from the notes array
        const index = notes.findIndex((note) => note === this);
        if (index !== -1) {
            notes.splice(index, 1);
        }

        // Save the notes after removal
        this.saveNote();
    }

    saveNote() {
        // Update the notes array in local storage
        localStorage.setItem("notes", JSON.stringify(notes));

        // Update the "Last saved" time
        const lastSaveTime = document.getElementById("lastSaveTime");
        const currentTime = new Date().toLocaleTimeString();
        lastSaveTime.textContent = `Last saved: ${currentTime}`;
    }
}

export default Note;
