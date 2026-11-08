import React, { useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getallpost, postReset, deletepost } from '../redux/postSlice'
import { useGloble } from '../context/Context'

const Postcomponent = () => {
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch()
const { showeditpostmodel, setshoweditpostmodel, editpostdata, seteditpostdata } = useGloble()
  useEffect(() => {
    dispatch(getallpost())
    dispatch(postReset())
  }, [dispatch])

    const handleEdit = (item) => {
    console.log('Edit post:', item)
    seteditpostdata(item)           // ← ab yeh chalega
    setshoweditpostmodel(true)      // 2. Modal open
  }

 const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Kya tum sach mein yeh post delete karna chahte ho?')
    if (!confirmDelete) return

    const result = await dispatch(deletepost(id))

    if (deletepost.fulfilled.match(result)) {
        console.log('✅ Post deleted:', result.payload)
    } else {
        alert('❌ ' + (result.payload || 'Delete failed'))
    }
}

  // Agar data load ho raha hai
  if (!post || post.length === 0) {
    return <div className="text-center py-10 text-gray-500">No Posts Yet</div>
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-black py-6 gap-6">
      
      {/* ✅ Post ki jagah post.map use karo, aur andar item likho */}
      {post.map((item) => (
        <div
          key={item._id} // ✅ MongoDB mein id nahi, _id hota hai
          className="w-full max-w-md bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full p-0.5">
                <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-full"></div>
              </div>
              {/* Agar title hai toh title dikhao, warna generic user */}
              <h2 className="font-semibold text-sm dark:text-white">{item.title || 'User'}</h2>
            </div>

            {/* Edit + Delete icons */}
            <div className="flex items-center gap-3 text-gray-500">
              <button
                onClick={() => handleEdit(item)}
                aria-label="Edit post"
                className="hover:text-blue-500 transition-colors"
              >
                <FaEdit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                aria-label="Delete post"
                className="hover:text-red-500 transition-colors"
              >
                <FaTrash className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="w-full h-80 bg-gray-200 dark:bg-neutral-800">
            <img
              // ✅ Image URL Fix: Agar image backend se aa rahi hai, toh localhost:5174 lagao
              src={item.media?.startsWith('/uploads') ? `http://localhost:5174${item.media}` : item.media}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content & Actions */}
          <div className="p-4">
            <div className="flex items-center gap-4 mb-3 text-xl dark:text-white">
              <button aria-label="Like" className="hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button aria-label="Comment" className="hover:text-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-800 dark:text-gray-200">
              {/* Agar username nahi hai to title ka pehla word use karo */}
              <span className="font-semibold mr-2">{item.title?.split(' ')[0] || 'User'}</span>
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Postcomponent