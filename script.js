window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true; //décline chaque mot en un resultat

const speakers = ['Abdou', 'Auxence', 'Émilie', 'marjolaine', 'Mohamed', 'Walid', 'Aurélien', 'Margot'];

let p = document.createElement('p');
let heure = "";
let speakerName = document.getElementById("speakerName");
const words = document.querySelector('.words');

// let valueScroll = 0;


function addSpeaker(transcript){

    for(let speaker of speakers){
        if(transcript.includes(`c'est ${speaker} qui parle`))
            return ` ${speaker}`;  
}
}

words.appendChild(p);

recognition.addEventListener('result', e => {

    //Scroll auto
    // if(words.clientHeight >= 700 - 100){
    //     window.scrollTo(0, valueScroll); 
    //     valueScroll += 50;
    // }

    const transcript = Array.from(e.results) //on créer un tableau selon les resultats
        .map(result => result[0]) //stock dans le tableau le resultat à la place [0]
        .map(result => result.transcript) // cherche le paramètre transcript pour le stocker dans le tableau
        .join(''); // join toutes les cases du tableau
    
    addSpeaker(transcript) === undefined ? speakerName : speakerName.textContent = addSpeaker(transcript)
        
    date = new Date;
    
    p.innerHTML = `<span>${date.getHours()}:${date.getMinutes()}</span> ${transcript}`;

    if(transcript.includes("red") || transcript.includes("rouge"))
        document.querySelector("body").style.backgroundColor = "red";

    if(e.results[0].isFinal){ // verifie si on est à la fin du tableau global
        p = document.createElement("p");
        words.prepend(p);
    }
});

recognition.addEventListener('end', recognition.start); // rappel la function start quand on arrête de parler

recognition.start();

