const items = [
  {
    weight: 30,
    name: "Caisse bois",
    quantity: 3,
    earliest_time: ["08:20", "11:20"],
    latest_time: ["09:40", "11:20"]
  },
  {
    weight: 40,
    name: "sac < 5kg",
    quantity: 4,
    earliest_time: ["08:20", "11:20"],
    latest_time: ["09:40", "11:20"]
  }
];

const adresse = [
  {
    address_complete: "24 Rue Notre Dame de Nazareth, Paris, France, 75003",
    locality: "Paris",
    postalCode: "75013"
  },
  {
    address_complete: "63 rue de l'amiral mouchez, Paris, France, 75013",
    locality: "Paris",
    postalCode: "75002"
  },
  {
    address_complete: "24 Rue Notre Dame de Nazareth, Paris, France, 75003",
    locality: "Paris",
    postalCode: "75013"
  }
];

let response = {
  prix: 0,
  hanfdling: 0,
  person: 1,
  error: '',
  ramassage: 0,
  depot: 0,
  colis: 0,
}

//modifs Luca


// Nos contraintes
// limite de poids
const maxweight = 80
// limite de colis
const maxcolis = 10
// définir les codes postaux accétpés
let accepted_cp = ["75013", "75002", "93000", "75001"]
// prix
let price = response.prix

// Extractions

//Codes postaux
let cp = adresse.map(function (a) {
  return a.postalCode
})
// créneau au plus tot
let earlie = items.map(function (a) {
  return a.earliest_time
})
// heures au plus tard
let latest = items.map(function (a) {
  return a.latest_time
})
//poids des items
let weight = items.map(function (a) {
  return a.weight
})
// nombre de colis
let packagesnumber = items.reduce((acc, curr) => acc + curr.quantity, 0)


// Tarification 

// codes postaux
//est ce que mon code postal est compris dans mes codes acceptés?
let cp_ok = cp.filter(cp => {
  return accepted_cp.includes(cp)
})
// Tarification des CP
let nbAdresseDansParis = adresse.map(function (a) {
  return `${a.postalCode}`
}).filter(function (cp) {
  return !["75"].includes(cp)
}).length

if (cp_ok.length == nbAdresseDansParis) {
  console.log('cp ok');
  response.prix = response.prix + 10
}
else {
  console.log('cp error');
  response.prix = response.prix + 20
}

// Poids
// définition de la variable poids total
let initialweight = 0
let totalWeight = weight.reduce((acc, curr) => acc + curr, initialweight);
// tarification du poids
if (totalWeight > maxweight) {
  console.log('weight error');
  response.prix = response.prix + 20
}
else {
  console.log('weight ok');
  response.prix = response.prix + 10
}

// Colis
// nombre de colis max
if (packagesnumber > maxcolis) {
  console.log('colis error');
  response.prix = response.prix + 20
}
else {
  console.log('colis ok');
  response.prix = response.prix + 10
}
// ajout des colis dans la response
response.colis = response.colis + packagesnumber;

// Créneaux
//créneaux ramassage
const ramassage = earlie.flatMap(time => time.map(t => t));
response.ramassage = ramassage.slice(0, 2)
// créneaux dépot
const depot = latest.flatMap(time => time.map(t => t));
response.depot = depot.slice(0, 2)
// délai de ramassage
const startramassage = ramassage[0]
const stopramassage = ramassage[1]
const [starthours, startminutes] = startramassage.split(":");
const [stophours, stopminutes] = stopramassage.split(":");
const totalstartminutes = parseInt(starthours, 10) * 60 + parseInt(startminutes, 10);
const totalendminutes = parseInt(stophours, 10) * 60 + parseInt(stopminutes, 10);
const minutesramassage = totalendminutes - totalstartminutes;
// délai de depot
const startdepot = depot[0]
const stopdepot = depot[1]
const [starthoursd, startminutesd] = startdepot.split(":");
const [stophoursd, stopminutesd] = stopdepot.split(":");
const totalstartminutesd = parseInt(starthoursd, 10) * 60 + parseInt(startminutesd, 10);
const totalendminutesd = parseInt(stophoursd, 10) * 60 + parseInt(stopminutesd, 10);
const minutesdepot = totalendminutesd - totalstartminutesd;
// tarification des créneaux
if (minutesramassage < 30) {
  console.log('ramassage moins de 30min');
  response.prix = response.prix + 20;
} else {
  response.prix = response.prix + 10;
  console.log('ramassage plus de 30min')
}
if (minutesdepot < 30) {
  console.log('depot moins de 30min');
  response.prix = response.prix + 20;
} else {
  response.prix = response.prix + 10;
  console.log('depot plus de 30min')
}

function main() {
  //demander à la console de me faire ressortir les élément
  console.log(response)
}
main();

