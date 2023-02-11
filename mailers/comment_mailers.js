const nodemailer = require("../config/nodemailer");

//this is another way of exporting a method
exports.newComment = (comment)=>{
    // console.log('inside newComment Mailer', comment);
    let htmlString = nodemailer.renderTemplete({
        comment: comment
    }, '/comments/new_comment.ejs')
    nodemailer.transpoter.sendMail({
        from: 'codeial.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString

    }, (err, info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log("Message send", info);
        return
    })

}