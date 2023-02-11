const queue = require('../config/kue');
const commentsMailer = require('../mailers/comment_mailers');

queue.process('emails', function(job, done){
    console.log('emails work is processing job', job.data);

    commentsMailer.newComment(job.data);

    done();
});