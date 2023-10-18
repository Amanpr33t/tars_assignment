import { Link } from "react-router-dom"
import { Fragment } from "react"

//This component is the navigation bar
function Navbar() {
    return (
        <Fragment>
            <div className="fixed z-40 top-0 w-full">
                <nav className=" flex flex-row justify-between items-center  h-16 w-full bg-white border-b shadow" >
                    <div className="flex flex-row pl-2 sm:pl-12">
                        <Link to='/' className='font-semibold text-3xl sm:text-4xl italic text-gray-600' >Image</Link>
                    </div>
                </nav>
            </div>
        </Fragment>
    )
}
export default Navbar