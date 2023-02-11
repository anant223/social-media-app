{
  let createPost = function(){
      
    let newPostForm = $("#new-post-form");
      
    newPostForm.submit(function(e){            
        
      e.preventDefault();

        
        $.ajax({
          type: "POST",
          url: "/posts/create",
          data: newPostForm.serialize(),
          success: function (data) {
            // Handle the successful post creation
            console.log(data);
            let newPost = newPostDom(data.data.post)
            new ToggleLike($(" .toggle-like-button", newPost));

            $("#posts-list-container>ul").prepend(newPost);
            deltePost($(".delete-post-button", newPost));
            new Noty({
              theme: "relax",
              text: "Post Published!",
              type: "success",
              layout: "topRight",
              timeout: 1500,
            }).show();
          },error: function (error) {
            // Handle the error
            console.log(error.responseText);
          },
        });
      })    
  }

  // method to create a post in DOM
  let newPostDom = function(post){
    return $(`<div class= "postWrapper" id="post-${post._id}">
      <div class= "postHeader">
        <div class="postAvatar">
          <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="user-pic">
          <div>
            <a class= "postAuthor">
              ${post.user.name}
            </a>
            <span class= "postTime">a minute ago</span>
          </div>   
          <p>
      
            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
    
          </p>     
        </div>    
        <div class= "postContent"> ${ post.content}</div>
          <div class= "postActions">
            <div class= "postLike">
              <button>
                <img src="https://cdn-icons-png.flaticon.com/512/3128/3128313.png" alt="likes-icon">
              </button>
              <span>15</span>
            </div>
            <div class= "postCommentsIcon">
              <img
              src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
              alt="comments-icon">
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div class= "postCommentBox">
            
              <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Comment on it...">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
              </form>

          </div>
          <div class="postCommentsList">
            <ul id="post-comment-${post._id}">
            </ul>          
          </div>
      </div>
    </div>`);
  }

  // method to delete a post from DOM

  let deltePost = function(deleteLink){
    $(deleteLink).click(function(e){
      e.preventDefault()

      $.ajax({
          type: 'get',
          url: $(deleteLink).prop('href'),
          success: function(data){
            $(`#post-${data.data.post_id}`).remove();
            new Noty({
              theme: "relax",
              text: "Post Deleted!",
              type: "success",
              layout: "topRight",
              timeout: 1500,
            }).show();
          },error: function(err){
            console.log(err.responseText);
          }
      })
    })
  }  
  createPost();
}

