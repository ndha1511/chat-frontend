
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { routes } from "./routes/Routes";
import ChatLayout from "./layouts/chat/ChatLayout";
import MessageLayout from "./layouts/message/MessageLayout";



function App() {
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
                    <Page sidebar={data.sidebar} content={data.content}/>
                }></Route>
            )
        })}
    </Routes>
</BrowserRouter>
  );
}

export default App;
