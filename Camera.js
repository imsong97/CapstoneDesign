// More API functions here:
            // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

            // the link to your model provided by Teachable Machine export panel
            const URL = "./my_model/";

            let model, webcam, labelContainer, maxPredictions;
            let content = document.getElementById("contents")

            // Load the image model and setup the webcam
            async function init() {
                const modelURL = URL + "model.json";
                const metadataURL = URL + "metadata.json";

                // load the model and metadata
                // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
                // or files from your local hard drive
                // Note: the pose library adds "tmImage" object to your window (window.tmImage)
                model = await tmImage.load(modelURL, metadataURL);
                maxPredictions = model.getTotalClasses();

                // Convenience function to setup a webcam
                const flip = true; // whether to flip the webcam
                webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
                await webcam.setup(); // request access to the webcam
                await webcam.play();
                window.requestAnimationFrame(loop);

                // append elements to the DOM
                document.getElementById("webcam-container").appendChild(webcam.canvas);
                labelContainer = document.getElementById("label-container");
                for (let i = 0; i < maxPredictions; i++) { // and class labels
                    labelContainer.appendChild(document.createElement("div"));
                }
            }

            async function loop() {
                webcam.update(); // update the webcam frame
                await predict();
                window.requestAnimationFrame(loop);
            }

            // run the webcam image through the image model
            async function predict() {
                // predict can take in an image, video or canvas html element
                const prediction = await model.predict(webcam.canvas);
                for (let i = 0; i < maxPredictions; i++) {
                    const classPrediction =
                        prediction[i].className + ": " + ((prediction[i].probability)*100).toFixed(1)+ "%";
                    labelContainer.childNodes[i].innerHTML = classPrediction;
                }
                if (prediction[0].probability>=0.7){
                    content.innerText = "--사람을 만나 당신의 긍정적인 에너지를 나누어 주세요";
                }else if((prediction[0].probability>=0.4)&&(prediction[0].probability<0.7)){
                    content.innerText = "--감정의 변화가 필요해요, 좋아하는 음악을 찾아 감성을 발휘해 보는 것이 어떨까요?";
                }else{
                    content.innerText = "--운동을 하여 부정적인 감정을 해소시키는 것이 좋겠군요?";
                }
            }