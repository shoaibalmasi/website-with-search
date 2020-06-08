// func for search product
function mysearch(){
    $.ajax({
        type: "POST",
        url: "/search",
        data: $('#searchInput').val(),
        contentType: "text/plain",
         dataType: "text",
        success: function (arr) {
            document.location='/home';
        }
    });
   
}