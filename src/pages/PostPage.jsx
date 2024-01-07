import { useState,useEffect } from "react";
import {Link,useNavigate,useParams} from "react-router-dom"
import appwriteService from "../appwrite/service"
import Button from "../components/Button";
import Container from "../components/container/Container";
import { useSelector } from "react-redux";
import Parser from "html-react-parser";

function PostPage(){

    let [post,setPost]= useState(null);
    let {blogId} = useParams();
    let navigate= useNavigate();

    let userData= useSelector((state)=> state.auth.useData);
    let isAuthor= post && userData ? post.userId === userData.$id: false;

    useEffect(()=> {
        if(blogId){
            appwriteService.getDocument(blogId)
            .then((post)=>{
                if(post){
                    setPost(post);
                }else{
                    navigate("/");
                }
            })
        }
    },[blogId,navigate])

    const deletePost= ()=>{
        appwriteService.deletePost(blogId)
        .then((status)=>{
            if(status){
                appwriteService.deleteFile(post.blogImage);
                navigate("/");
            }
        })
    }
   
    return (
        post ?
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.previewFile(post.blogImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.blogTitle}</h1>
                </div>
                <div className="browser-css">
                    {Parser(post.blogData)}
                    </div>
            </Container>
        </div>
        :null
    )
    
}

export default PostPage;