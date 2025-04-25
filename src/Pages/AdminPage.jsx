
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlog } from '../Feature/BlogSlice';
import "./Adminpage.css"
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../Feature/FirebaseConfig';

const AdminPage = () => {

    let nav = useNavigate()
    const [loginData, setLoginData] = useState([])

    const getloginUserData = async () => {
        let result = await getDocs(collection(db, "adminLogin"));
        let res = result.docs.map((val) => {

            return ({ id: val.id, ...val.data() })
        });
        setLoginData(res)
    }
    useEffect(() => {
        getloginUserData()
    }, [])

    const logOut = async () => {

        let id = loginData[0]?.id

        let result = await deleteDoc(doc(db, "adminLogin", id))

        

            nav('/login');
      

    }

    console.log(loginData);




    const { blog } = useSelector((state) => state.blog || []);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlog())
    }, [dispatch])

    const deletedata = (id) => {
        dispatch(deleteBlog(id))

    }
    console.log(blog);



    return (
        <>
            <h1 className='text-center mt-2'> WelCome to Admin Page</h1>

            <div className="button_main mt-2 p-2 d-flex justify-content-end">
                <button className="btn btn-primary fs-5 me-2" onClick={() => { logOut() }}>
                    <i className="bi bi-person-fill-dash fs-5 me-1"></i> Logout
                </button>

                <button
                    className="btn btn-primary fs-5"
                    onClick={() => nav("/add")}
                >

                    <i className="bi bi-plus-circle-fill fs-5 me-1 "></i>
                    Add Blog
                </button>
            </div>

            <div className="serchbar_main mt-2">
                <div className="input-group p-2">
                    <input type="text" className="form-control fs-5" placeholder="Search For Blogs" />
                </div>
            </div>



            <div className="container py-5">
                <div className="row justify-content-center">
                    {
                        blog?.map((val, index) => {
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
                    }


                </div>
            </div>





        </>
    )
}

export default AdminPage
