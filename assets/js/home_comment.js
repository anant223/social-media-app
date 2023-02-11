{
   // create comment
    let createComment = function(){
        let newCommentForm = $("#new-comment-form");
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
              type: "Post",
              url: "/comments/create",
              data: newCommentForm.serialize(),
              success: function(data){
                console.log(data)
                let newComment = newCommentDOM(data.data.comment);
                $("#postCommentList>ul").prepend(newComment);
                deleteComment($(".delete-comment-button", newComment));
                new Noty({
                    theme: "relax",
                    text: "Comment published!",
                    type: "success",
                    layout: "topRight",
                    timeout: 1500,
                }).show();

              },error(err){
                console.log(err.responseText)
              }
            });

        })
    }

    // method to create comment in DOM
    let newCommentDOM = function(comment){
        return $(`<li id= "comment-${comment._id}">
            <div class= "postCommentsItem">
            <div class= "postCommentHeader">
                <span class= "postCommentAuthor">${comment.user.name}</span>
                <span class= "postCommentTime">a minute ago</span>
                <span class= "postCommentLikes">22</span>
            </div>
            <div class=postCommentContent>
                ${comment.content}    
                <a href="/comments/destroy/${comment._id}">X</a>
            </div>
            </div> 

            </li>`
        );
    }

    let deleteComment = function (deleteLink) {
      $(deleteLink).click(function (e) {
        e.preventDefault();

        $.ajax({
          type: "get",
          url: $(deleteLink).prop("href"),
          success: function (data) {
            $(`#post-${data.data.comment_id}`).remove();
            new Noty({
              theme: "relax",
              text: "Comment Deleted!",
              type: "success",
              layout: "topRight",
              timeout: 1500,
            }).show();
          },
          error: function (err) {
            console.log(err.responseText);
          },
        });
      });
    }; 

    createComment()
}