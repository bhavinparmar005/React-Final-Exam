import React from 'react'
import "./PageNotFound.css"

const PageNotFound = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-red-100 to-red-300 flex items-center justify-center h-screen overflow-hidden relative">
                <div>
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="w-3 h-3 bg-red-500 rounded-full absolute top-10 left-10 float-bubble" />
                        <div className="w-4 h-4 bg-red-400 rounded-full absolute top-20 left-2/3 float-bubble delay-200" />
                        <div className="w-2 h-2 bg-red-300 rounded-full absolute bottom-10 right-10 float-bubble delay-500" />
                        <div className="w-3 h-3 bg-red-600 rounded-full absolute bottom-20 left-1/3 float-bubble delay-1000" />
                    </div>
                    {/* Success Card */}
                    <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-xl p-10 text-center animate-[pop_0.6s_ease-out]">
                        <div className="mx-auto mb-6 w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center text-4xl shadow-lg animate-[pop_0.5s_ease-out]">
                            ⨉
                        </div>
                        <h1 className="text-3xl font-bold text-red-700 mb-2">ERROR</h1>
                        <p className="text-red-800 mb-6">Your action was wrong 404 Page Not Found.</p>
                        <a href="/" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300">Go Back</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound