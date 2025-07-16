import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 300,
    },
    content: {
        type: String,
        required: true,
    },
    featuredImage: {
        type: String,
        required: true,
    },
    imagePublicId: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Prenatal Care',
            'Maternal Health',
            'Pregnancy Complications',
            'Emergency Signs',
            'Nutrition During Pregnancy',
            'Mental Health Support',
            'Healthcare Access',
            'Birth Preparedness',
            'Postpartum Care',
            'Family Planning',
            'Healthcare Provider Resources',
            'Community Support',
            'Policy & Advocacy',
            'Research & Statistics',
            'Success Stories',
            'Educational Resources',
            'Emergency Protocols',
            'Other'
        ]
    },
    tags:[{
        type:String,
        trim:true,
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    status: {
        type: String,
        enum:['draft' , 'published' , 'archived'],
        default: 'draft'
    },
    readTime: {
        type: String,
        required:true,
    },
    views: {
        type:Number,
        default: 0,
    },
    likes:[{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt:{
            type:Date,
            default: Date.now,
        },
    }],
    comments: [{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        content: {
            type: String,
            required:true,
            maxlength: 500,
        },
        createdAt:{
            type: Date,
            default:Date.now,
        },
    }],
    publishedAt:{
        type:Date,
    }},
    {
        timestamps: true,
    }
);

//we will use indexes in order to improve performance so that mongo db ko pura scan krne ki jrurat na pade

blogSchema.index({status:1 , publishedAt: -1});
blogSchema.index({category: 1});
blogSchema.index({author:1});
blogSchema.index({title: 'text' , excerpt: 'text' , content: 'text'})

//using virtual so that the required value db me ni store ho only virtually update ho and show kre

blogSchema.virtual('likeCount').get(function(){
    return this.comments.length;
});
//this acting as a middleware 
blogSchema.pre('save' ,function(next){
    if(this.status === 'published' && !this.publishedAt){
        this.publishedAt =  new Date();
    }
    next();
});

export default mongoose.model('Blog' , blogSchema);