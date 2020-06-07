const URL_w = "./my_model/";

let webcam, model_w, labelContainer_w, maxPredictions_w;

const btnCamera = document.querySelector(".camera-btn");
const content_w = document.getElementById("contents");

// Load the image model and setup the webcam
async function webcaminit() {
    $('.image-upload-wrap').hide();

    const modelURL = URL_w + "model.json";
    const metadataURL = URL_w + "metadata.json";

    model_w = await tmImage.load(modelURL, metadataURL);
    maxPredictions_w = model_w.getTotalClasses();
    
    // // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();

    w_predict();
    window.requestAnimationFrame(w_loop);
   
    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);

    labelContainer_w = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions_w; i++) { // and class labels
        labelContainer_w.appendChild(document.createElement("div"));
    }

    $('.camera-btn').hide();
    $('.remove-image').show();
}

async function w_loop() {
    webcam.update(); // update the webcam frame
    w_predict();
    window.requestAnimationFrame(w_loop);
}

// run the webcam image through the image model
async function w_predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model_w.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions_w; i++) {
        const classPrediction =
            prediction[i].className + ": " + ((prediction[i].probability)*100).toFixed(1)+ "%";
        labelContainer_w.childNodes[i].innerHTML = classPrediction;
    }
    if (prediction[0].probability>=0.7){
        content_w.innerText = "--사람을 만나 당신의 긍정적인 에너지를 나누어 주세요";
    }else if((prediction[0].probability>=0.4)&&(prediction[0].probability<0.7)){
        content_w.innerText = "--감정의 변화가 필요해요, 좋아하는 음악을 찾아 감성을 발휘해 보는 것이 어떨까요?";
    }else{
        content_w.innerText = "--운동을 하여 부정적인 감정을 해소시키는 것이 좋겠군요?";
    }
}

btnCamera.addEventListener("click", webcaminit);
