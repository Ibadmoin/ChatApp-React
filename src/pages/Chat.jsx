import { useState, useCallback, useEffect, useContext } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";

import { UserDetail } from "../components/Comp";
import { auth, db, storage } from "../Firebase.config";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  where,
  query,
  getDocs,
  onSnapshot,
  serverTimestamp,
  addDoc,
  arrayUnion,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { ChatOptions } from "../components/Comp";
import defaultUserImage from "../assets/images/fallback.png";
import { differenceInMinutes, formatDistanceToNow } from "date-fns";
function Chat() {
  // ---------------------------------------
  const [messageInputValue, setMessageInputValue] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [searchBoxStyle, setsearchBoxStyle] = useState({});
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
  const [userImage, setUserImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKrcXJbAstRhWT5TMNtvZOwZCa3-EGd0qZw&usqp=CAU"
  );

  const [userName, setUserName] = useState("chat user");
  const [userData, setUserData] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [lastSeen, setLastSeen] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState("");

  const AuthCurrentUser = useContext(AuthContext);
  const currentUser = AuthCurrentUser.currentUser;
  // ------------
  // User document Reference
  const userDocRef = doc(db, "users", `${currentUser.uid}`);
  // ------------
  // getting realtime user data here....
  //--------------------------
  const [inconmingUsers,setIncomingUsers]= useState([]);
  useEffect(() => {
    const unsub = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userDoc = docSnapshot.data();
        setUserData(userDoc);
        setUserName(userDoc.displayName);
        setUserImage(userDoc.profilePicture);
        setIncomingUsers(userDoc.chat);
        
        

        if (userDoc.contacts) {
          setContacts(userDoc.contacts);
        }
      } else {
        console.log("Fetching user data...");
      }
    });

    return () => unsub();
  }, [db]);
  // ---------------


  // set user online condition here....
  const targetUserRef = doc(db, "users", `9J09bEDJ3APAQZXariBpCJe608f1`);
  async function updateOnlineStatus(userIsOnline) {
    if (userIsOnline) {
      await updateDoc(targetUserRef, {
        OnlineStatus: true,
        lastSeen: null,
      });
    } else {
      await updateDoc(targetUserRef, {
        OnlineStatus: false,
        lastSeen: serverTimestamp(),
      });
    }
  }

  // make sure to add proper dependencies to avoid errors....

  //  useEffect(()=>{
  //   updateOnlineStatus(false)

  //  },[])
  //  online time conversion
  // Function to convert a timestamp to a "time ago" format;

  function calculateTimeAgo(timestamp) {
    const currentTimeStamp = new Date();
    const lastSeenTimestamp = new Date(timestamp.seconds * 1000);

    const minutesAgo = differenceInMinutes(currentTimeStamp, lastSeenTimestamp);
    if (minutesAgo < 1) {
      return "just now";
    } else {
      return formatDistanceToNow(lastSeenTimestamp);
    }
  }

  // to update chat id when a user is selected...
  useEffect(() => {
    getAllMessages(selectedChatId);
  }, [selectedChatId]);

  const [selectedUser, setSelectedUser] = useState(null);
  const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  const handleConversationClick = useCallback(
    (contactUser) => {
      // console.log(contactUser);
      setSelectedUser(contactUser);
      const chatId = genrateChatId(currentUser.uid, contactUser.uid);
      setSelectedChatId(chatId);

      if (sidebarVisible) {
        setSidebarVisible(false);
      }
    },
    [sidebarVisible, setSidebarVisible]
  );
  useEffect(() => {
    if (sidebarVisible) {
      setSidebarStyle({
        display: "flex",
        flexBasis: "auto",
        width: "100%",
        maxWidth: "100%",
      });
      setConversationContentStyle({
        display: "flex",
      });
      setsearchBoxStyle({
        display: "flex",
      });
      setConversationAvatarStyle({
        marginRight: "1em",
      });
      setChatContainerStyle({
        display: "none",
      });
    } else {
      setSidebarStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
      setChatContainerStyle({});
    }
  }, [
    sidebarVisible,
    setSidebarVisible,
    setConversationContentStyle,
    setConversationAvatarStyle,
    setSidebarStyle,
    setChatContainerStyle,
  ]);
  // upaloding image url function

  const uploadFile = (file, uid) => {
    return new Promise((resolve, reject) => {
      const mountainsRef = ref(storage, `ProfilePictures/${uid}`);
      const uploadTask = uploadBytesResumable(mountainsRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  // Convert base64 URL to Blob
  function dataURLtoBlob(dataURL) {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const byteCharacters = atob(parts[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  // updating image on UI
  const updateUserImage = async (newImageUrl) => {
    const file = dataURLtoBlob(newImageUrl);
    console.log(file);

    const imageUrl = await uploadFile(file, currentUser.uid);

    await updateDoc(userDocRef, {
      profilePicture: imageUrl,
    });
    setUserImage(newImageUrl);
  };
  // update username on UI
  const updateUserName = async (updatedUserName) => {
    await updateDoc(userDocRef, {
      displayName: updatedUserName,
    })
      .then(() => {
        setUserName(updatedUserName);
        console.log("name Updated");
      })
      .catch((err) => {
        console.log("Error updating name");
      });
  };
 


  // getting  user data from chat list;
   const createChat= async(userUid, otherUserUid,message) => {
     const otherUserDocRef = doc(db, "users", `${otherUserUid}`);
     const phoneNumberWithoutPlus = currentUser.phoneNumber.replace(/\+/g, '');
     console.log(phoneNumberWithoutPlus)


     const unsubs  = onSnapshot(otherUserDocRef, async(querySnapshot)=>{
      
      if(!querySnapshot?.data()?.contacts.includes(phoneNumberWithoutPlus)){

        const chatId = genrateChatId(userUid,otherUserUid);
        const chatDocRef = doc(db,"chats",chatId);
        const chatDocSnapshot = await getDoc(chatDocRef);

        if( chatDocSnapshot.exists()){
          const chatData =  chatDocSnapshot.data();
          const newMessage = message
            
          chatData.messages.push(newMessage);
          await updateDoc(chatDocRef,{
            messages:[...chatData.messages]
          });
        }else{
          await setDoc(chatDocRef, {
            participants: [userUid, otherUserUid],
            messages: [message], // Assuming `message` is the first message
          });
        }

       

        // updating incoming user uid to current user document...

        await updateDoc(doc(db,"users",otherUserUid),{
                  chat:arrayUnion(otherUserUid),
                });

               


      

     }else{
      console.log("already")
     }
    })
   
    
   };







   

const [renderedConverstions, setRenderedConverstions] = useState([]);
  useEffect(() => {
    const unSubFunction = [];
    const converstionComponents = [];
    const contactQueries = contacts.map((contact) =>
    query(collection(db, "users"), where("phoneNumber", "==", contact))
  );
    // adding query for new users in chat list
    const newUserQuery = inconmingUsers.map((newUser)=>
      query(collection(db, "users"), where("uid", "==",newUser ))
    );
    



  
    // here.....................



    // setting up real time listeners for each query

  newUserQuery.forEach((q)=>{
      const unsubscribe = onSnapshot(q,(querySnapshot)=>{
        querySnapshot.forEach(async(doc)=>{
          const newUser =doc.data();
          if(newUser){
         const uniqueKey = doc.id;
         const existingIndex = converstionComponents.findIndex(
           (component) => component.key === uniqueKey
        );

        if (existingIndex !== -1) {
          // Update the existing component in the array.
          converstionComponents[existingIndex] = (
            <Conversation
              key={uniqueKey}
              onClick={() => handleConversationClick(newUser)}
            >
              <Avatar
                src={newUser.profilePicture}
                name="Lilly"
                status={newUser.OnlineStatus ? "available" : "away"}
                style={conversationAvatarStyle}
              />
              <Conversation.Content
                name={newUser.displayName}
                lastSenderName="Lilly"
                info="Yes, I can do it for you"
                style={conversationContentStyle}
              />
            </Conversation>
          );
        } else {
          // Add a new component to the array.
          converstionComponents.push(
            <Conversation
              key={uniqueKey}
              onClick={() => handleConversationClick(newUser)}
            >
              <Avatar
                src={newUser.profilePicture}
                name="Lilly"
                status={newUser.OnlineStatus ? "available" : "away"}
                style={conversationAvatarStyle}
              />
              <Conversation.Content
                name={newUser.displayName}
                lastSenderName="Lilly"
                info="Yes, I can do it for you"
                style={conversationContentStyle}
              />
            </Conversation>
          );
        }

      };




        })
      })
    })
  
  




    // Set up real-time listeners for each query
    contactQueries.forEach((q) => {
      const unsubscribe = onSnapshot(q,async (querySnapshot) => {
        querySnapshot.forEach(async(doc) => {
          const contactUser = doc.data();
          
                 
          if (contactUser) {
            const uniqueKey = doc.id;
            const existingIndex = converstionComponents.findIndex(
              (component) => component.key === uniqueKey
            );

            if (existingIndex !== -1) {
              // Update the existing component in the array.
              converstionComponents[existingIndex] = (
                <Conversation
                  key={uniqueKey}
                  onClick={() => handleConversationClick(contactUser)}
                >
                  <Avatar
                    src={contactUser.profilePicture}
                    name="Lilly"
                    status={contactUser.OnlineStatus ? "available" : "away"}
                    style={conversationAvatarStyle}
                  />
                  <Conversation.Content
                    name={contactUser.displayName}
                    lastSenderName="Lilly"
                    info="Yes, I can do it for you"
                    style={conversationContentStyle}
                  />
                </Conversation>
              );
            } else {
              // Add a new component to the array.
              converstionComponents.push(
                <Conversation
                  key={uniqueKey}
                  onClick={() => handleConversationClick(contactUser)}
                >
                  <Avatar
                    src={contactUser.profilePicture}
                    name="Lilly"
                    status={contactUser.OnlineStatus ? "available" : "away"}
                    style={conversationAvatarStyle}
                  />
                  <Conversation.Content
                    name={contactUser.displayName}
                    lastSenderName="Lilly"
                    info="Yes, I can do it for you"
                    style={conversationContentStyle}
                  />
                </Conversation>
              );
            }
          }
        });

        // Update the state with the latest conversation components.
        setRenderedConverstions([...converstionComponents]);
      });

      unSubFunction.push(unsubscribe);
    });

 

    

  


    // Cleanup the listeners when the component unmounts
    return () => {
      unSubFunction.forEach((unsubscribe) => unsubscribe());
    };
  }, [contacts, db,setContacts]);

  // chat functions
  // =======================
  const genrateChatId = (senderUId, recieverUId) => {
    const sortedUid = [senderUId, recieverUId].sort();
    return `${sortedUid[0]}_${sortedUid[1]}`;
  };

  // getting messages here...
const [renderMessages, setRenderMessages] = useState([]);
  const getAllMessages = (chatId) => {
    const q = query(collection(db, "messages"), where("chatId", "==", chatId), orderBy("timestamp","asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      const messageComponents = messages.map((message,index) => {
        if (currentUser.uid === message.sender.userId) {
          // If the current user sent the message, render as outgoing
          return (
            <Message
              key={index}
              model={{
                message: message.content,
                sentTime: "15 mins ago", // Replace with the actual sent time
                sender: userName, // Use the current user's name
                direction: "outgoing",
                position: "single",
              }}
            />
          );
        } else {
          // If another user sent the message, render as incoming
          return (
            <Message
              key={index}
              model={{
                message: message.content,
                sentTime: "15 mins ago", // Replace with the actual sent time
                sender: selectedUser?.displayName, // Use the sender's name
                direction: "incoming",
                position: "single",
              }}
            />
          );
        }
      });
      setRenderMessages(messageComponents);
  
      console.log("messages==>", messages);
    });
  };
  // =======================

  // console.log("dasdas")
  return (
    <>
      <div
        style={{
          height: "100vh",
          position: "relative",
        }}
      >
        <MainContainer responsive>
          <Sidebar position="left" scrollable={false} style={sidebarStyle}>
            <UserDetail
              imgUrl={userImage}
              userName={userName}
              updateUserName={updateUserName}
              updateUserImage={updateUserImage}
            />
            <Search placeholder="Search User..." style={searchBoxStyle} />
            <ConversationList>{renderedConverstions}</ConversationList>
          </Sidebar>
          <ChatContainer style={chatContainerStyle}>
            <ConversationHeader>
              <ConversationHeader.Back onClick={handleBackClick} />
              <Avatar
                src={
                  selectedUser?.profilePicture
                    ? selectedUser?.profilePicture
                    : defaultUserImage
                }
                name="Zoe"
              />
              <ConversationHeader.Content
                userName={selectedUser?.displayName}
                // here.........
                info={
                  selectedUser?.OnlineStatus
                    ? "Active Now"
                    : selectedUser?.lastSeen
                    ? `${calculateTimeAgo(selectedUser.lastSeen)} ago`
                    : ""
                }
              />
              <ConversationHeader.Actions>
                <ChatOptions closeChat={() => setSidebarVisible(true)} />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList>
              <MessageSeparator content="thursday, 15 July 2023" />
              {renderMessages}
            </MessageList>
            <MessageInput
              value={messageInputValue}
              onChange={(innerHtml, textContent, innerText, nodes) => {
                setMessageInputValue(innerText);
              }}
              onSend={async (innerHtml, textContent, innerText, nodes) => {
                if (innerText.trim() !== "") {
                  console.log(messageInputValue);
                  console.log(selectedChatId);
                  const messagecontent = messageInputValue;
                  createChat(currentUser.uid, selectedUser.uid,messagecontent)
                  setMessageInputValue("");
                  const docRef = await addDoc(collection(db, "messages"), {
                    chatId: `${selectedChatId}`,
                    content: messagecontent,
                    sender: {
                      userId: currentUser.uid,
                    },
                    timestamp: serverTimestamp(),
                    status: "sent",
                    recipients: [
                      {
                        userId: currentUser.uid,
                      },
                      {
                        userId: selectedUser.uid,
                      },
                    ],
                    edited: false,
                    deleted: false,
                  });
                }
              }}
              placeholder="Type message here"
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default Chat;
