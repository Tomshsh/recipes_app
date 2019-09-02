const retrieve = function(){
    let input = $(".search").find("input").val()
    $.get(`/recipes/${input}`,function(data){
        
    })
}