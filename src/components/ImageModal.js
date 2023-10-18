
import { Fragment } from "react"
import { FaInstagram, FaTwitter } from "react-icons/fa"

/*
This component is a modal used to show an image selected by the user. It receices some props:
1) blurSetter: This function is used to blur the background when the modal is active and vice-versa.
2) isBlur: This state tells whether background is blurred or not.
3) photo: Information regarding image to be shown in the modal
*/
function ImageModal(props) {
    const { blurSetter, isBlur, photo } = props
   // console.log(photo)
    return (
        <Fragment>
            <div className={`fixed top-14 flex justify-center w-full h-screen z-50 ${isBlur ? '' : 'hidden'}`} onClick={() => blurSetter(false)}>
                <div className="relative mt-6 w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 mb-20 flex flex-col border-4 shadow-sm rounded-xl border-gray-200 bg-white overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="absolute top-0 right-2 text-3xl font-semibold cursor-pointer" onClick={() => blurSetter(false)}>X</div>
                    <div className="w-full flex justify-center">
                        <img className="w-auto h-64 " src={photo && photo.urls && photo.urls.regular} alt=''/>
                    </div>
                    <p className="mb-4 pr-2 pl-2 text-xl font-bold leading-normal text-neutral-800  text-center">{photo && photo.description}</p>
                    <table className="table-auto text-center">
                        <thead>
                            <tr >
                                <th className="w-1/2"></th>
                                <th className="w-1/2"></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr className="shadow-md">
                                <td className="text-xl font-semibold pt-1 pb-1">Likes</td>
                                <td className="pt-1 pb-1">{photo && photo.likes}</td>
                            </tr>
                            <tr className="shadow-md">
                                <td className="text-xl font-semibold pt-1 pb-1">User</td>
                                <td className="pt-1 pb-1">{photo && photo.user.name}</td>
                            </tr >
                            {photo && photo.user.instagram_username && <tr className="shadow-md">
                                <td className="flex justify-center pt-1 pb-1"><FaInstagram className=" fill-pink-500 text-3xl " /> </td>
                                <td className="pt-1 pb-1"><a className="cursor-pointer text-red-400" target="_blank" rel="noreferrer" href={photo && photo.user.bio}>{photo && photo.user.instagram_username}</a></td>
                            </tr>}
                            {photo && photo.user.twitter_username && <tr className="shadow-md">
                                <td className="flex justify-center pt-1 pb-1"><FaTwitter className=" fill-blue-500 text-3xl " /></td>
                                <td className="pt-1 pb-1">{photo && photo.user.twitter_username}</td>
                            </tr>}
                        </tbody>
                    </table>
                    <div className='mt-6 mb-3 flex gap-1 justify-center'>
                        <a className="text-red-500" target="_blank" rel="noreferrer" href={photo && photo.links.download}>Click here</a>
                        <p>to open Image</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ImageModal