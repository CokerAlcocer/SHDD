
const URL = 'http://localhost:5500'
let songs = [];
let song = undefined;

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
    }).then(console.log);
}

const buildSongList = async () => {
    await getSongs();
    let list = document.getElementById('songs');
    let iframe = document.getElementById('iframe');
    let content = '';

    songs.forEach(item => {
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

(async () => {
    await buildSongList();
})();

const showSongInfo = id => {
    let preview = document.getElementById('songPreview');
    let iframe = document.getElementById('iframe');
    
    let content = '';
    songs.forEach(item => {
        if(item.id === id) {
            song = item;
        }
    });
    song.section.forEach(item => {
        content += `<div class ="col">
                        <div class="card h-100">
                            <div class="card-header">${item.name}</div>
                            <div class="card-body">
                                <pre class="mb-0" style="font-family: monospace;">${item.lyrics}</pre>
                            </div>
                        </div>
                    </div>`;
    })

    preview.classList.remove('visually-hidden');

    iframe.src = song.video;
    preview.innerHTML = `<p>
                            <span class="fs-1">${song.name}</span> <span class="fs-4 fw-lighter">(${song.author})</span><br>
                            <span class="badge bg-dark">BPM: ${song.bpm}</span>
                            <span class="badge bg-secondary">${song.tone.desc}</span>
                            <span class="badge ${song.type === 0 ? 'bg-primary' : song.type === 1 ? 'bg-info' : 'bg-success'}">
                                ${song.type === 0 ? 'Alabanza' : song.type === 1 ? 'Adoración' : 'Ofrenda'}
                            </span>
                        </p>
                        <div class="mt-1 row row-cols-2 g-3 fs-6" style="overflow-x: hidden; overflow-x: auto; height: calc(100vh - 220px);">${content}</div>`;
}