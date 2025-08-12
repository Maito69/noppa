let pelaajat = [];
let nykyinenPelaaja = 0;
let vuoronPisteet = 0;
let peliKaynnissa = false;
let tavoitePisteet = 100;

let pelaajienMaaraKentta = document.getElementById("pelaajienMaara");
let luoPelaajatNappi = document.getElementById("luoPelaajat");
let pelaajienNimetDiv = document.getElementById("pelaajienNimet");
let aloitaPeliNappi = document.getElementById("aloitaPeli");

let vuorossaSpan = document.getElementById("vuorossa");
let vuoronPisteetSpan = document.getElementById("vuoronPisteet");
let noppaKuva = document.getElementById("noppaKuva");

let heitaNoppaaNappi = document.getElementById("heitäNoppaa");
let pidaPisteetNappi = document.getElementById("pidäPisteet");
let pisteetListaDiv = document.getElementById("pisteetLista");

// Luo nimikentät pelaajille
luoPelaajatNappi.onclick = function() {
    pelaajienNimetDiv.innerHTML = "";
    let maara = Number(pelaajienMaaraKentta.value);
    for (let i = 0; i < maara; i++) {
        pelaajienNimetDiv.innerHTML += `<input type="text" placeholder="Pelaaja ${i+1}" id="pelaaja${i}"><br>`;
    }
};

// Aloita peli
aloitaPeliNappi.onclick = function() {
    pelaajat = [];
    let maara = Number(pelaajienMaaraKentta.value);
    for (let i = 0; i < maara; i++) {
        let nimiKentta = document.getElementById("pelaaja" + i);
        let nimi = nimiKentta && nimiKentta.value.trim() ? nimiKentta.value : "Pelaaja " + (i + 1);
        pelaajat.push({ nimi: nimi, pisteet: 0 });
    }
    nykyinenPelaaja = 0;
    vuoronPisteet = 0;
    peliKaynnissa = true;
    paivitaNaytto();
};

// Heitä noppaa
heitaNoppaaNappi.onclick = function() {
    if (!peliKaynnissa) return;
    let silmaluku = Math.floor(Math.random() * 6) + 1;
    noppaKuva.src = "dice" + silmaluku + ".png";

    if (silmaluku === 1) {
        vuoronPisteet = 0;
        seuraavaPelaaja();
    } else {
        vuoronPisteet += silmaluku;
    }
    paivitaNaytto();
};

// Pidä pisteet
pidaPisteetNappi.onclick = function() {
    if (!peliKaynnissa) return;
    pelaajat[nykyinenPelaaja].pisteet += vuoronPisteet;
    if (pelaajat[nykyinenPelaaja].pisteet >= tavoitePisteet) {
        alert(pelaajat[nykyinenPelaaja].nimi + " voitti pelin!");
        peliKaynnissa = false;
    } else {
        seuraavaPelaaja();
    }
    paivitaNaytto();
};

// Vaihda vuoro seuraavalle
function seuraavaPelaaja() {
    vuoronPisteet = 0;
    nykyinenPelaaja++;
    if (nykyinenPelaaja >= pelaajat.length) {
        nykyinenPelaaja = 0;
    }
}

// Päivitä näkymä
function paivitaNaytto() {
    if (pelaajat.length > 0) {
        vuorossaSpan.textContent = pelaajat[nykyinenPelaaja].nimi;
    }
    vuoronPisteetSpan.textContent = vuoronPisteet;
    pisteetListaDiv.innerHTML = "";
    pelaajat.forEach(p => {
        pisteetListaDiv.innerHTML += `${p.nimi}: ${p.pisteet} pistettä<br>`;
    });
}