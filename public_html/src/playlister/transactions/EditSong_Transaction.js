import jsTPS_Transaction from "../../common/jsTPS.js"
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, oldIndex, oldTitle, oldArtist, oldYouTubeId, newTitle, newArtist, newYouTubeId) {
        super();
        this.model = initModel;
        this.oldIndex = oldIndex;
        this.oldTitle = oldTitle;
        this.oldArtist = oldArtist;
        this.oldYouTubeId = oldYouTubeId;

        this.newTitle = newTitle;
        this.newArtist = newArtist;
        this.newYouTubeId = newYouTubeId;
    }

    doTransaction() {
        this.model.editSong(this.oldIndex, this.newTitle, this.newArtist, this.newYouTubeId);
    }
    
    undoTransaction() {
        this.model.editSong(this.oldIndex, this.oldTitle, this.oldArtist, this.oldYouTubeId);
    }
}