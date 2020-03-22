window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true; //décline chaque mot en un resultat

const speakers = ['Abdou', 'Auxence', 'Emilie', 'Marjolaine', 'Mohamed', 'Walid'];

let p = document.createElement('p');
let speakerName = document.createElement("h3");
const words = document.querySelector('.words');

function addSpeaker(transcript){
    for(let speaker of speakers){
        console.log(speaker);
        if(transcript.includes(speaker))
            return speaker + ":";
    }  
}

words.appendChild(speakerName);
words.appendChild(p);

recognition.addEventListener('result', e => {
    
    const transcript = Array.from(e.results) //on créer un tableau selon les resultats
        .map(result => result[0]) //stock dans le tableau le resultat à la place [0]
        .map(result => result.transcript) // cherche le paramètre transcript pour le stocker dans le tableau
        .join(''); // join toutes les cases du tableau
    console.log(transcript);

    speakerName.textContent = addSpeaker(transcript);
    p.textContent = transcript;

    if(transcript.includes("red") || transcript.includes("rouge"))
        document.querySelector("body").style.backgroundColor = "red";

    if(e.results[0].isFinal){ // verifie si on est à la fin du tableau global
        p = document.createElement("p");
        speakerName = document.createElement("h3")
        words.appendChild(speakerName);
        words.appendChild(p);

    }
});

recognition.addEventListener('end', recognition.start); // rappel la function start quand on arrête de parler

recognition.start();