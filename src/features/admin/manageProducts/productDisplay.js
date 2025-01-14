import { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';

export default function ProductDisplay({ selectedFiles, isSeeMoreHovered, handleSeeMoreHovered, openModal, handleFileChange }) {
    // setActiveImage, activeImage, selectedFiles, handleSeeMoreHovered, isSeeMoreHovered, openModal, handleFileChange

    const [activeImage, setActiveImage] = useState();

    useEffect(() => {
        if (selectedFiles.length > 0) {
            setActiveImage(selectedFiles[0]);
        }
    }, [selectedFiles])

    return (
        <div className="flex flex-col gap-5 items-center w-[1200px] h-[575px] ">{/*Remove div when using for customer display */}
            <div className="flex justify-between w-full h-[550px]  ">
                <img src={activeImage ? activeImage : '/addImage.jpg'} alt='initial file' className="w-[460px] h-[523px] object-fill" />
                <div className="flex flex-col w-32 gap-3 justify-between items-center">
                    <img src={selectedFiles[0] ? selectedFiles[0] : '/addImage.jpg'} alt='file' className="w-32 h-32 cursor-pointer transition duration-500 hover:scale-110" onClick={() => setActiveImage(selectedFiles[0])} />
                    <img src={selectedFiles[1] ? selectedFiles[1] : '/addImage.jpg'} alt='file' className="w-32 h-32 cursor-pointer transition duration-500 hover:scale-110" onClick={() => setActiveImage(selectedFiles[1])} />
                    <img src={selectedFiles[2] ? selectedFiles[2] : '/addImage.jpg'} alt='file' className="w-32 h-32 cursor-pointer transition duration-500 hover:scale-110" onClick={() => setActiveImage(selectedFiles[2])} />
                    <button
                        className="flex items-center justify-center text-xs font-saira text-center w-28 h-24 hover:scale-110 transition duration-500 relative bg-cover bg-center overflow-hidden"
                        onMouseEnter={() => handleSeeMoreHovered}
                        onMouseLeave={() => handleSeeMoreHovered}
                        onClick={openModal}
                        title="See More Images"
                        style={{ backgroundImage: `url(${selectedFiles[3] ? selectedFiles[3] : '/addImage.jpg'})` }}
                    >
                        <img
                            src={isSeeMoreHovered ? "/seemoreFilled.png" : "/seemoreOutlined.png"}
                            alt="Icon"
                            className="w-12"
                        />
                    </button>
                </div>
            </div>
            <div>
                <FileBase
                    type='file'
                    multiple={true}
                    onDone={(base64) => handleFileChange(base64)}
                />
            </div>
        </div>
    )
};
