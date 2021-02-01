const fs = require("fs");
const path = require("path");

// const argv = process.argv.slice(2);
// const filename = argv[0];
const filename = process.argv[2];
let nodesToDelete = [];
const timeEpsilon = 0.11;

if (filename) {
	let data = fs.readFileSync(filename);

	if (data) {
		let song = JSON.parse(data);
		let notes = song._notes;

		// Eliminate vertical stacked notes before squashing all into one line layer to avoid double notes
		notes.forEach((note, index) => {
			let nextNotes = notes.slice(index + 1, index + 4);
			if (nextNotes.filter(neighborNote => Math.abs(note._time - neighborNote._time) < timeEpsilon && neighborNote._lineIndex === note._lineIndex).length > 0) {
				nodesToDelete.push(note);
			}
		});
		notes = notes.filter(note => !nodesToDelete.includes(note));
		
		// squash all notes into line layer 1, make them red, set cut direction to downward
		notes.forEach(note => {
			note._type = 0;
			note._cutDirection = 1;
			note._lineLayer = 1;
		});
		
		// Ensure there are only so many notes per line as people have arms. 
		nodesToDelete = [];
		notes.forEach((note, index) => {
			let nextNotes = notes.slice(index + 1, index + 4);
			if (nextNotes.filter(neighborNote => Math.abs(note._time - neighborNote._time) < timeEpsilon).length > 1) {
				nodesToDelete.push(note);
			}
		});
		notes = notes.filter(note => !nodesToDelete.includes(note));

		song._notes = notes;
		data = JSON.stringify(song);
		fs.writeFileSync(filename, data);
		console.log(`${filename} converted to Ragnaröck!`);
	} else {
		console.error("ERROR: Failed to load file!");
	}
} else {
	console.error("ERROR: No file name given!");
}