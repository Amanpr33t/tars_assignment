
import { Fragment, useEffect, useState, useCallback } from "react"
import Card from "./Card";
import ImageModal from "./ImageModal";

function Body() {
    const [isBlur, setIsBlur] = useState(false) //This state is used to blur the background when the modal is opened
    const [photosResponse, setPhotosResponse] = useState() //This state contains all the photos we fetch from the api
    const [selectedPhoto, setSelectedPhoto] = useState() //This state is used the store the information about image which is to be opened in modal
    const [loading, setLoading] = useState(true) //This state is used to manage loading when photos are being fetched
    const [error, setError] = useState(false) //This state is used to manage errors that occur while fetching photos
    const [pageNumber, setPageNumber] = useState(1) //This state is used to manage the page number the api
    const [inputPage, setInputPage] = useState(1) // This state is used to paginate 
    const [searchInput, setSearchInput] = useState() //This state stores the data being added by the user in the search input tag

    //This function is used to fetch photos
    const fetchPhotos = useCallback(async () => {
        setLoading(true)
        setError(false)
        try {
            const response = await fetch(`https://api.unsplash.com${searchInput ? '/search' : ''}/photos?client_id=BoNTaU7x2Hh9-eWuiyn_vgJQGG4XdjBP9WmIZO1uS9E&page=${pageNumber.toString()}&per_page=9&orientation=landscape${searchInput ? `&query=${searchInput}` : ''}`)
            if (!response.ok) {
                throw new Error('Some error occured')
            }
            const data = await response.json()
            setLoading(false)
            setPhotosResponse(data)
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }, [pageNumber, searchInput])

    useEffect(() => {
        fetchPhotos()
    }, [fetchPhotos])

    //This function is sent as props to the Card component. It is used to blur the background when the user opens an image in the modal
    const blurSetter = (boolean) => {
        setIsBlur(boolean)
    }

    //This function is sent as props to the Card component. It is used to store the information about an image as a state
    const photoSetter = (photo) => {
        setSelectedPhoto(photo)
    }

    return (
        <Fragment>

            <ImageModal blurSetter={blurSetter} isBlur={isBlur} photo={selectedPhoto} />

            {/*The code below is used to show an error message if an error occurs while fetching images */}
            {error && !loading &&
                <div className="fixed top-40 w-full flex flex-col place-items-center">
                    <p >Some error occured.</p>
                    <p className="text-red-500 cursor-pointer" onClick={() => {
                        setSearchInput('')
                        setPageNumber(1)
                        setInputPage(1)
                    }}>Reload</p>
                </div>}

            {/*The code below is used to show a loading spinner when the data is being fetched */}
            {!error && loading &&
                < div className="fixed top-40 w-full flex justify-center" >
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span
                        >
                    </div>
                </div>}

            {/*The code below is used to show a message when no image were available after successful fetching of data */}
            {!error && !loading && ((searchInput && photosResponse && photosResponse.results && !photosResponse.results.length) || (!searchInput && photosResponse && !photosResponse.length)) &&
                <div className="fixed top-44 w-full flex flex-col place-items-center">
                    <p>No images found.</p>
                </div>}


            {!error && <div className={`z-10 w-full  pt-32 pb-10 flex flex-wrap flex-row gap-10 place-content-center ${isBlur ? 'blur-lg' : ''}`}>
                {/*The form below is used to get data from the user which the user wants to search*/}
                <form className="fixed z-50 top-16 w-full flex flex-row place-content-center" onSubmit={e => e.preventDefault()}>
                    <input className="w-10/12 sm:w-2/3 md:w-1/3 mt-2 h-12 pl-2 pr-10 border-2 border-gray-300 rounded-xl" type="text" id="search" name="search" placeholder='Search...' autoComplete="off" value={searchInput} onChange={e => {
                        setSearchInput(e.target.value)
                        setPageNumber(1)
                        setInputPage(1)
                    }} />
                </form>
                {/*The code below is used to render the Card component*/}
                {!loading && <Card photosResponse={searchInput ? photosResponse.results : photosResponse} blurSetter={blurSetter} photoSetter={photoSetter} />}
            </div>}

            {/*The form below is used to show an input tag and a couple of buttons to the user. These are used by the user for pagination*/}
            {!error && !loading && photosResponse && (photosResponse.length || (photosResponse.results && photosResponse.results.length)) &&
                <div className="flex flex-row place-content-center gap-2 mb-5">
                    <button className="text-xl font-semibold" disabled={pageNumber === +1 ? true : false} onClick={() => {
                        setPageNumber(+pageNumber - 1)
                        setInputPage(+pageNumber - 1)
                    }}>Previous</button>
                    <form onSubmit={e => {
                        e.preventDefault()
                        setPageNumber(+inputPage)
                    }}>
                        <input className="w-20 h-12 pl-2 pr-2 border-2 border-gray-300 rounded-xl text-center" type="number" id="page" name="page" autoComplete="off" value={inputPage} onChange={e => setInputPage(e.target.value)} max={searchInput ? photosResponse.total_pages && photosResponse.total_pages.toString() : '100'} min='1' />
                    </form>
                    < button className="text-xl font-semibold" onClick={() => {
                        setPageNumber(+pageNumber + 1)
                        setInputPage(+pageNumber + 1)
                    }} disabled={!searchInput ? (pageNumber >= +100 ? true : false) : (pageNumber >= +photosResponse.total_pages ? true : false)}>Next</button>
                </div>
            }
        </Fragment>
    )
}
export default Body