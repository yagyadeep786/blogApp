import { useEffect,useState } from "react";
import Container from "../components/container/Container";
import PostForm from "../components/postfrom/PostForm";
import appwriteService from "../appwrite/service"
import { useNavigate,useParams } from "react-router-dom";


function EditPostPage(){

    let [post,setPost]= useState(null);
    let navigate= useNavigate();
    let {blogId}= useParams();

    useEffect(()=>{
        appwriteService.getDocument(blogId)
        .then((data)=>{
            setPost(data);
        })
    },[blogId,navigate])
    return(
       {post} ? 
       <div className="py=8">
        <Container>
            <PostForm post={post} ></PostForm>
        </Container>
       </div>
       : null
    )
}

export default EditPostPage;