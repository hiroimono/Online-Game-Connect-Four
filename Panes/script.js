var c = $(".container");
c.on("mousemove", fn);

function fn(e){
    $(".top-image").css("width", e.clientX);
    $(".bar").css("left", e.clientX);
}
