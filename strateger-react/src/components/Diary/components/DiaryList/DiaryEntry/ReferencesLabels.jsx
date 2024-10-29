const ReferencesLabels = ({ references }) => {
    return(
        <div className="mb-2 text-african_violet-800">
            <strong>References:</strong>
            <ul className="list-disc list-inside">
                {references.map((ref, index) => (
                    <li key={index}>{ref}</li>
                ))}
            </ul>
        </div>
    )
};

export default ReferencesLabels;