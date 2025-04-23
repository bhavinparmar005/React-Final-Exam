import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../Feature/BlogSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Addblog = () => {

  let dispatch = useDispatch()
  let nav = useNavigate()
  const [preview, setPreview] = useState(null)

  const [data, setData] = useState({
    img: "",
    title: "",
    description: ""
  })

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value



    if (name == "img") {
      setData({ ...data, img: e.target.files[0] })
      setPreview(URL.createObjectURL(e.target.files[0]))
    } else {

      setData({ ...data, [name]: value })
    }

  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    const url = "https://api.cloudinary.com/v1_1/dwhnsp84k/image/upload"

    const formData = new FormData();
    formData.append("file", data.img);
    formData.append("upload_preset", "blog-img");
    formData.append("cloud_name", "dwhnsp84k");
    const result = await axios.post(url, formData)

    const { title, description } = data

    const imgUrl = result.data.url

    const finaldata = { title, description, imgUrl }
  if(finaldata){dispatch(addBlog(finaldata))}
    

    // setData({...data,img:imgUrl})




    nav('/adminpage')


    setData({
      img: "",
      title: "",
      description: ""
    })

    setPreview("")

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
                  {/* Image Preview */}
                  {preview && (
                    <div className="mb-3 text-center">
                      <img src={preview} alt="Preview" className="img-fluid rounded mb-2" style={{ maxHeight: "200px" }} />
                    </div>
                  )}
                  {/* Image Upload */}
                  <div className="mb-3">
                    <label htmlFor="blogImage" className="form-label">Upload Image</label>
                    <input className="form-control" type="file" id="blogImage" accept="image/*" name='img' onChange={handleChange} required />
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
