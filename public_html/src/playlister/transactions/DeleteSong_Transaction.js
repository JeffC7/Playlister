import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initIndex, song) {
        super();
        this.model = initModel;
        this.index = initIndex;
        this.song = song;
    }

    doTransaction() {
        this.model.deleteSong(this.index);
    }
    
    undoTransaction() {
        this.model.addDeleteSong(this.index, this.song);
    }
}