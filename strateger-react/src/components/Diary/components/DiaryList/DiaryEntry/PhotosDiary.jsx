const PhotosDiary = ({ photos }) => {
    return (
        <div className="mb-2 text-african_violet-800">
            <strong>Photos:</strong>
            {photos && photos.length > 0 ? (
                <div className="flex flex-wrap">
                    {photos.map((photoUrl, index) => (
                        <img
                            key={index}
                            src={`http://localhost${photoUrl}`}
                            alt={`Attachment ${index + 1}`}
                            className="h-24 w-24 object-cover m-1 rounded-lg border border-gray-200"
                        />
                    ))}
                </div>
            ) : (
                <span>No photos</span>
            )}
        </div>
    )
}

export default PhotosDiary;