const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transpoter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: "myuserid.anant@gmail.com",
        pass: 'jlzenjeqgpacmyar'
    }
});

let renderTemplete = (data, relativePath) => {
  let mailHtml;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in reandering template", err);
        return;
      }
      mailHtml = template;
    }
  );

  return mailHtml;
};


module.exports = {
    transpoter: transpoter,
    renderTemplete: renderTemplete
}