import React, { useState, useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Adminresume() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    resume: null,
  });
  const [resumes, setResumes] = useState([]);
  const [editId, setEditId] = useState(null); 
  const fileInputRef = useRef(null); 

  // Fetch resumes from the backend
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/resumes`);
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };
    fetchResumes();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle resume change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          imageBase64: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  // Handle form submission (Add or Update resume)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSend = new FormData();
    formToSend.append('name', formData.name);
    if (formData.resume) formToSend.append('resume', formData.resume);

    try {
      setLoading(true);
      if (editId) {
        // Update existing resume
        const response = await axios.put(
          `${import.meta.env.VITE_URL}/api/resumes/${editId}`,
          formToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        setResumes(resumes.map(resume => (resume._id === editId ? response.data : resume)));
        toast.success("Updated Successfully");
        setEditId(null);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/resumes`,
          formToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success("Added Successfully");
        setResumes([...resumes, response.data]);
      }

      // Reset form
      setFormData({ name: '', resume: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Resume
  const handleEdit = (id) => {
    const resumeToEdit = resumes.find(resume => resume._id === id);
    setFormData({ name: resumeToEdit.name, resume: null });
    setEditId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  // Handle Delete Resume
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/api/resumes/${id}`);
      toast.error("Deleted Successfully");
      setResumes(resumes.filter(resume => resume._id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  return (
    <>
      <div className='grid lg:grid-cols-2 grid-cols-1 h-full bg-white'>
        <div className='w-full mt-10 lg:px-20 px-10 border-r-2 shadow-inner'>
          <div className="w-full p-10 bg-white">
            <h2 className="text-3xl font-bold mb-4">{editId ? 'Edit Resume' : 'Add Resume'}</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Add your name'
                  className="mt-1 p-1 w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              {/* Resume Upload Field */}
              <div className="mb-6">
                <label
                  htmlFor="resume"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Resume (pdf,.doc,.docx)
                </label>
                <input
                
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleImageChange} // Handle the change
                  ref={fileInputRef} // Add ref if needed
                  className="block w-full text-sm text-gray-900 border-b-2 border-gray-300 cursor-pointer focus:outline-none  focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
          <div>
          {formData.imageBase64 && (
    <div className="mt-2">
      <img 
        src={formData.imageBase64} 
        alt="Preview" 
        className="w-32 h-32 object-cover rounded-md"
      />
    </div>
  )}
          </div>
              {/* Submit Button */}
              <div className="flex justify-center">
                {loading ? (
                  <button className="w-full py-2 flex space-x-2 justify-center px-4 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none" disabled>
                    <AiOutlineLoading3Quarters className='animate-spin' /> Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none"
                  >
                    {editId ? 'Update Resume' : 'Submit'}
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>

        <div className='w-full py-5 px-3 border-r-2 shadow-inner'>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Resume</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {resumes.map((resume, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{resume.name}</td>

                    {/* Resume Link */}
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <a
                        href={resume.resume}
                        className="text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 flex space-x-1">
                      <button
                        className="text-xl bg-red-600 hover:bg-red-500 p-2 rounded-md text-white"
                        onClick={() => handleDelete(resume._id)}
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="text-xl bg-green-600 hover:bg-green-500 p-2 rounded-md text-white"
                        onClick={() => handleEdit(resume._id)}
                      >
                        <FaPen />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminresume;
