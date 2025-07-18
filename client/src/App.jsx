import React from 'react'
import {Routes ,Route} from 'react-router-dom'
import Hero from './components/Hero'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Resources from './pages/Resources'
import WhoAreWe from './pages/WhoAreWe'
import KnowMore from './pages/KnowMore'
import Gallery from './pages/gallery'
import crowdBg from "./assets/crowdImg.png"
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import AcademySection from './components/AcademySection'
import PartnersSection from './pages/Partners'
const App = () => {
  return (
      <div>
        <Routes>
          <Route path='/' element={<Hero />}/>
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/resources' element={<Resources/>}/>
          <Route path='/WhoAreWe' element={<WhoAreWe />}/>
          <Route path='/KnowMore' element={<KnowMore />}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/academy" element={<AcademySection/>} />
          <Route path="/partners" element={<PartnersSection />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </div>
    )
}

export default App