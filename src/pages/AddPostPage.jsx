import Container from "../components/container/Container";
import PostForm from "../components/postfrom/PostForm";

function AddPostPage(){

    return(
        <div className="py-8">
            <Container>
                <PostForm></PostForm>
            </Container>
        </div>
    )
}

export default AddPostPage;