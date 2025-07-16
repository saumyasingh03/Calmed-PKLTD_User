import {useState, useEffect} from 'react';
import React from 'react';
import {useUser} from '@clerk/clerk-react';
import {
  MapPin,
  Video,
  FileText,
  Upload,
  Play,
  Edit,
  Trash2,
  Search,
  Filter,
  Plus,
  Eye,
  Calendar,
  User,
  Clock,
  BookOpen,
  Image as ImageIcon,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Loader2,
  Heart,
  Baby,
  Shield,
  AlertTriangle,
  Star,
  Globe,
  MessageSquare,
  Bookmark,
  Share2,
  Award,
  Stethoscope,
  Activity,
  TrendingUp,
  Users,
  Download,
  Subtitles
} from 'lucide-react';

const AcademySection =() =>{
    const {user} = useUser();
    const [activeTab , setActiveTab] = useState('overview')
    const [showModal,setShowModal] = useState(false);
    const [modalType ,setModalType] = useState(null);
    const [editingItem , setEditingItem] = useState(null);
    const [searchTerm , setSearchTerm] = useState('');
    const [filterType , setFilterType] = useState('all');
    const [uploadProgress , setUploadProgress] = useState(0);
    const [isUploading , setIsUploading] = useState(false);
    
    // File upload states
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    
    //checking if its doctor or not
    const isDoctor = user?.publicMetadata?.role === 'doctor' ||
    user?.publicMetadata?.role === 'admin';
    const isVerifiedDoctor = user?.publicMetadata?.verified === true && isDoctor;

    // Debug logging
    console.log('User metadata:', user?.publicMetadata);
    console.log('Is Doctor:', isDoctor);
    console.log('Is Verified Doctor:', isVerifiedDoctor);

    // Mock data for maternal health content
  const [videos, setVideos] = useState([
    {
      id: '1',
      title: 'Recognizing Preeclampsia: Life-Saving Warning Signs',
      description: 'Learn to identify the critical warning signs of preeclampsia that every pregnant woman and family member should know. Early detection can save lives.',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/v1234567890/sample.mp4',
      thumbnailUrl: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '15:30',
      category: 'Pregnancy Complications',
      medicalLevel: 'Basic',
      targetAudience: 'Expecting Mothers',
      pregnancyStage: 'Second Trimester',
      warningLevel: 'Warning',
      language: 'English',
      views: 12500,
      likes: 890,
      saves: 456,
      uploadDate: '2024-01-15',
      author: 'Dr. Sarah Johnson',
      doctorInfo: {
        specialization: 'Obstetrics & Gynecology',
        hospital: 'City General Hospital',
        experience: '15 years'
      },
      status: 'published',
      isEmergencyContent: true,
      medicalTags: ['preeclampsia', 'high blood pressure', 'pregnancy complications', 'warning signs']
    },
    {
      id: '2',
      title: 'Emergency Labor Signs: When to Rush to Hospital',
      description: 'Critical information about emergency labor signs that require immediate medical attention. Know when every minute counts.',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/v1234567891/sample2.mp4',
      thumbnailUrl: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '12:45',
      category: 'Labor & Delivery',
      medicalLevel: 'Emergency',
      targetAudience: 'Expecting Mothers',
      pregnancyStage: 'Third Trimester',
      warningLevel: 'Emergency',
      language: 'Hindi',
      views: 8900,
      likes: 670,
      saves: 234,
      uploadDate: '2024-01-12',
      author: 'Dr. Priya Sharma',
      doctorInfo: {
        specialization: 'High-Risk Pregnancy',
        hospital: 'Maternal Care Institute',
        experience: '18 years'
      },
      status: 'published',
      isEmergencyContent: true,
      medicalTags: ['emergency labor', 'delivery complications', 'hospital rush', 'labor signs']
    },
    {
      id: '3',
      title: 'Nutrition for Healthy Pregnancy: Preventing Complications',
      description: 'Complete guide to pregnancy nutrition that can prevent complications and ensure healthy development of your baby.',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/v1234567892/sample3.mp4',
      thumbnailUrl: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '20:15',
      category: 'Nutrition & Health',
      medicalLevel: 'Basic',
      targetAudience: 'Expecting Mothers',
      pregnancyStage: 'All Stages',
      warningLevel: 'Information',
      language: 'English',
      views: 15600,
      likes: 1200,
      saves: 890,
      uploadDate: '2024-01-10',
      author: 'Dr. Michael Chen',
      doctorInfo: {
        specialization: 'Maternal-Fetal Medicine',
        hospital: 'Women\'s Health Center',
        experience: '12 years'
      },
      status: 'published',
      isEmergencyContent: false,
      medicalTags: ['pregnancy nutrition', 'healthy diet', 'fetal development', 'vitamins']
    }
  ]);

  const [blogs, setBlogs] = useState([
    {
      id: '1',
      title: 'Understanding Maternal Mortality: Prevention is Key',
      content: 'Maternal mortality remains a critical global health issue. In this comprehensive guide, we explore the leading causes of maternal deaths and evidence-based prevention strategies...',
      excerpt: 'A comprehensive guide to understanding and preventing maternal mortality through early intervention and proper healthcare.',
      featuredImage: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Maternal Mortality Prevention',
      medicalLevel: 'Intermediate',
      targetAudience: 'Healthcare Workers',
      pregnancyStage: 'All Stages',
      warningLevel: 'Warning',
      language: 'English',
      readTime: '12 min read',
      views: 23400,
      likes: 1560,
      saves: 890,
      publishDate: '2024-01-18',
      author: 'Dr. Sarah Johnson',
      doctorInfo: {
        specialization: 'Obstetrics & Gynecology',
        hospital: 'City General Hospital',
        experience: '15 years'
      },
      status: 'published',
      isEmergencyContent: true,
      medicalTags: ['maternal mortality', 'prevention', 'healthcare', 'pregnancy complications'],
      references: [
        { title: 'WHO Maternal Mortality Guidelines', url: 'https://who.int', type: 'Guidelines' },
        { title: 'Lancet Maternal Health Series', url: 'https://lancet.com', type: 'Medical Journal' }
      ]
    },
    {
      id: '2',
      title: 'Postpartum Depression: Recognizing the Silent Killer',
      content: 'Postpartum depression affects millions of new mothers worldwide and can have devastating consequences if left untreated...',
      excerpt: 'Learn to recognize the signs of postpartum depression and understand when to seek immediate help for mental health during motherhood.',
      featuredImage: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Mental Health',
      medicalLevel: 'Basic',
      targetAudience: 'Family Members',
      pregnancyStage: 'Postpartum',
      warningLevel: 'Caution',
      language: 'Hindi',
      readTime: '8 min read',
      views: 18900,
      likes: 1340,
      saves: 567,
      publishDate: '2024-01-16',
      author: 'Dr. Priya Sharma',
      doctorInfo: {
        specialization: 'High-Risk Pregnancy',
        hospital: 'Maternal Care Institute',
        experience: '18 years'
      },
      status: 'published',
      isEmergencyContent: false,
      medicalTags: ['postpartum depression', 'mental health', 'new mothers', 'support'],
      references: [
        { title: 'Postpartum Depression Research', url: 'https://research.com', type: 'Research Paper' }
      ]
    }
  ]);

  const [posts, setPosts] = useState([
    {
      id: '1',
      title: '🚨 URGENT: New Guidelines for High-Risk Pregnancies',
      content: 'The Ministry of Health has released updated guidelines for managing high-risk pregnancies. All healthcare providers and expecting mothers should be aware of these critical changes that could save lives.',
      type: 'health_alert',
      category: 'Emergency Alerts',
      warningLevel: 'Emergency',
      targetAudience: 'Healthcare Workers',
      pregnancyStage: 'All Stages',
      language: 'English',
      priority: 'critical',
      isUrgent: true,
      views: 5670,
      likes: 450,
      shares: 234,
      comments: 89,
      publishDate: '2024-01-20',
      author: 'Dr. Sarah Johnson',
      doctorInfo: {
        specialization: 'Obstetrics & Gynecology',
        hospital: 'City General Hospital'
      },
      status: 'published',
      location: {
        country: 'India',
        isGlobal: true
      }
    },
    {
      id: '2',
      title: 'Weekly Prevention Tip: Iron Deficiency in Pregnancy',
      content: 'Iron deficiency anemia affects 50% of pregnant women in India. Here are simple, effective ways to prevent this common but serious condition that can lead to complications.',
      type: 'prevention_tip',
      category: 'Prevention Tips',
      warningLevel: 'Information',
      targetAudience: 'Expecting Mothers',
      pregnancyStage: 'All Stages',
      language: 'Hindi',
      priority: 'medium',
      isUrgent: false,
      views: 3200,
      likes: 280,
      shares: 156,
      comments: 45,
      publishDate: '2024-01-18',
      author: 'Dr. Michael Chen',
      doctorInfo: {
        specialization: 'Maternal-Fetal Medicine',
        hospital: 'Women\'s Health Center'
      },
      status: 'published',
      location: {
        country: 'India',
        state: 'Maharashtra',
        isGlobal: false
      }
    }
  ]);

  //stats calculation
  const stats =[
    {
        title: "Educational Videos",
        value: videos.length.toString(),
        subtitle: `${videos.filter(v=> v.isEmergencyContent).length} emergency content`,
        color: 'red',
        icon: Video,
        description: 'Life saving video content',
    },
    {
        title: 'Health Alerts' ,
        value: posts.filter(p =>p.isUrgent).length.toString(),
        subtitle: `${posts.filter(p=>p.warningLevel === 'Emergency').length} critical alerts`,
        color: 'orange',
        icon: AlertTriangle,
        description: 'Urgent health notifications',
    },
    {
        title: 'Lives Impacted',
        value: (videos.reduce((sum , v)=> sum + v.views , 0)+ blogs.reduce((sum,b)=> sum + b.views , 0)).toLocaleString(),
        subtitle: 'Total content views',
        color: 'green',
        icon: Heart,
        description: 'Mothers reached with info'
    }
  ];

  // File handling functions
  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        const url = URL.createObjectURL(file);
        setVideoPreview(url);
      } else {
        alert('Please select a valid video file');
      }
    }
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setThumbnailFile(file);
        const url = URL.createObjectURL(file);
        setThumbnailPreview(url);
      } else {
        alert('Please select a valid image file for thumbnail');
      }
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const url = URL.createObjectURL(file);
        setImagePreview(url);
      } else {
        alert('Please select a valid image file');
      }
    }
  };

  // Upload functions
  const uploadToCloudinary = async (file, resourceType = 'auto') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Academy_Uploads'); // Replace with your Cloudinary upload preset
    formData.append('resource_type', resourceType);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcnzsdszf/${resourceType}/upload`, // Replace with your cloud name
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  //Modal handlers
  const openModal = (type, item= null) =>{
    if(!isVerifiedDoctor){
        alert('Only verified doctors can create or edit medical content. Please complete your verification process to continue.');
        return;
    }
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
    
    // Reset file states
    setVideoFile(null);
    setThumbnailFile(null);
    setImageFile(null);
    setVideoPreview(null);
    setThumbnailPreview(null);
    setImagePreview(null);
  };

  const closeModal = () =>{
    setShowModal(false);
    setModalType(null);
    setEditingItem(null);
    setUploadProgress(0);
    setIsUploading(false);
    
    // Clean up file states
    setVideoFile(null);
    setThumbnailFile(null);
    setImageFile(null);
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setVideoPreview(null);
    setThumbnailPreview(null);
    setImagePreview(null);
  };

  const handleSaveVideo = async(videoData) =>{
    try {
        setIsUploading(true);
        setUploadProgress(10);

        let videoUrl = editingItem?.videoUrl;
        let thumbnailUrl = editingItem?.thumbnailUrl;
        let cloudinaryPublicId = editingItem?.cloudinaryPublicId;
        let thumbnailPublicId = editingItem?.thumbnailPublicId;

        // Upload video if new file selected
        if (videoFile) {
          setUploadProgress(30);
          const videoUpload = await uploadToCloudinary(videoFile, 'video');
          videoUrl = videoUpload.url;
          cloudinaryPublicId = videoUpload.publicId;
        }

        // Upload thumbnail if new file selected
        if (thumbnailFile) {
          setUploadProgress(60);
          const thumbnailUpload = await uploadToCloudinary(thumbnailFile, 'image');
          thumbnailUrl = thumbnailUpload.url;
          thumbnailPublicId = thumbnailUpload.publicId;
        }

        setUploadProgress(80);

        const completeVideoData = {
          ...videoData,
          videoUrl,
          thumbnailUrl,
          cloudinaryPublicId,
          thumbnailPublicId
        };

        if(editingItem){
            setVideos(videos.map(video=> video.id === editingItem.id ?{...video , ...completeVideoData , lastUpdated: new Date().toISOString()}: video));
        }
        else{
            const newVideo ={
                id: Date.now().toString(),
                ...completeVideoData,
                views: 0,
                likes: 0,
                saves:0,
                uploadDate: new Date().toISOString().split('T')[0],
                author: user?.fullName || 'Unknown Doctor',
                doctorInfo:{
                    specialization: user?.publicMetadata?.specialization || 'General Medicine',
                    hospital: user?.publicMetadata?.hospital || 'Medical Center',
                    experience: user?.publicMetadata?.experience || 'Experienced',
                },
                status: 'under_review',
                isEmergencyContent: videoData.warningLevel === 'Emergency'
            };
            setVideos([...videos, newVideo]);
        }
        
        setUploadProgress(100);
        setTimeout(() => {
          closeModal();
        }, 1000);
    } catch (error) {
        console.error('Error saving Video: ',error);
        alert('Error uploading video. Please try again.');
        setIsUploading(false);
        setUploadProgress(0);
    }
  };

   const handleSaveBlog = async (blogData) => {
    try {
      setIsUploading(true);
      setUploadProgress(10);

      let featuredImage = editingItem?.featuredImage;
      let imagePublicId = editingItem?.imagePublicId;

      // Upload featured image if new file selected
      if (imageFile) {
        setUploadProgress(50);
        const imageUpload = await uploadToCloudinary(imageFile, 'image');
        featuredImage = imageUpload.url;
        imagePublicId = imageUpload.publicId;
      }

      setUploadProgress(80);

      const completeBlogData = {
        ...blogData,
        featuredImage,
        imagePublicId
      };

      if (editingItem) {
        setBlogs(blogs.map(blog => 
          blog.id === editingItem.id ? { ...blog, ...completeBlogData, lastUpdated: new Date().toISOString() } : blog
        ));
      } else {
        const newBlog = {
          id: Date.now().toString(),
          ...completeBlogData,
          views: 0,
          likes: 0,
          saves: 0,
          publishDate: new Date().toISOString().split('T')[0],
          author: user?.fullName || 'Unknown Doctor',
          doctorInfo: {
            specialization: user?.publicMetadata?.specialization || 'General Medicine',
            hospital: user?.publicMetadata?.hospital || 'Medical Center',
            experience: user?.publicMetadata?.experience || 'Experienced'
          },
          status: 'under_review',
          isEmergencyContent: blogData.warningLevel === 'Emergency',
          references: []
        };
        setBlogs([...blogs, newBlog]);
      }
      
      setUploadProgress(100);
      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error uploading blog. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSavePost = async (postData) => {
    try {
      if (editingItem) {
        setPosts(posts.map(post => 
          post.id === editingItem.id ? { ...post, ...postData, lastUpdated: new Date().toISOString() } : post
        ));
      } else {
        const newPost = {
          id: Date.now().toString(),
          ...postData,
          views: 0,
          likes: 0,
          shares: 0,
          comments: 0,
          publishDate: new Date().toISOString().split('T')[0],
          author: user?.fullName || 'Unknown Doctor',
          doctorInfo: {
            specialization: user?.publicMetadata?.specialization || 'General Medicine',
            hospital: user?.publicMetadata?.hospital || 'Medical Center'
          },
          status: 'under_review',
          isUrgent: postData.priority === 'critical' || postData.warningLevel === 'Emergency',
          location: {
            country: 'India',
            isGlobal: true
          }
        };
        setPosts([...posts, newPost]);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDeleteVideo =(id) =>{
    if(!isVerifiedDoctor){
        alert('Only verified doctors have this access');
        return;
    }
    if(confirm('Are you sure you want to delete this content ?')){
        setVideos(videos.filter(video => video.id !== id));
    }
  };

  const handleDeleteBlog =(id) =>{
    if(!isVerifiedDoctor){
        alert('Only verified doctors have this access');
        return;
    }
    if(confirm('Are you sure you want to delete selected blog?')){
        setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

    const handleDeletePost = (id) => {
    if (!isVerifiedDoctor) {
      alert('Only verified doctors can delete health alerts.');
      return;
    }
    if (confirm('Are you sure you want to delete this health alert? This action cannot be undone.')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const getFilteredContent =(content , type) =>{
    let filtered = content;
    if(searchTerm){
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description && 
                item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.content &&
                item.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.medicalTags && item.medicalTags.some(tag =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())))        
        );
    }
     if (filterType !== 'all') {
      if (filterType === 'emergency') {
        filtered = filtered.filter(item => item.isEmergencyContent || item.warningLevel === 'Emergency');
      } else if (filterType === 'published' || filterType === 'under_review') {
        filtered = filtered.filter(item => item.status === filterType);
      } else {
        filtered = filtered.filter(item => 
          item.category?.toLowerCase().includes(filterType.toLowerCase()) ||
          item.pregnancyStage?.toLowerCase().includes(filterType.toLowerCase()) ||
          item.warningLevel?.toLowerCase().includes(filterType.toLowerCase())
        );
      }
    }

    return filtered;
  };

  const getWarningLevelColor = (level) => {
    switch (level) {
      case 'Emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'Warning': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Caution': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getWarningIcon = (level) => {
    switch (level) {
      case 'Emergency': return <AlertTriangle className="w-4 h-4" />;
      case 'Warning': return <AlertCircle className="w-4 h-4" />;
      case 'Caution': return <Shield className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Doctor Verification Status */}
      {isDoctor && !isVerifiedDoctor && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Doctor Verification Required</h3>
              <p className="text-yellow-700 mt-1">
                To create medical content that can save lives, please complete your doctor verification process. 
                Upload your medical license and credentials to get verified.
              </p>
              <div className="mt-2 text-sm text-yellow-600">
                <p>Current role: {user?.publicMetadata?.role || 'Not set'}</p>
                <p>Verified status: {user?.publicMetadata?.verified ? 'Yes' : 'No'}</p>
              </div>
              <button className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Complete Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                stat.color === 'red' ? 'bg-red-100 text-red-600' :
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                'bg-green-100 text-green-600'
              }`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1 text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
              <p className="text-xs text-gray-500 mb-1">{stat.description}</p>
              <p className={`text-xs font-medium ${
                stat.color === 'red' ? 'text-red-600' :
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'orange' ? 'text-orange-600' :
                'text-green-600'
              }`}>
                {stat.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions for Verified Doctors */}
      {isVerifiedDoctor && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">Create Life-Saving Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => openModal('video')}
              className="flex flex-col items-center p-6 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group border border-red-200"
            >
              <Video className="w-8 h-8 text-red-600 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-red-700 font-medium">Emergency Video</span>
              <span className="text-red-600 text-sm mt-1">Share critical medical knowledge</span>
            </button>
            <button
              onClick={() => openModal('blog')}
              className="flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group border border-blue-200"
            >
              <FileText className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-blue-700 font-medium">Medical Article</span>
              <span className="text-blue-600 text-sm mt-1">Write detailed health guides</span>
            </button>
            <button
              onClick={() => openModal('post')}
              className="flex flex-col items-center p-6 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group border border-orange-200"
            >
              <AlertTriangle className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-orange-700 font-medium">Health Alert</span>
              <span className="text-orange-600 text-sm mt-1">Send urgent notifications</span>
            </button>
          </div>
        </div>
      )}

      {/* Emergency Content Highlight */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-lg font-semibold text-red-800">Emergency Medical Content</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-red-700 mb-3">Critical Videos</h4>
            <div className="space-y-3">
              {videos.filter(v => v.isEmergencyContent).slice(0, 2).map((video) => (
                <div key={video.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-red-100">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 text-sm truncate">{video.title}</h5>
                    <p className="text-xs text-gray-500">{video.views.toLocaleString()} views • {video.duration}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    {video.warningLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-red-700 mb-3">Recent Health Alerts</h4>
            <div className="space-y-3">
              {posts.filter(p => p.isUrgent).slice(0, 2).map((post) => (
                <div key={post.id} className="p-3 bg-white rounded-lg border border-red-100">
                  <h5 className="font-medium text-gray-900 text-sm mb-1">{post.title}</h5>
                  <p className="text-xs text-gray-600 mb-2">{post.content.substring(0, 100)}...</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{post.views} views</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                      {post.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Latest Medical Videos</h3>
          <div className="space-y-4">
            {videos.slice(0, 3).map((video) => (
              <div key={video.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-16 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{video.title}</h4>
                  <p className="text-sm text-gray-500">{video.views.toLocaleString()} views • {video.duration}</p>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getWarningLevelColor(video.warningLevel)}`}>
                      {getWarningIcon(video.warningLevel)}
                      <span className="ml-1">{video.warningLevel}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Medical Articles</h3>
          <div className="space-y-4">
            {blogs.slice(0, 3).map((blog) => (
              <div key={blog.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-16 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{blog.title}</h4>
                  <p className="text-sm text-gray-500">{blog.views.toLocaleString()} views • {blog.readTime}</p>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getWarningLevelColor(blog.warningLevel)}`}>
                      {getWarningIcon(blog.warningLevel)}
                      <span className="ml-1">{blog.warningLevel}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVideos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Medical Video Library</h2>
        {isVerifiedDoctor && (
          <button
            onClick={() => openModal('video')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Medical Video
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search medical videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="emergency">Emergency Content</option>
          <option value="published">Published</option>
          <option value="under_review">Under Review</option>
          <option value="Pregnancy Complications">Pregnancy Complications</option>
          <option value="Labor & Delivery">Labor & Delivery</option>
          <option value="Nutrition & Health">Nutrition & Health</option>
          <option value="Mental Health">Mental Health</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredContent(videos, 'videos').map((video) => (
          <div key={video.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
              {video.isEmergencyContent && (
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  EMERGENCY
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getWarningLevelColor(video.warningLevel)}`}>
                  {video.warningLevel}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                {isVerifiedDoctor && video.author === user?.fullName && (
                  <div className="flex space-x-2 ml-2">
                    <button
                      onClick={() => openModal('video', video)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-xs text-gray-500">
                  <Stethoscope className="w-3 h-3 mr-1" />
                  <span>{video.doctorInfo.specialization}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Baby className="w-3 h-3 mr-1" />
                  <span>{video.pregnancyStage}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Globe className="w-3 h-3 mr-1" />
                  <span>{video.language}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {video.views.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {video.likes}
                  </span>
                  <span className="flex items-center">
                    <Bookmark className="w-4 h-4 mr-1" />
                    {video.saves}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  video.status === 'published' ? 'bg-green-100 text-green-800' : 
                  video.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {video.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-400">{video.uploadDate}</span>
              </div>

              <div className="mt-3 text-xs text-gray-600">
                <span className="font-medium">Dr. {video.author}</span> • {video.doctorInfo.hospital}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Medical Articles & Guides</h2>
        {isVerifiedDoctor && (
          <button
            onClick={() => openModal('blog')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Write Medical Article
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search medical articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="emergency">Emergency Content</option>
          <option value="published">Published</option>
          <option value="under_review">Under Review</option>
          <option value="Maternal Mortality Prevention">Maternal Mortality Prevention</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Prenatal Care">Prenatal Care</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {getFilteredContent(blogs, 'blogs').map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              {blog.isEmergencyContent && (
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  CRITICAL
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getWarningLevelColor(blog.warningLevel)}`}>
                  {blog.warningLevel}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{blog.title}</h3>
                {isVerifiedDoctor && blog.author === user?.fullName && (
                  <div className="flex space-x-2 ml-2">
                    <button
                      onClick={() => openModal('blog', blog)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  <span>{blog.doctorInfo.specialization}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Baby className="w-4 h-4 mr-2" />
                  <span>{blog.pregnancyStage}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{blog.language}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {blog.views.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {blog.likes}
                  </span>
                  <span className="flex items-center">
                    <Bookmark className="w-4 h-4 mr-1" />
                    {blog.saves}
                  </span>
                </div>
                <span>{blog.readTime}</span>
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  blog.status === 'published' ? 'bg-green-100 text-green-800' : 
                  blog.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {blog.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-400">{blog.publishDate}</span>
              </div>

              <div className="text-sm text-gray-600 border-t pt-3">
                <span className="font-medium">Dr. {blog.author}</span> • {blog.doctorInfo.hospital}
              </div>

              {blog.references && blog.references.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-1">Medical References:</p>
                  <div className="flex flex-wrap gap-1">
                    {blog.references.slice(0, 2).map((ref, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {ref.type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Health Alerts & Updates</h2>
        {isVerifiedDoctor && (
          <button
            onClick={() => openModal('post')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Health Alert
          </button>
        )}
      </div>

      <div className="space-y-4">
        {getFilteredContent(posts, 'posts').map((post) => (
          <div key={post.id} className={`bg-white rounded-lg border-2 p-6 hover:shadow-md transition-shadow ${
            post.isUrgent ? 'border-red-200 bg-red-50' : 'border-gray-200'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {post.isUrgent && (
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                    post.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    post.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    post.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {post.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{post.content}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{post.targetAudience}</span>
                  </div>
                  <div className="flex items-center">
                    <Baby className="w-4 h-4 mr-1" />
                    <span>{post.pregnancyStage}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    <span>{post.language}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{post.location.isGlobal ? 'Global' : post.location.state}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.views} views
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes} likes
                  </span>
                  <span className="flex items-center">
                    <Share2 className="w-4 h-4 mr-1" />
                    {post.shares} shares
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {post.comments} comments
                  </span>
                  <span>{post.publishDate}</span>
                </div>
              </div>
              {isVerifiedDoctor && post.author === user?.fullName && (
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => openModal('post', post)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getWarningLevelColor(post.warningLevel)}`}>
                  {getWarningIcon(post.warningLevel)}
                  <span className="ml-1">{post.warningLevel}</span>
                </span>
                <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                  post.status === 'published' ? 'bg-green-100 text-green-800' : 
                  post.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {post.status.replace('_', ' ')}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Dr. {post.author} • {post.doctorInfo.specialization}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'videos':
        return renderVideos();
      case 'blogs':
        return renderBlogs();
      case 'posts':
        return renderPosts();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6 px-10">
      {/* Maternal Health Academy Header */}
      <div className="bg-gradient-to-r from-[rgba(0,85,149,1)] via-[#0573c8] to-[#0879cf] rounded-xl p-8 text-white">
        <div className="flex items-center mb-4">
          <Heart className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Maternal Health Academy</h1>
            <p className="text-white text-lg">
              Saving lives through medical education and awareness
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              <div>
                <div className="text-2xl font-bold text-[rgba(0,85,149,1)]">95%</div>
                <div className="text-md text-[rgba(0,85,149,1)]">Preventable Deaths</div>
              </div>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center">
              <Baby className="w-6 h-6 mr-2" />
              <div>
                <div className="text-2xl font-bold text-[rgba(0,85,149,1)]">830</div>
                <div className="text-md text-[rgba(0,85,149,1)]">Daily Global Deaths</div>
              </div>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              <div>
                <div className="text-2xl font-bold text-[#276493]">67%</div>
                <div className="text-md text-[rgba(0,85,149,1)]">Reduction Possible</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-1">
        <nav className="flex space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'videos', label: 'Medical Videos', icon: Video },
            { id: 'blogs', label: 'Health Articles', icon: FileText },
            { id: 'posts', label: 'Health Alerts', icon: AlertTriangle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[rgba(58,144,202,0.17)] text-[rgba(0,85,149,1)]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Medical Content Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {editingItem ? 'Edit' : 'Create'} {modalType?.charAt(0).toUpperCase() + modalType?.slice(1)}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Uploading medical content...</span>
                    <span className="text-sm text-gray-500">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());

                // Convert tags string to array
                if (data.medicalTags) {
                  data.medicalTags = data.medicalTags.split(',').map(tag => tag.trim());
                }

                try {
                  if (modalType === 'video') handleSaveVideo(data);
                  else if (modalType === 'blog') handleSaveBlog(data);
                  else if (modalType === 'post') handleSavePost(data);
                } catch (error) {
                  alert('Error saving medical content. Please try again.');
                }
              }}>
                <div className="space-y-6">
                  {modalType === 'video' && (
                    <>
                      {/* Video Upload Section */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Video Upload</h4>
                        
                        {/* Video File Upload */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Medical Video File *</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                            <input
                              type="file"
                              accept="video/*"
                              onChange={handleVideoFileChange}
                              className="hidden"
                              id="video-upload"
                              required={!editingItem}
                            />
                            <label htmlFor="video-upload" className="cursor-pointer">
                              {videoPreview ? (
                                <div className="space-y-2">
                                  <video
                                    src={videoPreview}
                                    className="w-full max-w-md mx-auto rounded-lg"
                                    controls
                                  />
                                  <p className="text-sm text-gray-600">Click to change video</p>
                                </div>
                              ) : editingItem?.videoUrl ? (
                                <div className="space-y-2">
                                  <video
                                    src={editingItem.videoUrl}
                                    className="w-full max-w-md mx-auto rounded-lg"
                                    controls
                                  />
                                  <p className="text-sm text-gray-600">Click to change video</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <Video className="w-12 h-12 text-gray-400 mx-auto" />
                                  <p className="text-gray-600">Click to upload medical video</p>
                                  <p className="text-xs text-gray-500">MP4, MOV, AVI up to 500MB</p>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>

                        {/* Thumbnail Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Video Thumbnail *</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleThumbnailFileChange}
                              className="hidden"
                              id="thumbnail-upload"
                              required={!editingItem}
                            />
                            <label htmlFor="thumbnail-upload" className="cursor-pointer">
                              {thumbnailPreview ? (
                                <div className="space-y-2">
                                  <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail preview"
                                    className="w-full max-w-xs mx-auto rounded-lg"
                                  />
                                  <p className="text-sm text-gray-600">Click to change thumbnail</p>
                                </div>
                              ) : editingItem?.thumbnailUrl ? (
                                <div className="space-y-2">
                                  <img
                                    src={editingItem.thumbnailUrl}
                                    alt="Current thumbnail"
                                    className="w-full max-w-xs mx-auto rounded-lg"
                                  />
                                  <p className="text-sm text-gray-600">Click to change thumbnail</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                                  <p className="text-gray-600">Click to upload thumbnail</p>
                                  <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Video Title *</label>
                        <input
                          name="title"
                          type="text"
                          defaultValue={editingItem?.title || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          placeholder="e.g., Recognizing Preeclampsia Warning Signs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Description *</label>
                        <textarea
                          name="description"
                          rows={3}
                          defaultValue={editingItem?.description || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          placeholder="Detailed medical description of the content and its importance"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Medical Category *</label>
                          <select
                            name="category"
                            defaultValue={editingItem?.category || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Medical Category</option>
                            <option value="Prenatal Care">Prenatal Care</option>
                            <option value="Pregnancy Complications">Pregnancy Complications</option>
                            <option value="Labor & Delivery">Labor & Delivery</option>
                            <option value="Postpartum Care">Postpartum Care</option>
                            <option value="Emergency Signs">Emergency Signs</option>
                            <option value="Nutrition & Health">Nutrition & Health</option>
                            <option value="Mental Health">Mental Health</option>
                            <option value="High-Risk Pregnancy">High-Risk Pregnancy</option>
                            <option value="Preventive Care">Preventive Care</option>
                            <option value="Family Planning">Family Planning</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Medical Level *</label>
                          <select
                            name="medicalLevel"
                            defaultValue={editingItem?.medicalLevel || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Medical Level</option>
                            <option value="Basic">Basic (General Public)</option>
                            <option value="Intermediate">Intermediate (Healthcare Workers)</option>
                            <option value="Advanced">Advanced (Medical Professionals)</option>
                            <option value="Emergency">Emergency (Critical Information)</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience *</label>
                          <select
                            name="targetAudience"
                            defaultValue={editingItem?.targetAudience || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Target Audience</option>
                            <option value="Expecting Mothers">Expecting Mothers</option>
                            <option value="Healthcare Workers">Healthcare Workers</option>
                            <option value="Family Members">Family Members</option>
                            <option value="General Public">General Public</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancy Stage *</label>
                          <select
                            name="pregnancyStage"
                            defaultValue={editingItem?.pregnancyStage || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Pregnancy Stage</option>
                            <option value="Pre-conception">Pre-conception</option>
                            <option value="First Trimester">First Trimester</option>
                            <option value="Second Trimester">Second Trimester</option>
                            <option value="Third Trimester">Third Trimester</option>
                            <option value="Labor">Labor</option>
                            <option value="Postpartum">Postpartum</option>
                            <option value="All Stages">All Stages</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Warning Level *</label>
                          <select
                            name="warningLevel"
                            defaultValue={editingItem?.warningLevel || 'Information'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="Information">Information</option>
                            <option value="Caution">Caution</option>
                            <option value="Warning">Warning</option>
                            <option value="Emergency">Emergency</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
                          <select
                            name="language"
                            defaultValue={editingItem?.language || 'English'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Bengali">Bengali</option>
                            <option value="Tamil">Tamil</option>
                            <option value="Telugu">Telugu</option>
                            <option value="Marathi">Marathi</option>
                            <option value="Gujarati">Gujarati</option>
                            <option value="Urdu">Urdu</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                        <input
                          name="duration"
                          type="text"
                          placeholder="e.g., 15:30"
                          defaultValue={editingItem?.duration || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Tags</label>
                        <input
                          name="medicalTags"
                          type="text"
                          placeholder="e.g., preeclampsia, high blood pressure, warning signs"
                          defaultValue={editingItem?.medicalTags?.join(', ') || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                      </div>
                    </>
                  )}

                  {modalType === 'blog' && (
                    <>
                      {/* Featured Image Upload Section */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h4>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                            id="image-upload"
                            required={!editingItem}
                          />
                          <label htmlFor="image-upload" className="cursor-pointer">
                            {imagePreview ? (
                              <div className="space-y-2">
                                <img
                                  src={imagePreview}
                                  alt="Image preview"
                                  className="w-full max-w-md mx-auto rounded-lg"
                                />
                                <p className="text-sm text-gray-600">Click to change image</p>
                              </div>
                            ) : editingItem?.featuredImage ? (
                              <div className="space-y-2">
                                <img
                                  src={editingItem.featuredImage}
                                  alt="Current featured image"
                                  className="w-full max-w-md mx-auto rounded-lg"
                                />
                                <p className="text-sm text-gray-600">Click to change image</p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                                <p className="text-gray-600">Click to upload featured image</p>
                                <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Article Title *</label>
                        <input
                          name="title"
                          type="text"
                          defaultValue={editingItem?.title || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          placeholder="e.g., Understanding Maternal Mortality: Prevention Strategies"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Excerpt *</label>
                        <textarea
                          name="excerpt"
                          rows={2}
                          defaultValue={editingItem?.excerpt || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          placeholder="Brief summary of the medical content"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Content *</label>
                        <textarea
                          name="content"
                          rows={10}
                          defaultValue={editingItem?.content || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          placeholder="Detailed medical article content with evidence-based information"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Medical Category *</label>
                          <select
                            name="category"
                            defaultValue={editingItem?.category || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Medical Category</option>
                            <option value="Prenatal Care">Prenatal Care</option>
                            <option value="Pregnancy Complications">Pregnancy Complications</option>
                            <option value="Labor & Delivery">Labor & Delivery</option>
                            <option value="Postpartum Care">Postpartum Care</option>
                            <option value="Emergency Signs">Emergency Signs</option>
                            <option value="Nutrition & Health">Nutrition & Health</option>
                            <option value="Mental Health">Mental Health</option>
                            <option value="High-Risk Pregnancy">High-Risk Pregnancy</option>
                            <option value="Preventive Care">Preventive Care</option>
                            <option value="Family Planning">Family Planning</option>
                            <option value="Maternal Mortality Prevention">Maternal Mortality Prevention</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Read Time *</label>
                          <input
                            name="readTime"
                            type="text"
                            placeholder="e.g., 8 min read"
                            defaultValue={editingItem?.readTime || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Medical Level *</label>
                          <select
                            name="medicalLevel"
                            defaultValue={editingItem?.medicalLevel || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Medical Level</option>
                            <option value="Basic">Basic (General Public)</option>
                            <option value="Intermediate">Intermediate (Healthcare Workers)</option>
                            <option value="Advanced">Advanced (Medical Professionals)</option>
                            <option value="Emergency">Emergency (Critical Information)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience *</label>
                          <select
                            name="targetAudience"
                            defaultValue={editingItem?.targetAudience || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Target Audience</option>
                            <option value="Expecting Mothers">Expecting Mothers</option>
                            <option value="Healthcare Workers">Healthcare Workers</option>
                            <option value="Family Members">Family Members</option>
                            <option value="General Public">General Public</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancy Stage *</label>
                          <select
                            name="pregnancyStage"
                            defaultValue={editingItem?.pregnancyStage || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Pregnancy Stage</option>
                            <option value="Pre-conception">Pre-conception</option>
                            <option value="First Trimester">First Trimester</option>
                            <option value="Second Trimester">Second Trimester</option>
                            <option value="Third Trimester">Third Trimester</option>
                            <option value="Labor">Labor</option>
                            <option value="Postpartum">Postpartum</option>
                            <option value="All Stages">All Stages</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Warning Level *</label>
                          <select
                            name="warningLevel"
                            defaultValue={editingItem?.warningLevel || 'Information'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="Information">Information</option>
                            <option value="Caution">Caution</option>
                            <option value="Warning">Warning</option>
                            <option value="Emergency">Emergency</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
                        <select
                          name="language"
                          defaultValue={editingItem?.language || 'English'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          required
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Bengali">Bengali</option>
                          <option value="Tamil">Tamil</option>
                          <option value="Telugu">Telugu</option>
                          <option value="Marathi">Marathi</option>
                          <option value="Gujarati">Gujarati</option>
                          <option value="Urdu">Urdu</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Tags</label>
                        <input
                          name="medicalTags"
                          type="text"
                          placeholder="e.g., maternal mortality, prevention, healthcare"
                          defaultValue={editingItem?.medicalTags?.join(', ') || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                      </div>
                    </>
                  )}

                  {modalType === 'post' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Health Alert Title *</label>
                        <input
                          name="title"
                          type="text"
                          defaultValue={editingItem?.title || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          placeholder="e.g., 🚨 URGENT: New Guidelines for High-Risk Pregnancies"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alert Content *</label>
                        <textarea
                          name="content"
                          rows={6}
                          defaultValue={editingItem?.content || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          placeholder="Detailed health alert information that could save lives"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type *</label>
                          <select
                            name="type"
                            defaultValue={editingItem?.type || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Alert Type</option>
                            <option value="health_alert">Health Alert</option>
                            <option value="emergency_notice">Emergency Notice</option>
                            <option value="awareness_campaign">Awareness Campaign</option>
                            <option value="community_update">Community Update</option>
                            <option value="research_update">Research Update</option>
                            <option value="prevention_tip">Prevention Tip</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                          <select
                            name="category"
                            defaultValue={editingItem?.category || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Category</option>
                            <option value="Emergency Alerts">Emergency Alerts</option>
                            <option value="Prevention Tips">Prevention Tips</option>
                            <option value="Community Health">Community Health</option>
                            <option value="Research Updates">Research Updates</option>
                            <option value="Awareness Campaigns">Awareness Campaigns</option>
                            <option value="Health Guidelines">Health Guidelines</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Warning Level *</label>
                          <select
                            name="warningLevel"
                            defaultValue={editingItem?.warningLevel || 'Information'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="Information">Information</option>
                            <option value="Caution">Caution</option>
                            <option value="Warning">Warning</option>
                            <option value="Emergency">Emergency</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
                          <select
                            name="priority"
                            defaultValue={editingItem?.priority || 'medium'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience *</label>
                          <select
                            name="targetAudience"
                            defaultValue={editingItem?.targetAudience || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            required
                          >
                            <option value="">Select Target Audience</option>
                            <option value="Expecting Mothers">Expecting Mothers</option>
                            <option value="Healthcare Workers">Healthcare Workers</option>
                            <option value="Family Members">Family Members</option>
                            <option value="General Public">General Public</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancy Stage</label>
                          <select
                            name="pregnancyStage"
                            defaultValue={editingItem?.pregnancyStage || 'All Stages'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          >
                            <option value="Pre-conception">Pre-conception</option>
                            <option value="First Trimester">First Trimester</option>
                            <option value="Second Trimester">Second Trimester</option>
                            <option value="Third Trimester">Third Trimester</option>
                            <option value="Labor">Labor</option>
                            <option value="Postpartum">Postpartum</option>
                            <option value="All Stages">All Stages</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
                        <select
                          name="language"
                          defaultValue={editingItem?.language || 'English'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                          required
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Bengali">Bengali</option>
                          <option value="Tamil">Tamil</option>
                          <option value="Telugu">Telugu</option>
                          <option value="Marathi">Marathi</option>
                          <option value="Gujarati">Gujarati</option>
                          <option value="Urdu">Urdu</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Medical Content...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        {editingItem ? 'Update Medical Content' : 'Create Medical Content'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isUploading}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademySection;