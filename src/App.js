
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { routes } from "./routes/Routes";
import ChatLayout from "./layouts/chat/ChatLayout";
import MessageLayout from "./layouts/message/MessageLayout";
import { useSelector } from "react-redux";
import { setChatInfo } from "./redux/reducers/messageReducer";



function App() {
  
  const chatInfo = useSelector(state => state.message.chatInfo);
  const rejectState = () => {
    return setChatInfo({});
  }
  const data = {
    sidebar: <ChatLayout/>,
    content: <MessageLayout/>
  }
  return (
    <BrowserRouter>
    <Routes>
        {routes.map((route, index) => {
            const Page = route.component;
            return (
                <Route key={index} path={route.path} element={
                    route.path === "/chat" ?
                    <Page sidebar={data.sidebar} content={data.content} state={chatInfo} action={rejectState}/>
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
