const version = "0.2.0";

const fs = require("fs");
const path = require("path");

const infoFileName = process.argv[2];
const dirPath = path.dirname(fs.realpathSync(infoFileName));

let nodesToDelete = [];
const timeEpsilon = 0.16;

if (infoFileName) {
	let data = fs.readFileSync(infoFileName);

	if (data) {
		let info = JSON.parse(data);
		for (let difficultyBeatmapSet of info._difficultyBeatmapSets) {
			for (let difficultyBeatmap of difficultyBeatmapSet._difficultyBeatmaps) {
				const filePath = path.join(dirPath, difficultyBeatmap._beatmapFilename);
				let songData = fs.readFileSync(filePath);
				if (songData) {
					let song = JSON.parse(songData);
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
					
					// Ensure there are only so many notes per row as people have arms. 
					nodesToDelete = [];
					notes.forEach((note, index) => {
						let nextNotes = notes.slice(index + 1, index + 4);
						if (nextNotes.filter(neighborNote => Math.abs(note._time - neighborNote._time) < timeEpsilon).length > 1) {
							nodesToDelete.push(note);
						}
					});
					notes = notes.filter(note => !nodesToDelete.includes(note));
			
					song._notes = notes;
					songData = JSON.stringify(song);
					fs.writeFileSync(filePath, songData);
					console.log(`${difficultyBeatmap._beatmapFilename} converted to Ragnaröck!`);
				} else {
					console.error("ERROR: Failed to load beatmap file!");
				}
			}
		}
		if (!info._customData._editors) {
			info._customData._editors = {};
		}
		info._customData._editors.BeatSaber2Ragnarock = { 
			version: version,
			source: "https://github.com/voupidia/BeatSaber2Ragnarock"
		};
		info._customData._editors._lastEditedBy = "BeatSaber2Ragnarock";
		data = JSON.stringify(info, null, 4);
		fs.writeFileSync(infoFileName, data);
	} else {
		console.error("ERROR: Failed to load info file!");
	}
} else {
	console.error("ERROR: No file name given!");
}