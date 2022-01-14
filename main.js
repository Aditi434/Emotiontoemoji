Prediction_1 = "";
Prediction_2 = "";
camera = document.getElementById("camera");

    Webcam.attach(camera);

Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90
});


function snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="picture" src="'+ data_uri +'"/>';
    })
}
//https://teachablemachine.withgoogle.com/models/X0DoAMZS3/

console.log('ml5.version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/X0DoAMZS3/model.json', modelLoaded);

function modelLoaded(){
    console.log('ml5 loaded!');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_1 = "The First prediction is " + Prediction_1;
    speak_2 = "The Second prediction is " + Prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_1 + speak_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('picture');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion_id").innerHTML = results[0].label;
        document.getElementById("emotion_id2").innerHTML = results[1].label;
        Prediction_1 = results[0].label;
        Prediction_2 = results[1].label;
        speak();
        if(results[0].label == "happy")
        {
            document.getElementById("emoji_name").innerHTML = "&#128522;";
        }
        if(results[0].label == "Sad")
        {
            document.getElementById("emoji_name").innerHTML = "&#128524;";
        }
        if(results[0].label == "angry")
        {
            document.getElementById("emoji_name").innerHTML = "&#128548;";
        }
        if(results[0].label == "laugh")
        {
            document.getElementById("emoji_name").innerHTML = "&#128512;";
        }
        if(results[1].label == "happy")
        {
            document.getElementById("emoji_name2").innerHTML = "&#128522;";
        }
        if(results[1].label == "Sad")
        {
            document.getElementById("emoji_name2").innerHTML = "&#128524;";
        }
        if(results[1].label == "angry")
        {
            document.getElementById("emoji_name2").innerHTML = "&#128548;";
        }
        if(results[1].label == "laugh")
        {
            document.getElementById("emoji_name2").innerHTML = "&#128512;";
        }
    }
}