import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Element } from 'react-scroll';

import Intro from './components/Intro';
import About from './components/About';
import Tools from './components/Tools';
import Skill from './components/Skill';
import Indicator from './components/Indicator';
import Resume from './components/Resume';
import Project from './components/Project';
import Dashbord from './components/Dashbord';
import Contact from './components/Contact';
import AdminDashboard from './admin/AdminDashboard';
import Adminskill from './admin/Adminskill';
import Admintool from './admin/Admintool';
import Adminresume from './admin/Adminresume';
import Adminproject from './admin/Adminproject';
import Adminabout from './admin/Adminabout';
import Adminlogin from './admin/Adminlogin';
import PrivateRoute from './admin/PrivateRoute';
import Card from './components/Card';

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Header />
            <Indicator />
            <br /><br /><br /><br /><br />
            <Element name="home" className="element flex flex-col items-center w-[100%]">
              <div className="w-[90vw]"><Intro /></div>
              <div className="lg:w-[92vw] w-[90vw]"><Dashbord /></div>
              <div className="w-[90vw]"><Tools /></div>
            </Element>
            <br />
            <Element name="about" className="element w-[100%] flex justify-center">
              <div className="w-[90vw]">
                <About />
              </div>
            </Element>
            <Element name="service" className="element w-[100%] flex justify-center">
              <div className="w-[90vw]">
                <Skill />
              </div>
            </Element>
            <Element name="resume" className="element w-[100%] flex justify-center">
              <div className="w-[90vw]">
                <Resume />
              </div>
            </Element>
            <Element name="project" className="element w-[100%] flex justify-center">
              <div className="w-[90vw]">
                <Project />
              </div>
            </Element>
            <Element name="contact" className="element w-[100%] flex justify-center">
              <div className="w-[90vw]">
                <Contact />
              </div>
            </Element>
          </>
        } />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/card" element={<Card />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="skill" element={<Adminskill />} />
          <Route path="tools" element={<Admintool />} />
          <Route path="resume" element={<Adminresume />} />
          <Route path="project" element={<Adminproject />} />
          <Route path="about" element={<Adminabout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
