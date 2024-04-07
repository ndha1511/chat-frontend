
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



function App() {
  
  const chatInfo = useSelector(state => state.message.chatInfo);
  const renderView = useSelector(state => state.renderView.viewIndex);
  const [viewCurrent, setViewCurrent] = useState(0);
  useEffect(() => {
    setViewCurrent(() => renderView);
  }, [renderView])
  const rejectState = () => {
    return setChatInfo({});
  }
  const data = [
    {
      sidebar: <ChatLayout/>,
      content: <MessageLayout/>
    },
    {
      sidebar: <ContacLayoutMenu/>,
      content: <ContentLayout/>
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
                    <Page sidebar={data[viewCurrent].sidebar} content={data[viewCurrent].content} state={chatInfo} action={rejectState}/>
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
