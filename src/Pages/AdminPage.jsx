
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlog } from '../Feature/BlogSlice';
import "./Adminpage.css"
import { useNavigate } from 'react-router-dom';
import { deleteLoginUser, getloginUSer } from '../Feature/LoginSlice';
import Swal from 'sweetalert2';
const AdminPage = () => {

    let nav = useNavigate()
    const [search, setSearch] = useState("");
    const dispatch = useDispatch()
    const { blog } = useSelector((state) => state.blog || []);
    const { login } = useSelector((state) => state.login || []);

    useEffect(() => {
        if (login.length === 0){
            nav('/')
        }
    }, [login])


    useEffect(() => {
        dispatch(getBlog())
        dispatch(getloginUSer())

    }, [dispatch])

    useEffect(() => {
        const enableScroll = () => {
            document.body.style.overflow = "auto";
        };
        return () => enableScroll();  // Cleanup on unmount
    }, []);

    const logOut = async () => {

        let loginId = login[0].id
        dispatch(deleteLoginUser(loginId))

        Swal.fire({
            title: "Logout Successfully !",
            icon: "success",
            draggable: true,
            showConfirmButton: false,
            timer: 2000
        });

        setTimeout(() => {
            nav('/')
        }, 2000)


    }





    const deletedata = (id) => {

        Swal.fire({
            title: "Do you want Delete Blog !",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "YES",
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Blog Delete Successfully !", "", "success");
                dispatch(deleteBlog(id))
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const filteredBlogs = blog?.filter((val) => {
        return val?.title.toLowerCase().includes(search.toLowerCase())
    })

    // console.log(blog);
    // console.log(login);

    return (
        <>
            <h1 className='text-center mt-2'> WelCome to Admin Page</h1>

            <div className="button_main mt-2 p-2 d-flex justify-content-end">
                <button className="btn btn-dark fs-5 me-2" onClick={() => { logOut() }}>
                    <i className="bi bi-person-fill-dash fs-5 me-1"></i> Logout
                </button>

                <button
                    className="btn btn-dark fs-5"
                    onClick={() => nav("/add")}
                >

                    <i className="bi bi-plus-circle-fill fs-5 me-1 "></i>
                    Add Blog
                </button>
            </div>

            <div className="serchbar_main mt-2">
                <div className="input-group p-2">
                    <input type="text" className="form-control fs-5" placeholder="Search For Blogs" onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">
                    {
                        filteredBlogs?.length > 0 ? (
                            filteredBlogs?.map((val, index) => {
                                return (
                                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                                        <div className="card blog-card h-100">
                                            <img src={val?.imgUrl} className="card-img-top blog-img" />
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
                        ) : (<h1 className='text-center text-dark-emphasis'>No Data Found</h1>)
                    }
                </div>
            </div>
        </>
    )
}

export default AdminPage
