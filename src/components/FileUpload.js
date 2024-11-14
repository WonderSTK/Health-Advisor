import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setReport } from '../store/healthSlice';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'].includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError('Please select a valid image (JPEG, PNG, GIF), PDF, or text file.');
      }
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        let text;
        if (file.type.startsWith('image/')) {
          // For images, we'll just use the file name as we can't read the content
          text = `Image uploaded: ${file.name}`;
        } else {
          const reader = new FileReader();
          text = await new Promise((resolve, reject) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
          });
        }
        dispatch(setReport(text));
      } catch (err) {
        setError('Error reading file. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">Image (JPEG, PNG, GIF), PDF, or TXT</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".txt,.pdf,.jpg,.jpeg,.png,.gif" />
        </label>
      </div>
      {file && (
        <p className="text-sm text-gray-500">
          Selected file: {file.name}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
      <button 
        onClick={handleUpload} 
        className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
        disabled={!file}
      >
        Analyze Report
      </button>
    </div>
  );
}

export default FileUpload;