// preview as card and after clicking on it then further we can read whole article
import React from 'react'
import dataService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) { // $id is from appwrite syntax --> this is post id
   // In database we are storing images in form of id
//    console.log($id,featuredImage)
    return (  // "to={} instead of href"

        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={dataService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard