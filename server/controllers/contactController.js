import ContactForm from '../models/ContactForm.js';
import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Submit contact form
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Message length validation
    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long'
      });
    }

    // Create contact form entry
    const contactForm = new ContactForm({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      message: message.trim(),
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contactForm.save();

    // Send emails if email configuration is available
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();

        // Admin notification email
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #005595 0%, #3a90ca 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">🏥 New Contact Form - Maternal Health Academy</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #005595; margin-top: 0;">👤 Contact Details</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #005595; margin-top: 0;">💬 Message</h2>
                <p style="line-height: 1.6; color: #333; background: #f8f9fa; padding: 15px; border-radius: 5px;">${message}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>This email was sent from Maternal Health Academy contact form</p>
              <p>🏥 Saving lives through education and awareness</p>
            </div>
          </div>
        `;

        // User confirmation email
        const userEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #005595 0%, #3a90ca 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">🏥 Thank You - Maternal Health Academy</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #005595; margin-top: 0;">Dear ${name},</h2>
                <p style="line-height: 1.6; color: #333;">
                  Thank you for reaching out to the <strong>Maternal Health Academy</strong>! We've received your message and our medical team will review it promptly.
                </p>
                <p style="line-height: 1.6; color: #333;">
                  Our mission is to prevent maternal mortality through education and awareness. We typically respond within 24 hours during business hours.
                </p>
                
                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #1976d2; margin-top: 0; font-size: 16px;">🚨 Emergency Medical Situations</h3>
                  <p style="margin: 0; color: #333; font-size: 14px;">
                    If you're experiencing a medical emergency during pregnancy, please contact your doctor immediately or call emergency services.
                  </p>
                </div>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h3 style="color: #005595; margin-top: 0;">📝 Your Message:</h3>
                <p style="line-height: 1.6; color: #666; font-style: italic; background: #f8f9fa; padding: 15px; border-radius: 5px;">"${message}"</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>For urgent medical questions, please contact your healthcare provider directly</p>
              <p>🏥 Maternal Health Academy - Saving lives through education</p>
            </div>
          </div>
        `;

        // Send admin notification
        await transporter.sendMail({
          from: `"Maternal Health Academy" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `🏥 New Contact Form Submission - ${name}`,
          html: adminEmailHtml
        });

        // Send user confirmation
        await transporter.sendMail({
          from: `"Maternal Health Academy" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: '🏥 Thank you for contacting Maternal Health Academy',
          html: userEmailHtml
        });

      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      data: {
        id: contactForm._id,
        status: contactForm.status,
        submittedAt: contactForm.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all contact forms (admin only)
export const getContactForms = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;
    
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (priority && priority !== 'all') query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const contactForms = await ContactForm.find(query)
      .populate('respondedBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ContactForm.countDocuments(query);

    res.json({
      success: true,
      data: contactForms,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact forms',
      error: error.message
    });
  }
};

// Update contact form status
export const updateContactFormStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response, priority } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (response) {
      updateData.response = response;
      updateData.respondedBy = req.user._id;
      updateData.respondedAt = new Date();
    }
    if (priority) updateData.priority = priority;

    const contactForm = await ContactForm.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('respondedBy', 'firstName lastName email');

    if (!contactForm) {
      return res.status(404).json({
        success: false,
        message: 'Contact form not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact form updated successfully',
      data: contactForm
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact form',
      error: error.message
    });
  }
};

// Delete contact form
export const deleteContactForm = async (req, res) => {
  try {
    const { id } = req.params;

    const contactForm = await ContactForm.findByIdAndDelete(id);

    if (!contactForm) {
      return res.status(404).json({
        success: false,
        message: 'Contact form not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact form deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact form',
      error: error.message
    });
  }
};

// Get contact form statistics
export const getContactFormStats = async (req, res) => {
  try {
    const stats = await ContactForm.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
          read: { $sum: { $cond: [{ $eq: ['$status', 'read'] }, 1, 0] } },
          replied: { $sum: { $cond: [{ $eq: ['$status', 'replied'] }, 1, 0] } },
          resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
          urgent: { $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] } },
          high: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } }
        }
      }
    ]);

    // Get recent submissions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentCount = await ContactForm.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      success: true,
      data: {
        ...(stats[0] || {
          total: 0,
          new: 0,
          read: 0,
          replied: 0,
          resolved: 0,
          urgent: 0,
          high: 0
        }),
        recentSubmissions: recentCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact form statistics',
      error: error.message
    });
  }
};