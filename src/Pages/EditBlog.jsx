
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { editBlog } from '../Feature/BlogSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getloginUSer } from '../Feature/LoginSlice';

const Editblog = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { login } = useSelector((state) => state.login || []);

  useEffect(() => {
    if (!login[0]) {
      navigate('/')
    }
  }, [])


  useEffect(() => {
    dispatch(getloginUSer())
  }, [dispatch])

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
    setLoading(true);
    try {
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


      Swal.fire({
        title: "Blog Edit Successfully !",
        icon: "success",
        draggable: true,
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {
        navigate('/adminpage');
      }, 1900);

      setData(initialState);
      setPreview('');

    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }


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
                  <div className="mb-3 text-center img_align">
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

