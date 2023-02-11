const Like = require("../models/likes");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async function(req, res){
    console.log("req", req.Like)
    try {
        // likes/toggle/?id=abcd546&type=Post


        let likeable;
        let deleted = false;

        if(req.query.type == "Post"){
            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
            likeable = await Comment.findById(req.query.id).populate("likes")

        }
        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if a like alredy exists Type
        if(existingLike){
            likeable.likes.pull((existingLike._id))
            likeable.remove();

            existingLike.remove();
            deleted = true;
        }else{
            // else make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likiable: req.query.id,
                onModel: req.query.type
            })

            likeable.likes.push(newLike._id);
            likeable.save()
        }

        return res.json(200, {
            message: "Request succesful",
            data: {
                deleted: deleted
            }
        })


        
    } catch (error) {
        console.log('err', error);

        return res.json(500, {
            message: "Internal Sever Error"
        })
    }
    
    
}

