import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import dataService from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])

            dataService.getPosts([]) // here we need to pass queries but now let it be empty array.
            // .then((posts) => setPosts(posts))
            .then((posts) => {
                if (posts) {
                    setPosts(posts.rows)
                }
            })

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => ( // Nothing to return that is why using "()" else while returning use "{}"
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                            {/* post={post} */}
                        </div>
                    ))}
                </div>
            </Container>



        </div>
    )
}
export default AllPosts