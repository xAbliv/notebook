function saveNote() {
	var newNote = document.getElementById("newNote").value;
	var savedNotes = localStorage.getItem("notes");
	if (savedNotes !== null) {
		savedNotes += "\n" + newNote;
	} else {
		savedNotes = newNote;
	}
	localStorage.setItem("notes", savedNotes);
	alert("Note saved successfully!");
	document.getElementById("newNote").value = "";
	displayNotes();
}

function deleteNote(index) {
	var savedNotes = localStorage.getItem("notes");
	if (savedNotes !== null) {
		var notes = savedNotes.split("\n");
		notes.splice(index, 1);
		var updatedNotes = notes.join("\n");
		localStorage.setItem("notes", updatedNotes);
		displayNotes();
	}
}

function displayNotes() {
	var savedNotes = localStorage.getItem("notes");
	if (savedNotes !== null) {
		var notesList = document.getElementById("notesList");
		notesList.innerHTML = "";
		var notes = savedNotes.split("\n");
		for (var i = 0; i < notes.length; i++) {
			var note = notes[i];
			if (note !== "") {
				var noteElem = document.createElement("div");
				noteElem.setAttribute("class", "note");
				noteElem.innerHTML = note;
				var deleteBtn = document.createElement("button");
				deleteBtn.innerHTML = "Delete";
				deleteBtn.onclick = (function(index) {
					return function() {
						deleteNote(index);
					}
				})(i);
				noteElem.appendChild(deleteBtn);
				notesList.appendChild(noteElem);
			}
		}
	}
}

window.onload = function() {
	displayNotes();
};
