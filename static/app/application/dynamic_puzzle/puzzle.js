
    var ctx = document.querySelector("canvas").getContext("2d"),
        img = new Image();

    // fill some graphics to canvas
    ctx.fillStyle = "#777";
    ctx.fillRect(0, 0, 600, 600);

    // load SVG so we can use the puzzle with canvas
    img.onload = demo;
    img.src = "media/drawing.svg";


    function demo() {
        console.log(img);
        // create a matte so it becomes rasterized - choose the size dynamically if you need to
        var matte = document.createElement("canvas"),
            mctx = matte.getContext("2d");
        matte.width = matte.height = 100;
        mctx.drawImage(this, 0, 0, 100, 100); // draw in (rasterize) the SVG

        // we can now use the puzzle as basis for an image region, or to mask out parts:
        ctx.globalCompositeOperation = "destination-out";
        for (var i = 0; i < 600; i += matte.width) {
            for (var j = 0; j < 600; j += matte.height) {
                ctx.drawImage(matte, i, j);
            }
        }
        // ctx.drawImage(matte, 100, 100);
        // ctx.drawImage(matte, 210, 10);
    }
