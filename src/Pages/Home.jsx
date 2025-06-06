import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../Feature/BlogSlice';
import Navbar from '../components/Navbar';
import Masonry from 'react-masonry-css'; // 🔥 Import Masonry
import "./Home.css"
import { useNavigate } from 'react-router-dom';
import { getloginUSer } from '../Feature/LoginSlice';

const Home = () => {
  const dispatch = useDispatch()

  const nav = useNavigate()
  const { login } = useSelector((state) => state.login || []);



  useEffect(() => {
    if (login.length == 1) {

      nav('/adminpage')
    }
  },[login])


  useEffect(() => {
    dispatch(getloginUSer())
  }, [dispatch])

  useEffect(() => {
    const enableScroll = () => {
      document.body.style.overflow = "auto";
    };
    return () => enableScroll();  // Cleanup on unmount
  }, []);

  useEffect(() => {
    dispatch(getBlog())
  }, [dispatch])

  const { blog } = useSelector((state) => state.blog || []);
  // Set breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="blog-title">My Best Articles to Help You Build a Successful Blog</h1>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {blog?.map((card, index) => (
            <div className="card" key={index}>
              <img src={card?.imgUrl} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.description}</p>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </>
  )
}

export default Home
