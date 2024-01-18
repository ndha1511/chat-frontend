import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "./routes/Routes";
import {Fragment} from "react";
import DefaultLayout from "./components/defaultLayout/DefaultLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./pages/contact/menu/Menu";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            {routes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
               
                if(route.layout)
                    Layout = route.layout;
                else if (route.layout === null)
                    Layout = Fragment;
                return (
                    <Route key={index} path={route.path} element={
                        <Layout menu={Menu}>
                            <Page/>
                        </Layout>
                    }></Route>
                )
            })}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
