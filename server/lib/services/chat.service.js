// todo: duplication
import firedb  from "../../_firebase";

class ChatService {

    constructor() {
        this.chatMessagesCollection = firedb.collection('chat-threads');
        this.userChatCollection = firedb.collection('user-chat-threads');
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    createChatThread(chatThread) {
        const doc = this.userChatCollection.doc();
        const docID = doc.id;
        chatThread.id = docID;
        return doc
            .set(chatThread)
            .then((documentSnapshot) => docID);
    }

    getMyChats(userID) {
        return this.userChatCollection
            .doc(userID)
            .collection("chatThreads")
            .get()
            .then(snapshot => 
                snapshot.docs.map((docSnapshot) => 
                docSnapshot.data()
            )
        );
    }

    getChatThread(userID, chatThreadID) {
        console.log(chatThreadID)
        return this.chatMessagesCollection
            // .doc(userID)
            // .collection("chatThreads")
            .doc(chatThreadID)
            .get()
            .then(docSnapshot => docSnapshot.data());
    }

    getMessagesForChat(userID, chatThreadID) {
        return this.chatMessagesCollection
            // .doc(userID)
            // .collection("chatThreads")
            .doc(chatThreadID)
            .collection("chatMessages")
            .get()
            .then(snapshot => 
                snapshot.docs.map((docSnapshot) => 
                  docSnapshot.data()
                )
            );
    }

    addMessageToThread(userID, chatMessage) {
        const doc = this.chatCollection.doc(userID).collection("chatThreads").doc(chatMessage.chatThreadID);
        const docID = doc.id;
        chatMessage.id = docID;
        return doc
            .set(chatMessage)
            .then((documentSnapshot) => docID);
    }

    deleteChatThread(userID, chatThreadID) {
        return this.chatCollection
            .doc(userID)
            .collection("chatThreads")
            .doc(chatThreadID)
            .delete()
            .then((documentSnapshot) => 
                documentSnapshot
            );
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

export default new ChatService();
