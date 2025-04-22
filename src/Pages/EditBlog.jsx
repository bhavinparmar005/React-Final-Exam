import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { editBlog } from '../Feature/BlogSlice'
import { useDispatch } from 'react-redux'
const EditBlog = () => {
  let editData = useLocation()
  let nav = useNavigate()

  let dispatch = useDispatch()

  const [data, setData] = useState({
    img: editData.state?.img || "",
    title: editData.state?.title || "",
    description: editData.state?.description || ""
  })

  const [preview, setPreview] = useState(editData.state?.img || "")

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "img") {
      const file = files[0]
      setData({ ...data, img: file })
      setPreview(URL.createObjectURL(file)) // Show new image preview
    } else {
      setData({ ...data, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)


    dispatch(editBlog({ data, id: editData.state.id }))
    nav('/adminpage')




    setData({
      img: "",
      title: "",
      description: ""
    })
    setPreview("")
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm rounded-4">
            <div className="card-body">
              <h1 className="card-title mb-4 text-center fs-2">Edit Blog</h1>
              <form onSubmit={handleSubmit}>
                {/* Image Preview */}
                {preview && (
                  <div className="mb-3 text-center">
                    <img src={preview} alt="Preview" className="img-fluid rounded mb-2" style={{ maxHeight: "200px" }} />
                  </div>
                )}
                {/* Image Upload */}
                <div className="mb-3">
                  <label htmlFor="blogImage" className="form-label">Upload Image</label>
                  <input className="form-control" type="file" id="blogImage" accept="image/*" name='img' onChange={handleChange} />
                </div>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="blogTitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="blogTitle" placeholder="Enter blog title" name='title' onChange={handleChange} value={data.title} required />
                </div>
                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="blogDescription" className="form-label">Description</label>
                  <textarea className="form-control" id="blogDescription" rows={5} placeholder="Write your blog content here..." name='description' onChange={handleChange} value={data.description} required />
                </div>
                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary fs-5">Edit Blog</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBlog
