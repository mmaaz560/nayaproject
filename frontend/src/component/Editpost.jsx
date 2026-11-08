import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { updatepost, postReset } from '../redux/postSlice'
import { useGloble } from '../context/Context'

// 🔴 (props) hata diya hai, ab yeh direct context use karega
const Editpost = () => {
  const dispatch = useDispatch()
  const { postloading } = useSelector((state) => state.post)
  
  // 🔴 Context se data uthaya
  const { showeditpostmodel, setshoweditpostmodel, editpostdata, seteditpostdata } = useGloble()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)

  // 🔴 Jab editpostdata change ho (yani icon click ho), toh form fill karo
  useEffect(() => {
    if (editpostdata) {
      setTitle(editpostdata.title || '')
      setContent(editpostdata.content || '')
    }
  }, [editpostdata])

  // 🔴 Agar modal band hai, toh kuch mat dikhao (Hooks ke baad)
  if (!showeditpostmodel) return null

  // 🔴 Close karne ka function
  const handleClose = () => {
    setshoweditpostmodel(false)
    seteditpostdata(null)
    setTitle('')
    setContent('')
    setImage(null)
    dispatch(postReset())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return alert('Title aur content zaroori hai')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (image) formData.append('image', image)

    // 🔴 editpostdata._id use karo
    const result = await dispatch(updatepost({ id: editpostdata._id, formData }))

    if (updatepost.fulfilled.match(result)) {
      alert('✅ Post updated!')
      handleClose()
    } else {
      alert('❌ ' + (result.payload || 'Update failed'))
    }
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h4 className="text-lg font-semibold">Edit Post</h4>
          <button type="button" onClick={handleClose} className="text-gray-400 hover:text-red-500">
            <FaTimes />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Change Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>
        </div>

        <div className="px-5 py-4 border-t flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={postloading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium px-6 py-2 rounded-lg"
          >
            {postloading ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Editpost