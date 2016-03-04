(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.controllers');
    applicationModule.controller('retrieveDynamicPuzzleAppController', function($scope, settings) {

        // var canvas = document.createElement("canavs");
        // canvas.width = 500;
        // canvas.height = 500;
        // canvas.style = "border:1px solid #000;background:url(http://i.stack.imgur.com/bEiyx.jpg)";
        var canvas = angular.element(document.getElementById("canvas"));
        console.log(canvas);
        if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
          var img = new Image();
          // fill some graphics to canvas
          ctx.fillStyle = "#777";
          ctx.fillRect(0, 0, 600, 600);

          // load SVG so we can use the puzzle with canvas
          img.onload = demo;
          img.src = "media/drawing.svg";
        //
        }
        //
        function demo() {
          // create a matte so it becomes rasterized - choose the size dynamically if you need to
          var matte = document.createElement("canvas"),
          mctx = matte.getContext("2d");
          matte.width = matte.height = 100;
          mctx.drawImag(mctx, 0, 0, 100, 100); // draw in (rasterize) the SVG

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





    });
})();
