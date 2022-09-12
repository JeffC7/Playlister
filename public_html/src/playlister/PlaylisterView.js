/**
 * PlaylisterView.js
 * 
 * This class deals with the view of our Web application providing services
 * for loading data into our controls and building other UI controls.
 * 
 * @author McKilla Gorilla
 * @author ?
 */

export default class PlaylisterView {
    constructor() {}

    /*
        init

        The user interface should start out with the editing buttons disabled.
    */
    init() {
        // @todo - ONCE YOU IMPLEMENT THE FOOLPROOF DESIGN STUFF YOU SHOULD PROBABLY
        // START THESE BUTTONS OFF AS DISABLED
        this.enableButton('add-button');
        this.enableButton('undo-button');
        this.enableButton('redo-button');
        this.enableButton('close-button');
    }

    /*
        setController

        We are using MVC so this view class requires the controller
        object so that once user interface controls are created we
        can initialize the proper event handlers for them.
    */
    setController(initController) {
        this.controller = initController;
    }

    /*
        refreshLists

        This function is called each time the number of lists or the names
        of lists change, like when a list is added, delete, or renamed. It
        simply rebuilds the cards in the sidebar list of playlists.
    */
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("sidebar-list");
        listsElement.innerHTML = "";

        // APPEND A SELECTION CARD FOR EACH PLAYLIST
        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendListToView(list);
        }
    }

    /*
        appendListToView

        Adds a playlist card to select from in the left sidebar.
    */
    appendListToView(newList) {
        // EACH CARD WILL HAVE A UNIQUE ID
        let listId = "playlist-" + newList.id;

        // MAKE THE CARD DIV
        let card = document.createElement("div");
        card.setAttribute("id", listId);
        card.setAttribute("class", "list-card");
        card.setAttribute("class", "unselected-list-card");

        // MAKE THE TEXT SPAN
        let textSpan = document.createElement("span");
        textSpan.setAttribute("id", "list-card-text-" + newList.id);
        textSpan.setAttribute("class", "list-card-text");
        textSpan.appendChild(document.createTextNode(newList.name));

        // MAKE THE DELETE LIST BUTTON FOR THIS CARD
        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("id", "delete-list-" + newList.id);
        deleteButton.setAttribute("class", "list-card-button");
        deleteButton.setAttribute("value", "🗑");

        // PUT EVERYTHING IN THE MOST OUTER DIV
        card.appendChild(textSpan);
        card.appendChild(deleteButton);

        // AND PUT THE NEW CARD INTO THE LISTS DIV
        let listsElement = document.getElementById("sidebar-list");
        listsElement.appendChild(card);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        this.controller.registerListSelectHandlers(newList.id);
    }

    /*
        refreshPlaylist

        Called each time a song is added, removed, moved, or updated,
        this function rebuilds all the song cards for the playlist.
    */
    refreshPlaylist(playlist) {
        // CLEAR OUT THE OLD SONG CARDS
        let itemsDiv = document.getElementById("playlist-cards");
        itemsDiv.innerHTML = "";

        // FOR EACH SONG
        for (let i = 0; i < playlist.songs.length; i++) {
            // MAKE AN ITEM (i.e. CARD)
            let song = playlist.getSongAt(i);
            let itemDiv = document.createElement("div");
            let a = document.createElement('a'); 
            itemDiv.classList.add("list-card");
            itemDiv.classList.add("unselected-list-card");
            itemDiv.id = "playlist-card-" + (i + 1);

            let delButton = document.createElement("input"); // what i wrote
            delButton.setAttribute('type', 'button'); // what i wrote
            delButton.setAttribute('value', 'X'); // what i wrote
            delButton.classList.add("list-card-button");
            // HANDLES DELETING A SONG
            delButton.onmousedown = (event) => { 
                // DON'T PROPOGATE THIS INTERACTION TO LOWER-LEVEL CONTROLS
                this.controller.ignoreParentClick(event);
    
                // RECORD THE ID OF THE SONG THE USER WISHES TO DELETE
                // SO THAT THE MODAL KNOWS WHICH ONE IT IS
                this.controller.model.setDeleteSongId(i);
    
                // VERIFY THAT THE USER REALLY WANTS TO DELETE THE SONG
                // THE CODE BELOW OPENS UP THE SONG DELETE VERIFICATION DIALOG
                let songName = this.controller.model.currentList.songs[i];
                let deleteSpan = document.getElementById("delete-song-span");
                deleteSpan.innerHTML = "";
                deleteSpan.appendChild(document.createTextNode(songName.title));
                let deleteListModal = document.getElementById("delete-song-modal");
    
                // OPEN UP THE DIALOG
                deleteListModal.classList.add("is-visible");
                this.controller.model.toggleConfirmDialogOpen();
                
            }

            // PUT THE CONTENT INTO THE CARD
            let itemText = document.createTextNode(song.title + " by " + song.artist);
            let itemNumberText = document.createTextNode((i + 1) + ". "); // what i wrote
            itemDiv.appendChild(itemNumberText); // what i wrote
            a.href = "https://www.youtube.com/watch?v=" + song.youTubeId; // what i wrote               
            a.appendChild(itemText);
            //itemDiv.appendChild(itemText); this is mckenna's 
            itemDiv.appendChild(a); // what i wrote
            itemDiv.appendChild(delButton); // what i wrote
            

            // AND PUT THE CARD INTO THE UI
            itemsDiv.appendChild(itemDiv);
        }
        // NOW THAT THE CONTROLS EXIST WE CAN REGISTER EVENT
        // HANDLERS FOR THEM
        this.controller.registerItemHandlers();
    }

    /*
        clearWorkspace

        This removes all the songs from workspace, which should be
        done whenever a list is closed.
    */
    clearWorkspace() {
        // REMOVE THE ITEMS        
        let itemsDiv = document.getElementById("playlist-cards");
        itemsDiv.innerHTML = "";
    }

    /*
        disableButton

        This function disables the button that has the id parameter
        as it's id property. This should be done as part of a foolproof
        design strategy.
    */
    disableButton(id) {
        let button = document.getElementById(id);
        button.classList.add("disabled");
        button.disabled = true;
    }

    /*
        enableButton

        This function enables the button that has the id parameter
        as it's id property. This should be done as part of a foolproof
        design strategy.
    */    
   enableButton(id) {
        let button = document.getElementById(id);
        button.classList.remove("disabled");
        button.disabled = false;
    }

    /*
        highlightList

        Changes the background of a list card to make it look selected.
    */
    highlightList(listId) {
        // HIGHLIGHT THE LIST
        let listCard = document.getElementById("playlist-" + listId);
        listCard.classList.remove("unselected-list-card");
        listCard.classList.add("selected-list-card");
    }

    /*
        unhighlightList

        Changes the background of a list card so it doesn't look selected.
    */
    unhighlightList(listId) {
        // HIGHLIGHT THE LIST
        let listCard = document.getElementById("playlist-" + listId);
        listCard.classList.add("unselected-list-card");
        listCard.classList.remove("selected-list-card");
    }

    /*
        updateToolbarButtons

        Implements our foolproof design strategy so that when toolbar
        buttons cannot be used they are disabled.
    */
    updateToolbarButtons(model) {
        let tps = model.tps;
        if (model.confirmDialogOpen) {
            this.disableButton('add-button');
            this.disableButton("add-list-button");
            this.disableButton("undo-button");
            this.disableButton("redo-button");
            this.disableButton("close-button");
        } else {
            if (model.hasCurrentList()) {
                this.enableButton("add-button");
                this.enableButton("close-button");
                this.disableButton("add-list-button");
            } else {
                this.disableButton("add-button");
                this.disableButton("close-button");
                this.enableButton("add-list-button");
            }

            if (tps.hasTransactionToUndo()) {
                this.enableButton("undo-button");
            } else {
                this.disableButton("undo-button");
            }

            if (tps.hasTransactionToRedo()) {
                this.enableButton("redo-button");
            } else {
                this.disableButton("redo-button");
            }
        }
    }

    /*
        updateStatusBar

        Displays the name of the loaded list in the status bar.
    */
    updateStatusBar(model) {
        let statusBar = document.getElementById("statusbar");
        if (model.hasCurrentList()) {
            statusBar.innerHTML = model.currentList.getName();
        } else {
            statusBar.innerHTML = '';
        }
    }
}