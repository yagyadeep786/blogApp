import { useEffect,useState } from "react";
import appwriteService from "../appwrite/service"
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";


function HomePage(){

    const [posts,setPosts]= useState([]);
    useEffect(()=>{
        appwriteService.getDocumentList([])
        .then((data)=>{
            if(data){
                setPosts(data.documents);
            }
        })
    })
   
    if(posts === 0){
        return(
            <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }else{
        <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
    }
}


export default HomePage;