import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// import User from '../models/User';

export const authenticate = async(req,res,next) =>{
    try {
        const token = req.header('Authentication')?.replace('Bearer','');
        if(!token){
            return res.status(401).json({
                success:false,
                message: 'Access denied. No token were provided'
            });
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({
                success:false,
                message: "Token is invalid"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"Token is not valid"
        });
    }
};

export const authorize =(...roles)  =>{
    return (req,res,next) =>{
        if(!req.user){
            return res.status(401).json({
                success:false,
                message: 'Access denied. kindly login first',
            });
        }
        if(!roles.include(req.user.role)){
            return res.status(403).json({
                success:false,
                message: 'Access denied Insufficient permissions'
            });
        }
        nest();
    };
};

export const canEdit = (req,res,next)=>{
    if(!req.user){
        return res.status(401).json({
            succes:false,
            message: 'Access denied. Please login'
        });
    }
    if(!req.user.hasPermission('editor')){
        return res.status(403).json({
            success:false,
            message:'Permission denied. Editor permission denied.'
        });
    }
    nest();
};

export const canManageUsers = (req,res,next) =>{
    if(!req.user){
        return res.status(401).json({
            success:false,
            message:'Access denied. Kindly Login'
        });
    }
    if(!req.user.hasPermission('admin')){
        return res.status(403).json({
            success:false,
            message:'Access denied. Admin permissions required.'
        });
    }
    nest();
};