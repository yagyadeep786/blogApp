import {useState, useEffect} from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard"
import appwriteService from "../appwrite/service"


function AllPostPage(){

    const [posts,setPosts]= useState([]);

    useEffect(()=> {
        appwriteService.getDocumentList([])
        .then((posts)=>{
            if(posts){
                setPosts(posts.documents);
            }
        })
    },[])
    console.log(posts);
    return(
        <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
               {
                posts.map((post)=> (
                    <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
                ))
               }
            </div>
            </Container>
    </div>
    )
}

export default AllPostPage;