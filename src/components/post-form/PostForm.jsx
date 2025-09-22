import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from '../index';
import dataService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message"

function PostForm({ post }) { // user will send the "post" values after clicking edit option

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {

            title: post?.title || '',  // "post?.title" --> uses optional chaining to safely access the title property of post. If post is undefined or null, post?.title will return undefined instead of throwing an error.
            // " || '' " --> means: post?.title is undefined (i.e., there is no post or no title), then use an empty string as the default value.
            // This ensures that the title field is pre-filled with the post's title if editing, or left empty if creating a new post.

            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })  // to continously moniter a particular field --> watch is used
    // setValue-> to set values in form, pass this "control" to RTE -> the control of RTE comes here.


    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    // if user has submitted the form then data must have passed
    const submit = async (data) => {
        try {
            if (post) { // if post then update the post
                const file = data.image[0] ? dataService.uploadFile(data.image[0]) : null // file upload. image[0] --> 1st image
                if (file) { // if post was there then we need to delete the old/previous image
                    dataService.deleteFile(post.featuredImage)  // featuredImage var in db
                }

                const dbPost = await dataService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })  // overwrite only the featuredImage or slug value else others will have all values old and new.

                if (dbPost) {
                    alert("Post Updated")
                    navigate(`/post/${dbPost.$id}`);
                }
            } else { // Nothing to update as user wants to create new form. So, upload the new file given by user.
                const file = await dataService.uploadFile(data.image[0]); // For now we are not checking if file is there or not. For checking implement like above code.

                if (file) {
                    const fileId = file.$id
                    data.featuredImage = fileId // updated the data feautured image property
                    const dbPost = await dataService.createPost({ // sending all other properties
                        ...data,  // forms will never have userdata
                        userId: userData.$id

                    })
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }

            }

        } catch (error) {
            console.log("Postform :: error", error);
        }
    }

    // watch -> title, generate value in -> slug and User gives any space -> convert to "-"
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")

        return ""

    }, []) // it has dependency array but we don't need now.

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))  // set value in slug(input field name in form)
            }
        })
        return () => {
            subscription.unsubscribe(); // memory management for more optimization
        }


    }, [watch, slugTransform, setValue])
    return (
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
                    {...register("slug", { required: "Slug value is required" })}

                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <ErrorMessage
                    errors={errors}
                    name="slug"
                    render={({ message }) => <p className="text-red-400">{message}</p>}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}  // sets the field as required only if post is not present (i.e., when creating a new post).If post exists (editing), the image is not required.If post is undefined (creating), the image must be provided.
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dataService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
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

export default PostForm