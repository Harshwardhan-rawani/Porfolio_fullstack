import React, { useState, useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function AdminAbout() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profileImage: null,
    name: '',
    email: '',
    phone: '',
    age: '',
    dob: '',
    degree: '',
    college: '',
    graduationStart: '',
    graduationEnd: '',
    marksheetImage: null,
    resumeImage: null,
    driveLink: '',
  });
  const [aboutData, setAboutData] = useState([]);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch About data
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/about`);
        setAboutData(response.data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };
    fetchAboutData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formToSend.append(key, formData[key]);
      }
    });

    try {
      setLoading(true);
      if (editId) {
        // Update existing record
        const response = await axios.put(
          `${import.meta.env.VITE_URL}/api/about/${editId}`,
          formToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setAboutData(aboutData.map(data => (data._id === editId ? response.data : data)));
        toast.success("Updated Successfully");
        setEditId(null);
      } else {
        // Add new record
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/about`,
          formToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success("Added Successfully");
        setAboutData([...aboutData, response.data]);
      }

      // Reset form
      setFormData({
        profileImage: null,
        name: '',
        email: '',
        phone: '',
        age: '',
        dob: '',
        degree: '',
        college: '',
        graduationStart: '',
        graduationEnd: '',
        marksheetImage: null,
        resumeImage: null,
        driveLink: '',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    const dataToEdit = aboutData.find(data => data._id === id);
    setFormData({ ...dataToEdit, profileImage: null, marksheetImage: null, resumeImage: null });
    setEditId(id);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/api/about/${id}`);
      toast.error("Deleted Successfully");
      setAboutData(aboutData.filter(data => data._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <>
      <div className='grid lg:grid-cols-2 grid-cols-1 h-full bg-white'>
        {/* Form Section */}
        <div className='w-full mt-10 lg:px-20 px-10 border-r-2 shadow-inner'>
          <div className="w-full p-10 bg-white">
            <h2 className="text-3xl font-bold mb-4">{editId ? 'Edit About' : 'Add About'}</h2>
            <form onSubmit={handleSubmit}>
              {[
                { label: "Name", type: "text", name: "name" },
                { label: "Email", type: "email", name: "email" },
                { label: "Phone", type: "text", name: "phone" },
                { label: "Age", type: "number", name: "age" },
                { label: "Date of Birth", type: "date", name: "dob" },
                { label: "Degree", type: "text", name: "degree" },
                { label: "College", type: "text", name: "college" },
                { label: "Graduation Start", type: "number", name: "graduationStart" },
                { label: "Graduation End", type: "number", name: "graduationEnd" },
                { label: "Drive Link", type: "url", name: "driveLink" },
              ].map(({ label, type, name }) => (
                <div className="mb-4" key={name}>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={label}
                    className="mt-1 p-1 w-full border-b-2 border-gray-300 focus:outline-none focus:border-teal-500"
                    required={type !== 'url'}
                  />
                </div>
              ))}

              {[
                { label: "Profile Image", name: "profileImage" },
                { label: "Marksheet Image", name: "marksheetImage" },
                { label: "Resume Image", name: "resumeImage" },
              ].map(({ label, name }) => (
                <div className="mb-4" key={name}>
                  <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                  <input
                    type="file"
                    name={name}
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="block w-full text-sm text-gray-900 border-b-2 border-gray-300 cursor-pointer focus:outline-none focus:border-teal-500"
                  />
                </div>
              ))}

              <div className="flex justify-center">
                {loading ? (
                  <button className="w-full py-2 flex space-x-2 justify-center px-4 bg-green-600 text-white rounded-md" disabled>
                    <AiOutlineLoading3Quarters className='animate-spin' /> Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500"
                  >
                    {editId ? 'Update' : 'Submit'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className='w-full py-5 px-3 border-r-2 shadow-inner'>
        <div className="relative overflow-x-auto px-5">
  {aboutData.length > 0 && (
    <table className="table text-gray-600">
      <tbody className="text-sm">
        <tr>
          <td>Name:</td>
          <td>{aboutData[0].name}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{aboutData[0].email}</td>
        </tr>
        <tr>
          <td>College:</td>
          <td>{aboutData[0].college}</td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>+91-{aboutData[0].phone}</td>
        </tr>
        <tr>
          <td>Age:</td>
          <td>{aboutData[0].age}</td>
        </tr>
        <tr>
          <td>DOB:</td>
          <td>{aboutData[0].dob}</td>
        </tr>
        <tr>
          <td>Degree:</td>
          <td>{aboutData[0].degree}</td>
        </tr>
        <tr>
          <td>Graduation Start:</td>
          <td>{aboutData[0].graduationStart}</td>
        </tr>
        <tr>
          <td>Graduation End:</td>
          <td>{aboutData[0].graduationEnd}</td>
        </tr>
        <tr>
          <td>Drive Link:</td>
          <td>
            <a
              href={aboutData[0].driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 underline"
            >
              View
            </a>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400"
                onClick={() => handleEdit(aboutData[0]._id)}
              >
                <FaPen className="mr-2" /> Edit
              </button>
              <button
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400"
                onClick={() => handleDelete(aboutData[0]._id)}
              >
                <MdDelete className="mr-2" /> Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )}
</div>

        </div>
      </div>
    </>
  );
}

export default AdminAbout;
