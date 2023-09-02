import { useState, useCallback, useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
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

function Chat() {
  // ---------------------------------------
  const [messageInputValue, setMessageInputValue] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchBoxStyle, setsearchBoxStyle] = useState({});
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});

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
              imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKrcXJbAstRhWT5TMNtvZOwZCa3-EGd0qZw&usqp=CAU"
              userName="Muhammad Ibad moin"
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
            <MessageInput placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default Chat;
