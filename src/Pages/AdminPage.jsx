
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlog } from '../Feature/BlogSlice';
import "./Adminpage.css"
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    let nav = useNavigate()
    const { blog } = useSelector((state) => state.blog || []);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlog())
    }, [dispatch])

    const deletedata = (id) => {

        dispatch(deleteBlog(id))
        alert(id)
    getBlog()
    }


    return (
        <>
            <h1 className='text-center mt-2'>admin Page</h1>
            <button onClick={() => { nav('/add') }}> add blog</button>
            <div className="container py-5">
                <div className="row justify-content-center">
                    {
                        Array.isArray(blog) && blog?.map((val) => {
                            return (
                                <div className="col-md-6 col-lg-4 mb-4" key={val.id}>
                                    <div className="card blog-card h-100">
                                        <img src={val?.img} className="card-img-top blog-img" />
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="card-title fw-bold"> {val?.title} </h5>
                                                <p className="card-text"> {val?.description} </p>
                                            </div>
                                            <div className="d-flex justify-content-end gap-2 mt-2">
                                                <button className="btn btn-sm btn-outline-primary" onClick={() => { nav('/edit', { state: val }) }}>
                                                    <i className="bi bi-pencil-square" /> Edit
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => { deletedata(val?.id) }}>
                                                    <i className="bi bi-trash" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>





        </>
    )
}

export default AdminPage
