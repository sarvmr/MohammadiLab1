// Note.js
class Note {
    constructor(text, timestamp, showButtons = true) {
        this.text = text;
        this.timestamp = timestamp;
        this.createNoteElement(showButtons);
        if (showButtons) {
            this.addEventListeners();
        }
    }

    createNoteElement(showButtons) {
        this.noteDiv = document.createElement("div");
        let buttonsHtml = "";

        if (showButtons) {
            buttonsHtml = `
                <button class="updateButton">Update</button>
                <button class="removeButton">Remove</button>
            `;
        }

        this.noteDiv.innerHTML = `
            <textarea${showButtons ? "" : " readonly"}>${this.text}</textarea>
            ${buttonsHtml}
        `;
    }

    addEventListeners() {
        const updateButton = this.noteDiv.querySelector(".updateButton");
        const removeButton = this.noteDiv.querySelector(".removeButton");

        updateButton.addEventListener("click", () => this.update());
        removeButton.addEventListener("click", () => this.remove());
    }

    update() {
        this.text = this.noteDiv.querySelector("textarea").value;
        this.timestamp = new Date().toLocaleString();
        this.saveToLocalStorage();
    }

    remove() {
        this.noteDiv.remove();
        this.removeFromLocalStorage();
    }

    saveToLocalStorage() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const index = notes.findIndex((note) => note.timestamp === this.timestamp);

        if (index !== -1) {
            notes[index] = this;
        } else {
            notes.push(this);
        }

        localStorage.setItem("notes", JSON.stringify(notes));
    }

    removeFromLocalStorage() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = notes.filter((note) => note.timestamp !== this.timestamp);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }

    getNoteElement() {
        return this.noteDiv;
    }

    updateText() {
        this.noteDiv.querySelector("textarea").value = this.text;
    }
}

export default Note;
