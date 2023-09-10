import { useState, useCallback, useEffect, useContext } from "react";
import  "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
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

import { UserDetail, } from "../components/Comp";
import { auth ,db} from "../Firebase.config";
import { collection,doc,getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
function Chat() {
  // ---------------------------------------
  const [messageInputValue, setMessageInputValue] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchBoxStyle, setsearchBoxStyle] = useState({});
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
  const [userImage,setUserImage]= useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKrcXJbAstRhWT5TMNtvZOwZCa3-EGd0qZw&usqp=CAU')
  const [userName, setUserName] = useState("ibad");
  const [userData,setUserData]= useState(null);

  // updating on data changes
  useEffect(()=>{

   const fetchUserData =async ()=>{
    const userId = "uid";
    const userDocRef = doc(db, "users",userId);
    const docSnap = await getDoc(userDocRef);

    if(docSnap.exists()){
      const userDoc = docSnap.data();
      setUserData(userDoc);

    }else{
      console.log("No such user document found!");
    }
   }

   fetchUserData();



  },[]);

  console.log("Userdata=> ",userData);



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
 
  // updating image on UI
  const updateUserImage = (newImageUrl)=>{
    setUserImage(newImageUrl);
  }
  // update username on UI
  const updateUserName = (updatedUserName)=>{
    setUserName(updatedUserName);
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
            <Search placeholder="Search..." style={searchBoxStyle} />
            <ConversationList>
              <Conversation onClick={handleConversationClick}>
                <Avatar
                  src={
                    "https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                  }
                  name="Lilly"
                  status="available"
                  style={conversationAvatarStyle}
                />
                <Conversation.Content
                  name="Lilly"
                  lastSenderName="Lilly"
                  info="Yes i can do it for you"
                  style={conversationContentStyle}
                />
              </Conversation>
              
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
            </ConversationHeader>
            <MessageList>
              <MessageSeparator content="thursday, 15 July 2021" />
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
            <MessageInput value={messageInputValue} onChange={(innerHtml, textContent, innerText, nodes) =>{
              setMessageInputValue(innerText);
            }}
            onSend={(innerHtml, textContent, innerText, nodes)=>{
              if(innerText.trim() !== ""){
                console.log(messageInputValue);
                setMessageInputValue("");
              }
            }} 
             placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default Chat;
