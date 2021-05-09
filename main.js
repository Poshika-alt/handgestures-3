Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
    });
    
    camera=document.getElementById("camera");
    Webcam.attach("#camera");
    
    function take_snapshot(){
        Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
        });
    }
    
    console.log('ml5 version',ml5.version);
    
    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wPDAeLy_G/model.json',modelLoaded);
    
    function modelLoaded(){
        console.log("model loaded")
    }
    
    function speak(){
        var synth=window.speechSynthesis;
        speak_data="The prediction is " +prediction;
        var utterThis=new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }
    
    function check(){
        img=document.getElementById('captured_image');
        classifier.classify(img,gotResult);
    }

    function gotResult(error,results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            document.getElementById("result_handgesture_name").innerHTML=results[0].label;
            prediction=results[0].label;
            speak();
        if(results[0].label=="Ok"){
            document.getElementById("update_handgesture").innerHTML="&#128076;";
        }
        if(results[0].label=="victoryHand"){
            document.getElementById("update_handgesture").innerHTML="&#9996;";
        }
        if(results[0].label=="thumbs up"){
            document.getElementById("update_handgesture").innerHTML="&#128077;";
        }
    }
    }