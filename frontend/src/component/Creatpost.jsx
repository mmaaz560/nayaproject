import React, { useState } from 'react'
import { FaFileImage, FaTimes } from 'react-icons/fa'
import { useGloble } from '../context/Context'
import { useDispatch, useSelector } from 'react-redux'
import { addpost, postReset } from '../redux/postSlice'

const Creatpost = () => {
  const [cloudimage, setcloudimage] = useState(null)
  const [media, setmedia] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch()
  const { postloading, posterror, postmessage } = useSelector((s) => s.post)

  const { showpostmodel, setshowpostmodel } = useGloble()

  const handleMedia = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (media) URL.revokeObjectURL(media)
    setcloudimage(file)
    setmedia(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    if (media) URL.revokeObjectURL(media)
    setmedia(null)
    setcloudimage(null)
  }

  const handleClose = () => {
    handleRemoveImage()
    setTitle('')
    setContent('')
    dispatch(postReset())
    setshowpostmodel(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return alert('Title likhna zaroori hai')
    if (!content.trim()) return alert('Content likhna zaroori hai')
    if (!cloudimage) return alert('Image select karo')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('image', cloudimage)   // File object

    console.log('🚀 Dispatching with FormData:', {
      title,
      content,
      image: cloudimage.name,
    })

    const result = await dispatch(addpost(formData))

    if (addpost.fulfilled.match(result)) {
      console.log('✅ Saved to MongoDB:', result.payload)
      handleClose()
    } else {
      console.error('❌ Failed:', result.payload)
      alert(result.payload || 'Post create nahi hua')
    }
  }

  if (!showpostmodel) return null

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h4 className="text-lg md:text-xl font-semibold text-black">Create Post</h4>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post ka title likho..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Kuch likho..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            {!media ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <FaFileImage className="text-5xl md:text-6xl text-gray-400" />
                <h2 className="text-base md:text-lg text-gray-700 mt-3">
                  Drag photos and videos here
                </h2>
                <label
                  htmlFor="file"
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Select from Computer
                </label>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMedia}
                />
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border">
                <img src={media} alt="preview" className="w-full max-h-64 object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                  aria-label="Remove image"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            )}
          </div>

          {posterror && (
            <p className="text-sm text-red-500">{postmessage}</p>
          )}
        </div>

        <div className="px-5 py-4 border-t flex justify-end">
          <button
            type="submit"
            disabled={postloading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
          >
            {postloading ? 'Posting...' : 'Share Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Creatpost