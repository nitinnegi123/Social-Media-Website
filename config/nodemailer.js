const nodeMailer=require('nodeMailer');
const ejs=require('ejs');
const path=require('path');
let transporter=nodeMailer.createTransport({
    service:'gmail',//you can skip this beacause of next line
    host:'smtp.gmail.com',//it is server which is handling mailing services by gmail
    port:587,
    secure:true,//dont require two factor authentication
    auth:{
        user:'nikinegi004@gmail.com',//from where email sent establishing the identity so gmail tracks your activity
        pass:'gsotpnfavufpummy'
    }

})
//relative path from the mail being sent        
let renderTemplate=(data,relativePath)=>
{
    let mailHTML;
    ejs.renderFile(path.join(__dirname,'../views/mailers',relativePath),data,function(err,template)//template is composed of path and data
    {
        if(err)
        {
            console.log('error in rendering template',err);
            return;
        }
        mailHTML=template;

    });//data context being sent
    return mailHTML;
}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}