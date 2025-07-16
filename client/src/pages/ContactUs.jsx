import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Heart, Baby, Shield } from 'lucide-react';
import contactBannerImg from '../assets/contactBanner.png';
import hero1 from '../assets/hero1.png';
import { Questions } from '../Options';

const ContactUs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      setStatusMessage('Thank you for reaching out to our Maternal Health Academy! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setStatusMessage('Sorry, there was an error sending your message. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      {/* Medical Emergency Notice */}
      <div className="mt-6 mb-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="text-red-500 w-5 h-5 mr-3" />
            <div>
              <h3 className="text-red-800 font-semibold text-sm">Medical Emergency Notice</h3>
              <p className="text-red-700 text-sm mt-1">
                If you're experiencing a medical emergency during pregnancy, please contact your doctor immediately or call emergency services. 
                This contact form is for general inquiries only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="mt-10">
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg">
          <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,85,149,0.5),rgba(0,85,149,0.5))] opacity-60 mix-blend-multiply z-10" />
            <img src={contactBannerImg} className="absolute inset-0 w-full h-full object-cover opacity-90 z-0" alt="" />
          </div>
          <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center px-6 z-10 text-center">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="text-red-300 w-8 h-8" />
              <Baby className="text-blue-200 w-8 h-8" />
              <Shield className="text-green-300 w-8 h-8" />
            </div>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">Contact Our Medical Team</h2>
            <p className="text-blue-100 text-lg max-w-2xl">
              Reach out to our maternal health experts for guidance and support
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-10">
        <div className="text-[#005595] text-center sm:text-left flex flex-col gap-4 mb-10">
          <h3 className="text-lg sm:text-xl font-semibold">🏥 Maternal Health Academy</h3>
          <h3 className="font-bold text-3xl sm:text-4xl md:text-6xl">Get in touch with our</h3>
          <h3 className="font-bold text-3xl sm:text-4xl md:text-6xl">medical experts</h3>
          <p className="text-gray-600 text-lg mt-4">
            Our team of verified doctors and maternal health specialists are here to help you with any questions about pregnancy care and maternal health.
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="text-green-600 w-5 h-5" />
            <p className="text-green-800">{statusMessage}</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-600 w-5 h-5" />
            <p className="text-red-800">{statusMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:gap-6 gap-4">
            {['name', 'email', 'phone'].map((field, index) => (
              <div className="w-full" key={index}>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={
                    field === 'phone' ? 'Phone Number (Optional)' : 
                    field === 'email' ? 'Email Address' : 
                    'Your Name'
                  }
                  className={`bg-[rgba(58,144,202,0.17)] rounded-2xl text-gray-800 px-6 py-3 text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all ${errors[field] ? 'border-2 border-red-500' : ''}`}
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1 ml-2">{errors[field]}</p>}
              </div>
            ))}
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              placeholder="Please describe your inquiry about maternal health, pregnancy care, or any questions you have for our medical team..."
              className={`w-full bg-[rgba(58,144,202,0.17)] rounded-2xl px-6 py-4 text-base text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all ${errors.message ? 'border-2 border-red-500' : ''}`}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1 ml-2">{errors.message}</p>}
            <p className="text-gray-500 text-sm mt-2 ml-2">
              💡 For medical emergencies, please contact your healthcare provider immediately
            </p>
          </div>

          <div className="text-center sm:text-left">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 text-lg sm:text-xl text-white font-semibold bg-[#056dbc] hover:bg-[#034578] disabled:bg-blue-400 px-8 sm:px-12 py-4 rounded-full transition-all cursor-pointer duration-200 transform hover:scale-105 disabled:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending to Medical Team...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send to Medical Team
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information Section */}
      <section className="bg-[#e1eff8] px-4 py-12 sm:px-10 mt-10 rounded-2xl">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="mb-8">
            <h3 className="text-[#005595] font-semibold text-sm">🏥 Medical Contact Info</h3>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#005595] leading-tight mt-2">
              Need immediate medical <br className="hidden sm:block" />
              guidance or support?
            </h2>
            <p className="text-gray-600 mt-4">
              Our maternal health specialists are here to help you with pregnancy care questions and health concerns.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h2 className="text-[#005595] font-semibold text-lg mb-2">📧 Medical Team Email</h2>
              <a href="mailto:medical@maternalhealth.com" className="text-black text-base hover:underline mb-2 block">
                medical@maternalhealth.com
              </a>
              <h2 className="text-[#005595] font-semibold text-lg mb-1 mt-4">🕒 Medical Support Hours:</h2>
              <p className="text-gray-800">Monday - Friday: 9 AM to 8 PM EST</p>
              <p className="text-gray-800">Saturday: 10 AM to 4 PM EST</p>
              <p className="text-red-600 text-sm mt-2 font-medium">
                ⚠️ For emergencies: Contact your doctor immediately
              </p>
            </div>

            <div>
              <h2 className="text-[#005595] font-semibold text-lg mb-2">📞 Medical Helpline</h2>
              <a href="tel:+1234567890" className="text-black text-base hover:underline mb-4 block">
                +1 (234) 567-8900
              </a>
              <h2 className="text-[#005595] font-semibold text-lg mb-1">🩺 Consultation Hours:</h2>
              <p className="text-gray-800">Monday - Friday: 9 AM to 8 PM EST</p>
              <p className="text-gray-800">Emergency consultations available 24/7</p>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">
                  🔒 All consultations are confidential and HIPAA compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="mt-20 px-4 sm:px-8 mb-20">
        <h2 className="text-[#005595] font-bold text-3xl sm:text-4xl mb-4">
          🤔 Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mb-8">
          Common questions about our maternal health academy and medical services
        </p>
        
        <div className="space-y-4">
          {Questions.map((que, idx) => (
            <div key={idx} className="border border-[#005595] rounded-xl shadow-sm hover:shadow-md transition-shadow py-5 px-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDropdown(idx)}>
                <p className="text-base sm:text-lg text-[#024273] font-semibold pr-4">{que.question}</p>
                <button className="text-xl font-semibold text-[#005595] min-w-[24px] h-6 flex items-center justify-center">
                  {openIndex === idx ? '−' : '+'}
                </button>
              </div>
              {openIndex === idx && (
                <div className="mt-4 text-base text-gray-700 px-2 leading-relaxed">{que.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="mb-10">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-start">
            <Shield className="text-yellow-500 w-5 h-5 mr-3 mt-0.5" />
            <div>
              <h3 className="text-yellow-800 font-semibold text-sm">Medical Disclaimer</h3>
              <p className="text-yellow-700 text-sm mt-1">
                The information provided through this contact form and our platform is for educational purposes only and should not replace professional medical advice. 
                Always consult with qualified healthcare providers for medical decisions. In case of medical emergencies, contact emergency services immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;