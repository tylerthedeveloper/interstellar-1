// todo: duplication
import firedb  from "../../_firebase";

class ChatService {

    constructor() {
        this.chatThreadsCollection = firedb.collection('chat-threads');
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    createChatThread(chatThread) {
        const doc = this.chatThreadsCollection.doc();
        const docID = doc.id;
        chatThread.chatThreadID = docID;
        console.log(docID)
        return doc
            .set(chatThread)
            .then((documentSnapshot) => docID);
    }

    // todo: verify this makes sense here 
    getMyChats(userID) {
        return this.chatThreadsCollection
            .where('chatPerson1', '==', userID)
            .get()
            .then(snapshot => 
                snapshot.docs.map((docSnapshot) => 
                    docSnapshot.data()
            )            
        )
        .then(firstColDocs => 
            this.chatThreadsCollection
                .where('chatPerson2', '==', userID)
                .get()
                .then(snapshot => 
                    firstColDocs.concat(
                        snapshot.docs.map(
                            (docSnapshot) => 
                                docSnapshot.data())
                    )
                )
            )
    }

    getChatThread(chatThreadID) {
        return this.chatThreadsCollection
            .doc(chatThreadID)
            .get()
            .then(docSnapshot => docSnapshot.data());
    }

    getMessagesForChat(chatThreadID) {
        return this.chatThreadsCollection
            .doc(chatThreadID)
            .collection("chatMessages")
            .get()
            .then(snapshot => 
                snapshot.docs.map((docSnapshot) => 
                  docSnapshot.data()
                )
            );
    }

    addMessageToThread(chatMessage) {
        const doc = this.chatThreadsCollection.doc(chatMessage.chatThread).collection("chatMessages").doc();
        const docID = doc.id;
        chatMessage.chatMessageID = docID;
        console.log(chatMessage)
        return doc
            .set(chatMessage)
            .then((documentSnapshot) => docID);
    }

    // todo: test for nested collection
    // todo: decide if we want to allow this
    // todo see above, how we decide who gets to delete?...
    deleteChatThread(chatPerson1, chatPerson2, chatThreadID) {
        // const batch = firedb.batch();
        // batch.
        // return this`
        //     // .where('chatPerson1', '==',`rson1)
        //     // .where('chatPerson2', '==',`rson2)
        //     .doc(chatThreadID)
        //     // .collection("chatThreads")
        //     // .delete()
        //     .set(null)
        //     .then((documentSnapshot) => 
        //         documentSnapshot
        //     );
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

export default new ChatService();
