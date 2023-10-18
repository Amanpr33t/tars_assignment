import { Fragment } from "react"

/*
This component is used to show the images in a card. It receives some props:
1) photosResponse: This props is an array that contains all the images being fetched.
2) blurSetter: This function is used to blur the background when the user opens an image in the modal.
3) photoSetter: This function is used to pass on an image to the modal which the user wants to open in the modal.
*/
function Card({ photosResponse, blurSetter, photoSetter }) {
    return (
        <Fragment>
            {photosResponse && photosResponse.length && photosResponse.map(photo => {
                return < div key={photo.id} className="w-96  ml-2 mr-2 sm:ml-0 sm:mr-0">
                    <div className="w-full flex justify-center">
                        <img className="w-fit h-64 cursor-pointer" src={photo.urls.regular} alt='' onClick={() => {
                            blurSetter(true)
                            photoSetter(photo)
                        }} />
                    </div>
                    <div >
                        <div className="flex flex-row place-content-center gap-6">
                            <p className="font-bold">Name:</p>
                            <p>{photo.user.name}</p>
                        </div>
                        <div className="flex flex-row place-content-center gap-6">
                            <p className="font-bold">Likes:</p>
                            <p>{photo.likes}</p>
                        </div>
                    </div>
                </div>
            })}

        </Fragment>
    )
}
export default Card