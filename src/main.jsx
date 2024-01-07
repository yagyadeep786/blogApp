
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "../store/Store.js";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx"
import AllPostPage from "./pages/AllPostPage.jsx";
import AddPostPage from "./pages/AddPostPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import EditPostPage from "./pages/EditPostPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import AuthLayout from "./components/AuthLayout.jsx"
import { createBrowserRouter,RouterProvider } from "react-router-dom";


const router= createBrowserRouter([
    {
    path: "/",
    element: <App />,
    children:[
        {
            path:"/",
            element: <HomePage />
        },
        {
            path:"/login",
            element: (
                <AuthLayout authentication={false}>
                    <LoginPage></LoginPage>
                </AuthLayout>
            )

        },
        {
            path:"/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignupPage></SignupPage>
                </AuthLayout>
            )
        },
        {
            path: "/all-post",
            element: (
                <AuthLayout authentication={true}>
                <AllPostPage></AllPostPage>
            </AuthLayout>
            )
        },
        {
            path:"/add-post",
            element: (
                <AuthLayout authentication={true}>
                 <AddPostPage></AddPostPage>
            </AuthLayout>
            )
        },
        {
            path:"/edit-post/:blogId",
            element:(
                <AuthLayout authentication={true}>
                 <EditPostPage></EditPostPage>
            </AuthLayout>
            )
        },
        {
            path:"/post/:blogId",
            element:(
                 <PostPage></PostPage>
            )
        }
    ]
}]);



let root= ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={Store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
   
)