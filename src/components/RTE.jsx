import React from 'react'
import conf from "../conf/conf";
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({ name, control, label, defaultValue = "" }) {  // Real time editor (nothing more than a form)

    // We can directly use editor element "<Editor/> in return" for editor page. 
    // As we are creating it sepearte component, 
    // we need to pass its reference and that can be done by forwardref but better way to use Controller provided by react-hook-form.

    // That "control"(comes from react-hook-form) is responsible for taking 
    // all the states_from/control_of this component to that whatever react-form uses this component.
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"} // If name is not given then take "content" as name
                control={control} // it gives parent element, control goes to parent element
                rules={{ required: true }}

                // any change in this field, notify us along with render
                render={({ field: { onChange } }) => (
                    // here we will use element that needs to be rendered likke <Input>, <Button>, <Editor> or any element
                    <Editor
                        initialValue={defaultValue}
                        apiKey={conf.tinyapikey}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                            uploadcare_public_key: '59390de51edc84c06f91',
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />


        </div>
    )
}

export default RTE