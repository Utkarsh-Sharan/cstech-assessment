import { useState } from 'react'

const FileUpload = ({onFileSelect}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if(file) {
        setFileName(file.name);
        onFileSelect(file);
    }
  }

  return (
    <article className='flex flex-col items-center space-y-4'>
        <label 
            htmlFor="file" 
            className="cursor-pointer bg-brand-accent rounded-md text-black px-4 py-1"
        >
            Upload file
            <input 
                type='file'
                name='file' 
                id='file'
                className='hidden'
                onChange={handleFileChange}
                accept='.csv, .xlsx, .xls'
            />
        </label>

        {fileName && <p className='text-sm'>Selected: {fileName}</p>}
    </article>
  )
}

export default FileUpload