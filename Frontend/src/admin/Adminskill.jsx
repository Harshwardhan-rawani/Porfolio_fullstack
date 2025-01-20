import React, { useState, useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Adminskill() {
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    skill: '',
    percentage: '',
    image: null,
  });
  const [skills, setSkills] = useState([]);
  const [editId, setEditId] = useState(null); // Track ID for editing
  const fileInputRef = useRef(null); // Ref for file input

  // Fetch skills from the backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/skills`);
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
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
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file); 
      setFormData({
        ...formData,
        image: file,
        imagePreview: previewURL, 
      });
    }
  };
  // Handle form submission (Add or Update skill)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSend = new FormData();
    formToSend.append('skill', formData.skill);
    formToSend.append('percentage', formData.percentage);
    if (formData.image) formToSend.append('image', formData.image);

    try {
      setLoading(true)
      if (editId) {
        // Update existing skill
        const response = await axios.put(
          `${import.meta.env.VITE_URL}/api/skills/${editId}`,
          formToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        setSkills(skills.map(skill => (skill._id === editId ? response.data : skill)));
        toast.success("Updated Succesfully")
        setEditId(null);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/skills`,
          formToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success("Added Succesfully")
        setSkills([...skills, response.data]);
      }

      // Reset form
      setFormData({ skill: '', percentage: '', image: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    finally{
      setLoading(false)
    }
  };

  // Handle Edit Skill
  const handleEdit = (id) => {
    const skillToEdit = skills.find(skill => skill._id === id);
    setFormData({ skill: skillToEdit.skill, percentage: skillToEdit.percentage, image: null });
    setEditId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  // Handle Delete Skill
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/api/skills/${id}`);
      toast.error("Deleted Succesfully")
      setSkills(skills.filter(skill => skill._id !== id));
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <>
      <div className='grid lg:grid-cols-2 grid-cols-1 h-full bg-white'>
        <div className='w-full mt-10 lg:px-20 px-10 border-r-2 shadow-inner'>
          <div className="w-full p-10 bg-white">
            <h2 className="text-3xl font-bold mb-4">{editId ? 'Edit Skill' : 'Add Skill'}</h2>
            <form onSubmit={handleSubmit}>
              {/* Skill Field */}
              <div className="mb-4">
                <input
                  type="text"
                  id="skill"
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                  placeholder='Add your skill'
                  className="mt-1 p-1 w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              {/* Percentage Field */}
              <div className="mb-4">
                <input
                  placeholder='Percentage'
                  type="number"
                  id="percentage"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  className="mt-1 p-1 w-full border-b-2 border-gray-300 focus:outline-none  focus:border-teal-500"
                  min="0"
                  max="100"
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
    className="block w-full text-sm text-gray-900 border-b-2 border-gray-300  cursor-pointer focus:outline-none  focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
  />
  {/* Optional Image Preview */}
  {formData.imagePreview && (
    <div className="mt-2">
      <img 
        src={formData.imagePreview} 
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
      {editId ? 'Update Skill' : 'Submit'}
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
                  <th scope="col" className="px-6 py-3">Skill</th>
                  <th scope="col" className="px-6 py-3">Percentage</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
              {skills.map((skill, index) => (
  <tr
    key={index}
    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
      {/* Image */}
      <td className="px-6 py-4">
      {skill.image && (
        <img
          src={skill.image}// Adjust the path if needed
          alt={skill.skill}
          className="lg:w-16 lg:h-16 md:w-14 md:h-14 w-10 h-10 rounded-md object-cover" // Styling for the image
        />
      )}
    </td>

    {/* Skill Name */}
    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{skill.skill}</td>

    {/* Percentage */}
    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{skill.percentage}%</td>

  

    {/* Actions */}
    <td className="px-6 py-4 flex space-x-1">
      <button
        className="text-xl bg-red-600 hover:bg-red-500 p-2 rounded-md text-white"
        onClick={() => handleDelete(skill._id)}
      >
        <MdDelete />
      </button>
      <button
        className="text-xl bg-green-600 hover:bg-green-500 p-2 rounded-md text-white"
        onClick={() => handleEdit(skill._id)}
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

export default Adminskill;
