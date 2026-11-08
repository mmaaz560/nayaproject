import { Post } from '../model/postModel.js';

export const addpost = async(req, res) => {
    try {
        const { title, media, content } = req.body;

        // FormData hai to image req.file mein aayegi (multer se)
        const mediaUrl = req.file ?
            `/uploads/${req.file.filename}` :
            media || null;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required',
            });
        }

        const post = new Post({
            title,
            media: mediaUrl,
            content,
        });

        // 🔴 SABSE ZAROORI LINE — MongoDB mein save karo
        const savedPost = await post.save();

        console.log('✅ Post saved to MongoDB:', savedPost._id);

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: savedPost, // ← frontend ko poora post object bhejo
        });

    } catch (error) {
        console.error('❌ addpost error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create post',
        });
    }
};

export const getpost = async(req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatepost = async(req, res) => {
    try {
        const { id } = req.params; // URL se ID milegi
        const { title, media, content } = req.body;

        // Agar nayi image upload hui hai
        const mediaUrl = req.file ?
            `/uploads/${req.file.filename}` :
            media;

        const updatedPost = await Post.findByIdAndUpdate(
            id, {
                title,
                content,
                ...(mediaUrl && { media: mediaUrl }), // agar media hai tabhi update karo
            }, { new: true } // updated document return karega
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        console.log('✅ Post updated in MongoDB:', updatedPost._id);

        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: updatedPost,
        });

    } catch (error) {
        console.error('❌ updatepost error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update post',
        });
    }
};

export const deletepost = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        console.log('🗑️ Post deleted from MongoDB:', id);

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: { _id: id },
        });

    } catch (error) {
        console.error('❌ deletepost error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete post',
        });
    }
};