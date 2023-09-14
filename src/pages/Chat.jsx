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
function Chat() {
  // ---------------------------------------
  const [messageInputValue, setMessageInputValue] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
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

  const AuthCurrentUser = useContext(AuthContext);
  const currentUser = AuthCurrentUser.currentUser;
  // ------------
  // User document Reference
  const userDocRef = doc(db, "users", `${currentUser.uid}`);
  // ------------

  // updating on data changes
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = currentUser.uid;
      const userDocRef = doc(db, "users", `${userId}`);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userDoc = docSnap.data();
        setUserData(userDoc);
        setUserName(userDoc.displayName);
        setUserImage(userDoc.profilePicture);
        if (userDoc.contacts) {
          setContacts(userDoc.contacts);
        }
      } else {
        console.log("No such user document found!");
      }
    };

    fetchUserData();
  }, [currentUser.uid]);

  // console.log("Userdata=> ", userData);
  const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  const handleConversationClick = useCallback(() => {
    if (sidebarVisible) {
      setSidebarVisible(false);
    }
  }, [sidebarVisible, setSidebarVisible]);
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

  // // getting user data from contact list here
  async function fetchContactsData(contactNumber) {
    const q = query(collection(db, "users"), where("phoneNumber", "==", contactNumber));
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      console.log("user found");
      const userData = querySnapshot.docs[0].data();
      return userData;
    }else{
      console.log('no user');
      return null;
    }

  }

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
            <ConversationList>
              {contacts.map((contact, index) => {
                // console.log("Contact:", contact); // Log the contact data to the console
             fetchContactsData(contact).then((contactUser)=>{
              if(contactUser){
                console.log(contactUser);
                return(
                  <Conversation onClick={handleConversationClick} key={index}>
                  <Avatar
                    src={
                      "https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                    }
                    name="Lilly"
                    status="away"
                    style={conversationAvatarStyle}
                  />
                  <Conversation.Content
                    name="Lilly"
                    lastSenderName="Lilly"
                    info="Yes, I can do it for you"
                    style={conversationContentStyle}
                  />
                </Conversation>

                )
              }else{
                console.log("lol uwaimo")
              }
             })


               
              })}
            </ConversationList>
          </Sidebar>
          <ChatContainer style={chatContainerStyle}>
            <ConversationHeader>
              <ConversationHeader.Back onClick={handleBackClick} />
              <Avatar
                src={
                  "https://static.vecteezy.com/system/resources/previews/011/484/063/original/boy-anime-avatar-free-vector.jpg"
                }
                name="Zoe"
              />
              <ConversationHeader.Content
                userName="Zoe"
                info="Active 10 mins ago"
              />
              <ConversationHeader.Actions>
                <ChatOptions closeChat={() => setSidebarVisible(true)} />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList>
              <MessageSeparator content="thursday, 15 July 2023" />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "single",
                }}
              />
            </MessageList>
            <MessageInput
              value={messageInputValue}
              onChange={(innerHtml, textContent, innerText, nodes) => {
                setMessageInputValue(innerText);
              }}
              onSend={(innerHtml, textContent, innerText, nodes) => {
                if (innerText.trim() !== "") {
                  console.log(messageInputValue);
                  setMessageInputValue("");
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
