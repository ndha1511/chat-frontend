
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { routes } from "./routes/Routes";
import ChatLayout from "./layouts/chat/ChatLayout";
import MessageLayout from "./layouts/message/MessageLayout";
import { useSelector } from "react-redux";
import { setChatInfo } from "./redux/reducers/messageReducer";
import ContacLayoutMenu from "./layouts/contact/ContactLayoutMenu";
import ContentLayout from "./layouts/contact/ContentLayout";
import { useEffect, useState } from "react";
import { setViewContent } from "./redux/reducers/renderLayoutReducer";



function App() {
  
  const chatInfo = useSelector(state => state.message.chatInfo);
  const renderView = useSelector(state => state.renderView.viewIndex);
  const viewContent = useSelector(state => state.renderView.viewContent);
  const [viewCurrent, setViewCurrent] = useState(0);
  useEffect(() => {
    setViewCurrent(() => renderView);
  }, [renderView])
  const rejectState = () => {
    return setChatInfo({});
  }
  const hiddenViewContent = () => {
    return setViewContent({});
  }
  const page = [
    {
      sidebar: <ChatLayout/>,
      content: <MessageLayout/>,
      state: chatInfo,
      action: rejectState
    },
    {
      sidebar: <ContacLayoutMenu/>,
      content: <ContentLayout/>,
      state: viewContent,
      action: hiddenViewContent
    }
  ]
  return (
    <BrowserRouter>
    <Routes>
        {routes.map((route, index) => {
            const Page = route.component;
            return (
                <Route key={index} path={route.path} element={
                    route.path === "/chat" ?
                    <Page
                      sidebar={page[viewCurrent].sidebar} 
                      content={page[viewCurrent].content} 
                      state={page[viewCurrent].state} 
                      action={page[viewCurrent].action}
                    />
                    :
                    <Page/>
                }></Route>
            )
        })}
    </Routes>
</BrowserRouter>
  );
}

export default App;
