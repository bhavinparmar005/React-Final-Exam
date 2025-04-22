import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../Feature/BlogSlice'
import { useNavigate } from 'react-router-dom'

const Addblog = () => {

  let dispatch =useDispatch()
  let nav =useNavigate()

  const [data, setData] = useState({
    img: "",
    title: "",
    description: ""
  })

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    console.log(data);

    dispatch(addBlog(data))

    // nav('/adminpage')
    nav('/adminpage')

    setData({
      img: "",
      title: "",
      description: ""
    })


  }

  return (
    <>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm rounded-4">
              <div className="card-body">
                <h1 className="card-title mb-4 text-center fs-2">Add New Blog</h1>
                <form onSubmit={handleSubmit}>
                  {/* Image Upload */}
                  <div className="mb-3">
                    <label htmlFor="blogImage" className="form-label">Upload Image</label>
                    <input className="form-control" type="file" id="blogImage" accept="image/*" name='img' onChange={handleChange} value={data.img} required />
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
                    <button type="submit" className="btn btn-primary fs-5">Post Blog</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Addblog
