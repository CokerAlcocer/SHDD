
let code = document.getElementById("code");
let chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let data = {
    name: "",
    author: "",
    type: 0,
    bpm: 0,
    tone: {
        value: 0,
        desc: "C-Am"
    },
    section: [],
    video: ""
};

const getScale = chromatic => {   
    let tr = document.getElementById('tr');
    let auxScale = [chromatic[0], `${chromatic[2]}m`, `${chromatic[4]}m`, chromatic[5], chromatic[7], `${chromatic[9]}m`, `${chromatic[11]}º`];

    let content = '<td class="text-center"><small>Acorde</small></td>';

    auxScale.forEach((item, index) => {
        content += `<td class="text-center">${item}</td>`;
    });

    tr.innerHTML = content;
}

getScale(chromatic);
code.innerText = JSON.stringify(data, null, 4);

const changeView = flag => {
    if(flag) {
        document.getElementById('info').classList.add('visually-hidden');
        document.getElementById('section').classList.remove('visually-hidden');
        document.getElementById('tab1').classList.remove('active');
        document.getElementById('tab2').classList.add('active');
    } else {
        document.getElementById('info').classList.remove('visually-hidden');
        document.getElementById('section').classList.add('visually-hidden');
        document.getElementById('tab1').classList.add('active');
        document.getElementById('tab2').classList.remove('active');
    }
}

const modifyName = () => {
    data.name = document.getElementById('name').value;
    code.innerText = JSON.stringify(data, null, 4);
};
const modifyAuthor = () => {
    data.author = document.getElementById('author').value;
    code.innerText = JSON.stringify(data, null, 4);
};
const modifyBPM = () => {
    data.bpm = parseInt(document.getElementById('bpm').value);
    code.innerText = JSON.stringify(data, null, 4);
};
const modifyVideo = () => {
    data.video = document.getElementById('video').value;
    code.innerText = JSON.stringify(data, null, 4);
};

let selectType = document.getElementById('type');
selectType.addEventListener('change', () => {
    data.type = parseInt(selectType.value);
    code.innerText = JSON.stringify(data, null, 4);
});

let selectTone = document.getElementById('tone');
selectTone.addEventListener('change', () => {
    let toneValue = parseInt(selectTone.value);
    let auxChromatic = chromatic.slice(toneValue).concat(chromatic.slice(0, toneValue));   
    getScale(auxChromatic); 
    data.tone.value = toneValue;
    data.tone.desc = `${auxChromatic[0]}-${auxChromatic[9]}m`;
    code.innerText = JSON.stringify(data, null, 4);
});

const addSection = () => {
    data.section.push({
        name: document.getElementById('sectionName').value,
        lyrics: document.getElementById('lyrics').value
    });
    code.innerText = JSON.stringify(data, null, 4);
}