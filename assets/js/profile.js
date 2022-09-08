{
    let image=$('#upload-image')
    image.change(function(e)
    {
        if(e.target.files.length > 0){
            let src = URL.createObjectURL(e.target.files[0]);
            let preview=$('#preview-image img') 
            preview.attr('src',src);
            $('#preview-image').css('display','block');

           
            // preview.src = src;
            // preview.style.display = "block";
        }
    })
    $('#profile-form-1').submit(function(e)
    {
        $('#preview-image').css('display','none');
    })
}