
import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import "../Style/Style.css"
import LoadingButton from '../../Auth/LoadingButton'


const BlogPost = () => {

    const [popup, setPopup] = useState(false)
    const [addLoader, setAddLoader] = useState(false);

    const [popupUpdate, setPopupUpdate] = useState(false)
    const handlePopup = () => {
        setPopup(!popup)
    }

    const handleUpdatePopup = () => {
        setPopupUpdate(!popupUpdate)
    }

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleAddModule = (e) => {
        e.preventDefault();
        setAddLoader(true);

        // Simulate API call
        setTimeout(() => {
            setAddLoader(false);
            setPopup(false); // close popup after submission
        }, 2000);
    };

    const handleUpdateSubmit = (e) => {
  e.preventDefault();

  const updatedName = e.target.name.value;
  const updatedContent = e.target.content.value;

  const updatedImage = selectedImage
    ? URL.createObjectURL(selectedImage)
    : currentBlog.image;

  const updatedAt = new Date().toISOString().split("T")[0];

  const updatedBlogs = blogs.map((blog) =>
    blog.id === currentBlog.id
      ? {
          ...blog,
          name: updatedName,
          content: updatedContent,
          image: updatedImage,
          updatedAt,
        }
      : blog
  );

  setBlogs(updatedBlogs);
  setPopupUpdate(false);
  setSelectedImage(null);
  setCurrentBlog(null);
};

const [currentBlog, setCurrentBlog] = useState(null);

    return (
        <div>
            <div className='flex justify-between items-center'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Blog Post</span>
                <div>
                    <button onClick={handlePopup} className="profile__btn mt-5">Add Blog Post</button>
                </div>
            </div>
            <div className='table__container mt-8'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Blog Name</th>
                            <th>Image</th>
                            <th>Content</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>CY178</td>
                            <td></td>
                            <td>blog</td>
                            <td>00/00/0000</td>
                            <td className='flex items-center justify-center gap-3'>
                                <span className='AiFillEdit grid place-content-center' onClick={() => handleUpdatePopup()}> <AiFillEdit /> </span>
                                <span className='MdDelete grid place-content-center'> <MdDelete /> </span>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className={`popup__container ${popup ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-2/5 px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Add Blog Post</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form onSubmit={handleAddModule} className='mt-5'>
                        <div>
                            <span className='input__label mt-5 block'>Blog Name </span>
                            <input placeholder='Enter Blog Name' className='popup__input mt-2 px-4' />
                        </div>
                        {/* {departmentError && <span className='block error__msg'> {departmentError} </span>} */}


                        <div>
                            <span className='input__label mt-2 block'>Content</span>
                            <textarea
                                placeholder="Enter Content"
                                className="h-40 border border-gray-300 mt-2 px-4 outline-none py-2 w-full rounded text-[15px] font-semibold resize-none"
                            />

                        </div>

                        <div className="mt-2">
                            <span className="input__label block mb-2">Upload Image</span>

                            <div className="border border-gray-300 rounded flex justify-center items-center h-40 relative cursor-pointer overflow-hidden">
                                {selectedImage ? (
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="preview"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                ) : (
                                    <label
                                        htmlFor="imageUpload"
                                        className="cursor-pointer text-gray-500 text-sm text-center z-10"
                                    >
                                        Click to upload an image
                                    </label>
                                )}

                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>


                        <div className='mt-10 grid place-content-center'>
                            <button
                                className='profile__btn w-[180px] flex items-center justify-center'
                                type='submit'
                                disabled={addLoader}
                            >
                                {addLoader ? (
                                    <>
                                        Loading...
                                        <LoadingButton />
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <div className={`popup__container ${popupUpdate ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-2/4 px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Update Blog Post</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleUpdatePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                   <form onSubmit={handleUpdateSubmit} className='mt-10'>
  <div>
    <span className='input__label mt-5 block'>Blog Name</span>
    <input
      name="name"
      defaultValue={currentBlog?.name}
      className='popup__input mt-2 px-4'
    />
  </div>

  <div>
    <span className='input__label mt-5 block'>Content</span>
    <textarea
      name="content"
      defaultValue={currentBlog?.content}
      className="h-40 border border-gray-300 mt-2 px-4 outline-none py-2 w-full rounded text-[15px] font-semibold resize-none"
    />
  </div>

  <div className="mt-5">
    <span className="input__label block mb-2">Upload New Image</span>

    <div className="border border-gray-300 rounded flex justify-center items-center h-40 relative cursor-pointer overflow-hidden group">
      {selectedImage ? (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : currentBlog?.image ? (
        <img
          src={currentBlog.image}
          alt="existing"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <label
          htmlFor="updateImageUpload"
          className="cursor-pointer text-gray-500 text-sm text-center z-10"
        >
          Click to upload an image
        </label>
      )}

      <input
        id="updateImageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  </div>

  <div className='mt-10 grid place-content-center'>
    <button className='profile__btn w-[180px]' type='submit'>
      Submit Update
    </button>
  </div>
</form>

                </div>
            </div>
        </div>
    )
}

export default BlogPost