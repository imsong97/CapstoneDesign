// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel

let webcam;

const btnCamera = document.querySelector(".camera-btn");
const btnCapture = document.querySelector(".capture-btn");
const uploadImage = document.querySelector(".file-upload-input")

// Load the image model and setup the webcam
async function webcaminit() {
    $('.image-upload-wrap').hide();
    
    // // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    
    window.requestAnimationFrame(loop);
   
    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);

    const cam = document.getElementsByTagName("canvas")[0];

    $('.camera-btn').hide();
    $('.capture-btn').show();

    btnCapture.addEventListener("click", function(){
        var context = cam.getContext('2d');
        // Draw the video frame to the canvas.
        context.drawImage(cam, 0, 0, cam.width, cam.height);
        $('.capture-btn').hide();
        $('#webcam-container').hide();
        $('.file-upload-content').show();
    });
}

async function loop() {
    webcam.update(); // update the webcam frame
    window.requestAnimationFrame(loop);
}

btnCamera.addEventListener("click", webcaminit);
