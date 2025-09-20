import React, { useEffect, useState } from 'react'
import dataService from "../appwrite/config";
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        dataService.getPosts() // Here no query is passed or accepted. So, no need to add "[]" in "()".
            // .then((posts) => setPosts(posts))
            .then((posts) => {
                if (posts) {
                    setPosts(posts.rows)
                }
            })
    }, [])

    if(posts.length === 0) { // No length of post or no post then login
        return (
            <div className="w-full py-28 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                            <section className="bg-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-4">Welcome to My Blog</h2>
          <p className="text-lg text-blue-900 mb-8">Read the latest articles, tutorials, and stories from our community.</p>
          <a href="/all-posts" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">Browse Posts</a>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Post Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <img src="https://source.unsplash.com/random/400x200" alt="Post" className="rounded-md mb-4 w-full h-40 object-cover" />
            <h3 className="text-xl font-bold mb-2">Post Title</h3>
            <p className="text-gray-700 mb-4">Short description of the blog post goes here. Catch the reader's attention!</p>
            <a href="/post/example" className="text-blue-600 hover:underline font-semibold">Read More</a>
          </div>
          {/* Repeat Post Card for more posts */}
          {/* ... */}
        </div>
      </main>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            {/* All post will be transmitted individually using the code provided below. */}
                            <PostCard {...post} /> 
                            {/* <PostCard post={post} /> only single post will be sent or displayed */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home