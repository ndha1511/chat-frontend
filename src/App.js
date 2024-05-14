
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { routes } from "./routes/Routes";
import ChatLayout from "./layouts/chat/ChatLayout";
import MessageLayout from "./layouts/message/MessageLayout";
import { useSelector } from "react-redux";
import { setChatInfo } from "./redux/reducers/messageReducer";
import ContacLayoutMenu from "./layouts/contact/ContactLayoutMenu";
import ContentLayout from "./layouts/contact/ContentLayout";
import { setViewContent } from "./redux/reducers/renderLayoutReducer";
import 'zmp-ui/image-viewer/styles/image-viewer.css';




function App() {
  
  const chatInfo = useSelector(state => state.message.chatInfo);
  const renderView = useSelector(state => state.renderView.viewIndex);
  const viewContent = useSelector(state => state.renderView.viewContent);
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
                      sidebar={page[renderView].sidebar} 
                      content={page[renderView].content} 
                      state={page[renderView].state} 
                      action={page[renderView].action}
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
