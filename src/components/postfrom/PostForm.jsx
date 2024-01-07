import React,{useCallback, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import Button from "../Button"
import Input from "../Input"
import Select from "../SelectBtn"
import RTE from "../RTE"
import appwriteService from "../../appwrite/service"
import {useForm} from "react-hook-form"
import {useSelector} from "react-redux"


function PostForm({post}){
    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title: post?.blogTitle || "",
            content: post?.blogData || "",
            status: post?.blogStatus || ""
        }
    });

    const navigate= useNavigate();
    const userData= useSelector((state)=> state.auth.userData);

     console.log(userData.$id)
    const submit= async (data)=>{
        // if use want to update his post
        console.log(data);
        if(post){
            // upload updated image file
            const file= data.image[0] ? await appwriteService.uploadFile(data.image[0]) : "";
            
            // if succefully upload new image file then delete old image file
            if(file){
                await appwriteService.deleteFile(post.blogImage);
            }

            const dbPost= appwriteService.updatePost(post.$id,{
                ...data ,
                blogImage:file ? file.$id : undefined
            })

            if(dbPost){
                navigate(`/post/${post.$id}`);
            }
        }else{
            const file= await appwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId= file.$id;
                data.image= fileId;
                data.status= Boolean(data.status);
                const dbPost= await appwriteService.createPost({...data,blogUserId:userData.$id});

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform= useCallback((value)=>{

        if(value && typeof value == "string"){
            return(
                value.trim().toLowerCase().replace(/\s/g,"-")
            )
        }
        else{
            return "";
        }
    },[])

    useEffect(()=>{

         watch((value,{name})=>{
            if(name == "title"){
                setValue("slug",slugTransform(value.title));
            }
        })
    },[setValue,slugTransform,watch])

    /// in simple way

    // useEffect(()=>{
    //     setValue("slug",slugTransform(getValues("title")))
    // },[watch("title")])


    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value));
                    }}
                />
                <RTE label="Editor :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.blogImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["true", "false"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm;