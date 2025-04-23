// import React, { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { editBlog } from '../Feature/BlogSlice'
// import { useDispatch } from 'react-redux'
// import axios from 'axios'
// const EditBlog = () => {
//   let editData = useLocation()
//   let nav = useNavigate()
//   let dispatch = useDispatch()

//   // console.log(editData.state);


//   const [data, setData] = useState({
//     img: editData.state?.imgurl || "",
//     title: editData.state?.title || "",
//     description: editData.state?.description || ""
//   })

//   const [preview, setPreview] = useState(editData.state?.imgUrl || "")

//   const handleChange = (e) => {
//     let name = e.target.name
//     let value = e.target.value

//     if (name == "img") {
//       setData({ ...data, img: e.target.files[0] })
//       setPreview(URL.createObjectURL(e.target.files[0]))
//     } else {

//       setData({ ...data, [name]: value })
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     // console.log(data)
//     const url = "https://api.cloudinary.com/v1_1/dwhnsp84k/image/upload"


//     const formData = new FormData();
//     formData.append("file", data.img);
//     formData.append("upload_preset", "blog-img");
//     formData.append("cloud_name", "dwhnsp84k");
//     const result = await axios.post(url, formData)

//     const { title, description } = data

//     const imgUrl = result.data.url

//     const finaldata = { title, description, imgUrl }

//     dispatch(editBlog({ finaldata, id: editData.state.id }))


//     nav('/adminpage')
//     setData({
//       img: "",
//       title: "",
//       description: ""
//     })
//     setPreview("")
//   }

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-12 col-md-8 col-lg-6">
//           <div className="card shadow-sm rounded-4">
//             <div className="card-body">
//               <h1 className="card-title mb-4 text-center fs-2">Edit Blog</h1>
//               <form onSubmit={handleSubmit}>
//                 {/* Image Preview */}
//                 {preview && (
//                   <div className="mb-3 text-center">
//                     <img src={preview} alt="Preview" className="img-fluid rounded mb-2" style={{ maxHeight: "200px" }} />
//                   </div>
//                 )}
//                 {/* Image Upload */}
//                 <div className="mb-3">
//                   <label htmlFor="blogImage" className="form-label">Upload Image</label>
//                   <input className="form-control" type="file" id="blogImage" accept="image/*" name='img' onChange={handleChange} />
//                 </div>
//                 {/* Title */}
//                 <div className="mb-3">
//                   <label htmlFor="blogTitle" className="form-label">Title</label>
//                   <input type="text" className="form-control" id="blogTitle" placeholder="Enter blog title" name='title' onChange={handleChange} value={data.title} required />
//                 </div>
//                 {/* Description */}
//                 <div className="mb-3">
//                   <label htmlFor="blogDescription" className="form-label">Description</label>
//                   <textarea className="form-control" id="blogDescription" rows={5} placeholder="Write your blog content here..." name='description' onChange={handleChange} value={data.description} required />
//                 </div>
//                 {/* Submit Button */}
//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary fs-5">Edit Blog</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EditBlog




import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { editBlog } from '../Feature/BlogSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Editblog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    img: null,
    title: location.state?.title || '',
    description: location.state?.description || '',
  };

  const [data, setData] = useState(initialState);
  const [preview, setPreview] = useState(location.state?.imgUrl || '');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img') {
      const file = files[0];
      setData((prev) => ({ ...prev, img: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imgUrl = preview;

    if (data.img && typeof data.img !== 'string') {
      const formData = new FormData();
      formData.append('file', data.img);
      formData.append('upload_preset', 'blog-img');
      formData.append('cloud_name', 'dwhnsp84k');

      const result = await axios.post(
        'https://api.cloudinary.com/v1_1/dwhnsp84k/image/upload',
        formData
      );

      imgUrl = result.data.url;
    }

    const { title, description } = data;
    const finalData = { title, description, imgUrl };

    dispatch(editBlog({ finaldata: finalData, id: location.state?.id }));

    navigate('/adminpage');

    setData(initialState);
    setPreview('');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm rounded-4">
            <div className="card-body">
              <h1 className="card-title mb-4 text-center fs-2">Edit Blog</h1>
              <form onSubmit={handleSubmit}>
                {preview && (
                  <div className="mb-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-fluid rounded mb-2"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="blogImage" className="form-label">
                    Upload Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="blogImage"
                    accept="image/*"
                    name="img"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="blogTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="blogTitle"
                    placeholder="Enter blog title"
                    name="title"
                    onChange={handleChange}
                    value={data.title}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="blogDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="blogDescription"
                    rows={5}
                    placeholder="Write your blog content here..."
                    name="description"
                    onChange={handleChange}
                    value={data.description}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary fs-5">
                    Edit Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editblog;

