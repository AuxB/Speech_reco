window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true; //décline chaque mot en un resultat

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    // console.log(e.results);
    const transcript = Array.from(e.results) //on créer un tableau selon les resultats
        .map(result => result[0]) //stock dans le tableau le resultat à la place [0]
        .map(result => result.transcript) // cherche le paramètre transcript pour le stocker dans le tableau
        .join(''); // join toutes les cases du tableau
    console.log(transcript)

    p.textContent = transcript;

    if(transcript.includes("red") || transcript.includes("rouge"))
        document.querySelector("body").style.backgroundColor = "red";

    if(e.results[0].isFinal){ // verifie si on est à la fin du tableau global
        p = document.createElement("p");
        words.appendChild(p);
    }
});

recognition.addEventListener('end', recognition.start); // rappel la function start quand on arrête de parler

recognition.start();