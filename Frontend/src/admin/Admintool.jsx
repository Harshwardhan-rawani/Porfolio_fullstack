import React, { useState, useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Admintool() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    toolName: '',
    imageBase64: null, 
  });

  const [tools, setTools] = useState([]);
  const [editId, setEditId] = useState(null); 
  const fileInputRef = useRef(null); 
 
  // Fetch tools from the backend
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/tools`);
        setTools(response.data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };
    fetchTools();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file selection and convert to Base64
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (editId) {
        // Update existing tool
        const response = await axios.put(
          `${import.meta.env.VITE_URL}/api/tools/${editId}`,
          formData,
        );

        setTools(tools.map(tool => (tool._id === editId ? response.data : tool)));
        toast.success("Updated Successfully");
        setEditId(null);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/tools`,
          formData,
        );
        toast.success("Added Successfully");
        setTools([...tools, response.data]);
      }

      setFormData({ toolName: '', imageBase64: null }); // Changed image to imageBase64
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error processing request');
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Tool
  const handleEdit = (id) => {
    const toolToEdit = tools.find(tool => tool._id === id);
    setFormData({ toolName: toolToEdit.toolName, imageBase64: null }); // Changed image to imageBase64
    setEditId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  // Handle Delete Tool
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/api/tools/${id}`);
      toast.error("Deleted Successfully");
      setTools(tools.filter(tool => tool._id !== id));
    } catch (error) {
      console.error('Error deleting tool:', error);
      toast.error('Error deleting tool');
    }
  };

  return (
    <>
      <div className='grid lg:grid-cols-2 grid-cols-1 h-full bg-white'>
        <div className='w-full mt-10 lg:px-20 px-10 border-r-2 shadow-inner'>
          <div className="w-full p-10 bg-white">
            <h2 className="text-3xl font-bold mb-4">{editId ? 'Edit Tool' : 'Add Tool'}</h2>
            <form onSubmit={handleSubmit}>
              {/* Tool Name Field */}
              <div className="mb-4">
                <input
                  type="text"
                  id="toolName"
                  name="toolName"
                  value={formData.toolName}
                  onChange={handleChange}
                  placeholder='Add Tool Name'
                  className="mt-1 p-1 w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-teal-500"
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
                  onChange={handleImageChange} // Handle the change
                  ref={fileInputRef} // Add ref if needed
                  className="block w-full text-sm text-gray-900 border-b-2 border-gray-300 cursor-pointer focus:outline-none focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
                {/* Optional Image Preview */}
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
                  <button
                    className="w-full py-2 flex space-x-2 justify-center px-4 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none"
                    disabled
                  >
                    <AiOutlineLoading3Quarters className='animate-spin' /> Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none"
                  >
                    {editId ? 'Update Tool' : 'Submit'}
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
                  <th scope="col" className="px-6 py-3">Tool Name</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* Image */}
                    <td className="px-6 py-4">
                      {tool.image && ( 
                        <img
                          src={tool.image}
                          alt={tool.toolName}
                          className="lg:w-16 lg:h-16 md:w-14 md:h-14 w-10 h-10 rounded-md object-cover" // Styling for the image
                        />
                      )}
                    </td>

                    {/* Tool Name */}
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{tool.toolName}</td>

                    {/* Actions */}
                    <td className="px-6 py-4 flex space-x-1">
                      <button
                        className="text-xl bg-red-600 hover:bg-red-500 p-2 rounded-md text-white"
                        onClick={() => handleDelete(tool._id)}
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="text-xl bg-green-600 hover:bg-green-500 p-2 rounded-md text-white"
                        onClick={() => handleEdit(tool._id)}
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
      <ToastContainer />
    </>
  );
}

export default Admintool;
