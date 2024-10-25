const URL = 'https://cokeralcocer.github.io/SHDD'
let songs = [];
let auxSongs = [];
let song = {};
let chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const getSongs = async () => {
    await fetch(`${URL}/src/json/songs.json`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res => res.json()).then(res => {
        songs = res;
        songs.forEach((item, index) => item.id = index + 1);
        auxSongs = JSON.parse(JSON.stringify(songs));
    }).then(console.log);
}

const buildSongList = async () => {
    await getSongs();
    let list = document.getElementById('songs');
    let content = '';

    auxSongs.forEach(item => {
        content += `<div class="d-flex align-items-center rounded mb-2 p-0">
                        <div class="px-1 ${item.type === 0 ? 'bg-primary' : item.type === 1 ? 'bg-info' : 'bg-success'} d-flex align-self-stretch align-items-center rounded-start text-white">
                            ${item.type === 0 ? '<i class="bi bi-brightness-high"></i>'
                : item.type === 1 ? '<i class="bi bi-moon"></i>' : '<i class="bi bi-currency-dollar"></i>'}   
                        </div>
                        <div class="p-2 border w-100 rounded-end d-flex align-items-center">
                            <div>
                                <span>${item.name}</span> <span class="fw-lighter">(${item.author})</span><br>
                                <small><span class="badge bg-dark">BPM: ${item.bpm}</span>
                                <span class="badge bg-secondary">${item.tone.desc}</span></small>
                            </div>
                            <div class="form-check ms-auto">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" onclick="showSongInfo(${item.id})">
                            </div>
                        </div>
                    </div>`;
    });
    list.innerHTML = content;
}

(async () => {
    await buildSongList();
})();

const showSongInfo = id => {
    let preview = document.getElementById('songPreview');
    let iframe = document.getElementById('iframe');
    let auxSong = {};
    let content = '';
    auxSongs.forEach(item => {
        if (item.id === id) {
            song = JSON.parse(JSON.stringify(item));
            auxSong = JSON.parse(JSON.stringify(song));
        }
    });

    let auxChromatic = chromatic.slice(auxSong.tone.value).concat(chromatic.slice(0, auxSong.tone.value));
    let auxScale = [auxChromatic[0], auxChromatic[2], auxChromatic[4], auxChromatic[5], auxChromatic[7], auxChromatic[9], auxChromatic[11]];
    let variables = ['$1', '$2', '$3', '$4', '$5', '$6', '$7'];

    auxSong.section.forEach(item => {
        let lyric = item.lyrics;
        auxScale.forEach((chord, index) => {
            lyric = lyric.replaceAll(variables[index], chord);
        });
        content += `<div class ="col">
                        <div class="card h-100">
                            <div class="card-header">${item.name}</div>
                            <div class="card-body">
                                <pre class="mb-0" style="font-family: monospace;">${lyric}</pre>
                            </div>
                        </div>
                    </div>`;
    });

    preview.classList.remove('visually-hidden');
    document.getElementById('transposeSelect').value = auxSong.tone.value;

    iframe.src = auxSong.video;
    preview.innerHTML = `<p>
                            <span class="fs-3">${auxSong.name}</span> <span class="fs-4 fw-lighter">(${auxSong.author})</span><br>
                            <span class="badge bg-dark">BPM: ${auxSong.bpm}</span>
                            <span class="badge bg-secondary">${auxSong.tone.desc}</span>
                            <span class="badge ${auxSong.type === 0 ? 'bg-primary' : auxSong.type === 1 ? 'bg-info' : 'bg-success'}">
                                ${auxSong.type === 0 ? 'Alabanza' : auxSong.type === 1 ? 'Adoración' : 'Ofrenda'}
                            </span>
                        </p>
                        <div class="mt-1 row row-cols-12 row-cols-xl-2 g-3 fs-6" style="overflow-x: hidden; overflow-x: auto; height: calc(100vh - 220px);">${content}</div>`;
}

let transposeSelect = document.getElementById('transposeSelect');
transposeSelect.addEventListener('change', () => {
    let preview = document.getElementById('songPreview');
    preview.innerHTML = '';
    let content = '';
    let auxSong = JSON.parse(JSON.stringify(song));

    auxSong.tone.value = transposeSelect.value;

    let auxChromatic = chromatic.slice(auxSong.tone.value).concat(chromatic.slice(0, auxSong.tone.value));
    let auxScale = [auxChromatic[0], auxChromatic[2], auxChromatic[4], auxChromatic[5], auxChromatic[7], auxChromatic[9], auxChromatic[11]];
    let variables = ['$1', '$2', '$3', '$4', '$5', '$6', '$7'];

    auxSong.tone.desc = `${auxChromatic[0]}-${auxChromatic[9]}m`;

    auxSong.section.forEach(item => {
        let lyric = item.lyrics;
        auxScale.forEach((chord, index) => {
            lyric = lyric.replaceAll(variables[index], chord);
        });
        content += `<div class ="col">
                        <div class="card h-100">
                            <div class="card-header">${item.name}</div>
                            <div class="card-body">
                                <pre class="mb-0" style="font-family: monospace;">${lyric}</pre>
                            </div>
                        </div>
                    </div>`;
    });

    preview.innerHTML = `<p>
                            <span class="fs-3">${auxSong.name}</span> <span class="fs-4 fw-lighter">(${auxSong.author})</span><br>
                            <span class="badge bg-danger">TRANSPUESTA</span>
                            <span class="badge bg-dark">BPM: ${auxSong.bpm}</span>
                            <span class="badge bg-secondary">${auxSong.tone.desc}</span>
                            <span class="badge ${auxSong.type === 0 ? 'bg-primary' : auxSong.type === 1 ? 'bg-info' : 'bg-success'}">
                                ${auxSong.type === 0 ? 'Alabanza' : auxSong.type === 1 ? 'Adoración' : 'Ofrenda'}
                            </span>
                        </p>
                        <div class="mt-1 row row-cols-12 row-cols-xl-2 g-3 fs-6" style="overflow-x: hidden; overflow-x: auto; height: calc(100vh - 220px);">${content}</div>`;
});

const filterSongsByName = type => {
    let search = document.getElementById('search').value;
    let list = document.getElementById('songs');
    let content = '';
    let aux = JSON.parse(JSON.stringify(songs))

    if(type === null) {
        if(search === null || search === '' || search === undefined) {
            auxSongs = aux;
        } else {
            auxSongs = aux.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }
    } else {
        if(search === null || search === '' || search === undefined) {
            auxSongs = auxSongs = aux.filter(item => item.type === type);;
        } else {
            auxSongs = aux.filter(item => item.type === type && item.name.toLowerCase().includes(search.toLowerCase()));
        }
    }

    auxSongs.forEach(item => {
        content += `<div class="d-flex align-items-center rounded mb-2 p-0">
                        <div class="px-1 ${item.type === 0 ? 'bg-primary' : item.type === 1 ? 'bg-info' : 'bg-success'} d-flex align-self-stretch align-items-center rounded-start text-white">
                            ${item.type === 0 ? '<i class="bi bi-brightness-high"></i>'
                : item.type === 1 ? '<i class="bi bi-moon"></i>' : '<i class="bi bi-currency-dollar"></i>'}   
                        </div>
                        <div class="p-2 border w-100 rounded-end d-flex align-items-center">
                            <div>
                                <span>${item.name}</span> <span class="fw-lighter">(${item.author})</span><br>
                                <span class="badge bg-dark">BPM: ${item.bpm}</span>
                                <span class="badge bg-secondary">${item.tone.desc}</span>
                            </div>
                            <div class="form-check ms-auto">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" onclick="showSongInfo(${item.id})">
                            </div>
                        </div>
                    </div>`;
    });
    list.innerHTML = content;
}

