let model, maxPredictions, barWidth;
const labelContainer = document.getElementById("label-container");

const name = ["😀😄", "😡😢"];

// Load the image model and setup the webcam
async function init() {
    $('.remove-image').hide();
    $('.start-image').hide();
    $('.loading').show();
    
    predict();

    for (let i = 0; i < maxPredictions; i++) {
        const div = document.createElement("div");
        div.id = "d-flex"+i;
        labelContainer.appendChild(div);
    }
}

// run the webcam image through the image model
async function predict() {
    $('.loading').hide();
    $('.remove-image').show();
    $('#contents').show();

    // predict can take in an image, video or canvas html element
    const img = document.querySelector(".file-upload-image");
    const prediction = await model.predict(img);
    percentBar(prediction);
    contents(prediction);
}