# BeatSaber2Ragnarock
This is a converter script for custom songs from [Beat Saber](https://store.steampowered.com/app/620980/Beat_Saber/ "Beat Saber Steam Page") to [Ragnaröck](https://store.steampowered.com/app/1345820/Ragnarock/ "Ragnaröck Steam Page") written in JavaScript.
When you want to play a song in Ragnaröck, nobody mapped yet but you can find it for Beat Saber ([i.e. BEAST SABER](https://bsaber.com/ "BEAST SABER website")), this script can help you to converting it to give you a base for improving upon.
But be aware, unedited converted scripts can never be as good, as original ones.
Some patterns just don't work that well in Ragnaröck.
- - -


## What it does
* Checking for and removing stacked notes, so the later steps don't produce multiple runes on top of each other
* Applying the important steps of the how-to-convert-map guide in the [RagnaSong Discord](https://discord.gg/vkbDDwhV "RagnaSong Discord Invite")
* Sanity checking for more than 2 runes in a row and deleting the extra ones (for example horizontal swipes in Beat Saber)
- - -


## How to use it
![How to use the script](images/howto.gif)

* You'll need to have [Node.js](https://nodejs.org/ "Node.js website") installed to execute JavaScript files locally
* Open a command line and [navigate](https://www.computerhope.com/issues/chusedos.htm "How to use the Windows command line") to the directory where you saved the [BeatSaber2Ragnarock.js](BeatSaber2Ragnarock.js) script
* Execute the [BeatSaber2Ragnarock.js](BeatSaber2Ragnarock.js) script with node and the info.dat of the song you want to convert as only argument
```
> node BeatSaber2Ragnarock.js C:\Path\To\Your\info.dat
```
* Play and improve upon the map :metal: