import React, { useState, useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Adminproject() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    projectLink: '',
    image: null,
  });
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null); // Track ID for editing
  const fileInputRef = useRef(null); // Ref for file input

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Handle form submission (Add or Update project)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSend = new FormData();
    formToSend.append('name', formData.name);
    formToSend.append('projectLink', formData.projectLink);
    if (formData.image) formToSend.append('image', formData.image);

    try {
      setLoading(true);
      if (editId) {
        // Update existing project
        const response = await axios.put(
          `${import.meta.env.VITE_URL}/api/projects/${editId}`,
          formToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        setProjects(projects.map(project => (project._id === editId ? response.data : project)));
        toast.success("Updated Successfully");
        setEditId(null);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/projects`,
          formToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success("Added Successfully");
        setProjects([...projects, response.data]);
      }

      // Reset form
      setFormData({ name: '', projectLink: '', image: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Project
  const handleEdit = (id) => {
    const projectToEdit = projects.find(project => project._id === id);
    setFormData({ name: projectToEdit.name, projectLink: projectToEdit.projectLink, image: null });
    setEditId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  // Handle Delete Project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/api/projects/${id}`);
      toast.error("Deleted Successfully");
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <>
  
      <div className='grid lg:grid-cols-2 grid-cols-1 h-full bg-white'>
        
        <div className='w-full mt-10 lg:px-20 px-10 border-r-2 shadow-inner'>
          <div className="w-full p-10 bg-white">
            <h2 className="text-3xl font-bold mb-4">{editId ? 'Edit Project' : 'Add Project'}</h2>
            <form onSubmit={handleSubmit}>
              {/* Project Name Field */}
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Project Name'
                  className="mt-1 p-1 w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              {/* Project Link Field */}
              <div className="mb-4">
                <input
                  placeholder='Project Link'
                  type="url"
                  id="projectLink"
                  name="projectLink"
                  value={formData.projectLink}
                  onChange={handleChange}
                  className="mt-1 p-1 w-full border-b-2 border-gray-300 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              {/* Image Upload Field */}
              <div className="mb-6">
                <label 
                  htmlFor="image" 
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="block w-full text-sm text-gray-900 border-b-2 border-gray-300 cursor-pointer focus:outline-none focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(formData.image)} 
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
                    <AiOutlineLoading3Quarters className='animate-spin'/> Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none"
                  >
                    {editId ? 'Update Project' : 'Submit'}
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
                  <th scope="col" className="px-6 py-3">Image</th>
                  <th scope="col" className="px-6 py-3">Project Name</th>
                  <th scope="col" className="px-6 py-3">Project Link</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* Image */}
                    <td className="px-6 py-4">
                      {project.image && (
                        <img
                          src={`${import.meta.env.VITE_URL}/${project.image}`} // Adjust the path if needed
                          alt={project.name}
                          className="lg:w-16 lg:h-16 md:w-14 md:h-14 w-10 h-10 rounded-md object-cover"
                        />
                      )}
                    </td>

                    {/* Project Name */}
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{project.name}</td>

                    {/* Project Link */}
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="text-teal-600">
                        {project.projectLink}
                      </a>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 flex space-x-1">
                      <button
                        className="text-xl bg-red-600 hover:bg-red-500 p-2 rounded-md text-white"
                        onClick={() => handleDelete(project._id)}
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="text-xl bg-green-600 hover:bg-green-500 p-2 rounded-md text-white"
                        onClick={() => handleEdit(project._id)}
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

export default Adminproject;
