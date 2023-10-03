document.getElementById("questionsMultiple").classList.add("hidden");
document.getElementById("questionsTOrF").classList.add("hidden");
document.getElementById("level").classList.add("hidden");
document.getElementById("divBtn").classList.add("hidden");
document.getElementById("score").classList.add("hidden");
document.getElementById("finalMessage").classList.add("hidden");
document.getElementById("divBtnRestart").classList.add("hidden");


let elementsCat = document.getElementsByClassName("cat");
let elementsLevel = document.getElementsByClassName("lev");

function chooseCat () {
    for ( let i=0; i<elementsCat.length; i++) {
        elementsCat[i].addEventListener("click", (e) => {
            let element = e.currentTarget;
            dataCat = element.getAttribute("dataCat");
            document.getElementById("category").classList.add("hidden");
            document.getElementById("level").classList.remove("hidden");
        })
    }
}
chooseCat();

function chooseLev () {
    for ( let i=0; i<elementsLevel.length; i++) {
        elementsLevel[i].addEventListener("click", (e) => {
            let element = e.currentTarget;
            dataLev = element.getAttribute("dataLev");
            document.getElementById("level").classList.add("hidden");
            document.getElementById("divBtn").classList.remove("hidden");
        })
    }
}

chooseLev();    

document.getElementById("divBtn").addEventListener("click", ShowQuestion);

let q;
let op0;
let op1;
let op2;
let op3;
let responsesM = [op0, op1, op2, op3];
let responsesTOrF = [op0, op1];
let counter = 0;
let correctCounter = 0;

function ShowQuestion () {

    document.getElementById("divBtn").classList.add("hidden");
    
    fetch("https://opentdb.com/api.php?amount=1&category=" + dataCat + "&difficulty=" + dataLev) 
        .then(response => response.json())
        .then(data => {
            document.getElementById("select").classList.add("hidden");
            document.getElementById("score").classList.remove("hidden");
            if(data.results[0].type == "multiple") {

                q = data.results[0].question;
                op0 = data.results[0].correct_answer;
                op1 = data.results[0].incorrect_answers[0];
                op2 = data.results[0].incorrect_answers[1];
                op3 = data.results[0].incorrect_answers[2];
                responsesM = [op0, op1, op2, op3];
                
                document.getElementById("question").innerHTML = q;
                
                for ( let i=0; i < responsesM.length; i++) {
                    let random = Math.floor(Math.random() * responsesM.length);
                    let emptyGlass = responsesM[random];
                    responsesM[random] = responsesM[i];
                    responsesM[i] = emptyGlass;
                }
                
                document.getElementById("btnOp0").innerHTML = responsesM[0];
                document.getElementById("btnOp1").innerHTML = responsesM[1];
                document.getElementById("btnOp2").innerHTML = responsesM[2];
                document.getElementById("btnOp3").innerHTML = responsesM[3];
                
                document.getElementById("questionsMultiple").classList.remove("hidden");
            } else {

                q = data.results[0].question;
                op0 = data.results[0].correct_answer;
                op1 = data.results[0].incorrect_answers[0];
                responsesTOrF = [op0, op1];
                
                document.getElementById("questionTOrF").innerHTML = q;
                
                for ( let i=0; i < responsesTOrF.length; i++) {
                    let random = Math.floor(Math.random() * responsesTOrF.length);
                    let emptyGlass = responsesTOrF[random];
                    responsesTOrF[random] = responsesTOrF[i];
                    responsesTOrF[i] = emptyGlass;
                }
                
                document.getElementById("btnTOF0").innerHTML = responsesTOrF[0];
                document.getElementById("btnTOF1").innerHTML = responsesTOrF[1];                
                document.getElementById("questionsTOrF").classList.remove("hidden");
            }
        });  
}

function confettiShooter() {
    const element = document.getElementById('e0DQ82qcIov1');
    element.svgatorPlayer.ready(function() {
      // this refers to the player object
      const player = element ? element.svgatorPlayer : {};
      if (player.play) {
        player.play();
      }
  
    });
  
}

function wrongAnswer () {
    document.getElementById("answerContainer").classList.add("shake");
}

function updateScore () {
    document.getElementById("points").innerHTML = contador;
}

function counters(isCorrectAnswer) {
    counter++;
    if (isCorrectAnswer) {
        correctCounter++;
        document.getElementById("points").innerHTML = correctCounter;
    }
}

function checkEnd () {
    if (counter == 10) {
        document.getElementById("answerContainer").classList.add("hidden");
        document.getElementById("select").classList.add("hidden");
        document.getElementById("score").classList.add("hidden");
        document.getElementById("finalMessage").classList.remove("hidden");
        document.getElementById("divBtnRestart").classList.remove("hidden");
        if (correctCounter < 5) {
            if (correctCounter == 1){
            document.getElementById("finalMessage").innerHTML = "YOU SUCK! <br>" 
            document.getElementById("finalMessage").innerHTML += "You answered correctly " + correctCounter + " question." 
            } else {
                document.getElementById("finalMessage").innerHTML = "YOU SUCK! <br>" 
                document.getElementById("finalMessage").innerHTML += "You answered correctly " + correctCounter + " questions."
            }
        } else if (correctCounter <= 7){
            document.getElementById("finalMessage").innerHTML = "Come on! You could do better. <br>"
            document.getElementById("finalMessage").innerHTML += "You answered correctly " + correctCounter + " questions." 
        } else {
            document.getElementById("finalMessage").innerHTML = "Oh! Here we have a smarty pants. <br>"
            document.getElementById("finalMessage").innerHTML += "You answered correctly " + correctCounter + " questions."
        }
    }
}

function clearAndShow() {
    for ( let i= 0; i <= 3; i++) {
        document.getElementById("btnOp"+ i).addEventListener("click", () => {
            if (responsesM[i] == op0) {
                confettiShooter();
                counters(true);
            } else {
                wrongAnswer();
                document.getElementById("btnOp"+ i).classList.add("rojito");
                document.getElementById("questionsMultiple").classList.add("rojito");
                counters(false);
            }
            setTimeout( () => {
                document.getElementById("answerContainer").classList.remove("shake")
                document.getElementById("questionsMultiple").classList.add("hidden");
                document.getElementById("btnOp"+ i).classList.remove("rojito");
                document.getElementById("questionsMultiple").classList.remove("rojito");
            }, 300);
            setTimeout(ShowQuestion, 400);
            setTimeout(checkEnd, 400); 
        });
    }   
    for ( let i= 0; i < 2; i++) {
        document.getElementById("btnTOF"+ i).addEventListener("click", () => {
            if (responsesTOrF[i] == op0) {
                confettiShooter();
                counters (true);
            } else {
                wrongAnswer();
                document.getElementById("btnTOF"+ i).classList.add("rojito");
                document.getElementById("questionsTOrF").classList.add("rojito");
                counters (false);
            }
            setTimeout( () => {
                document.getElementById("answerContainer").classList.remove("shake")
                document.getElementById("questionsTOrF").classList.add("hidden");
                document.getElementById("btnTOF"+ i).classList.remove("rojito");
                document.getElementById("questionsTOrF").classList.remove("rojito");
            }, 300);
            setTimeout(ShowQuestion, 400);
            setTimeout(checkEnd, 400); 
        });
    }
}

document.getElementById("btnRestart").addEventListener("click", () => {
    location.reload();
})

clearAndShow();