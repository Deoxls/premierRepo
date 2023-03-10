const TCT_ITEMS = [
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
      quantity: 3,
      earliest_time: ["08:20", "11:20"],
      latest_time: ["09:40", "11:20"]
    }
  ];
  
const TCT_ADDRESSES = [
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
      postalCode: "92120"
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
var extraprice = 0

// points hors de paris 
var AdressesHorsParis = TCT_ADDRESSES.map(function (a) {
  return `${a.postalCode}`.substring()
}).filter(code => !code.startsWith("75"))

  //Filtrage des hors zone
let accepted_PostalCodes = ["92110", "92100","92120", "92130", "92170", "92200", "92220", "92230", "92240", "92260", "92270",
   "92300", "92320", "92340", "92390", "92400", "92600", "93170", "93200", "93210", "93260", "93300", "93310", "93400",
    "93450", "93500", "94110", "94160", "94200", "94220", "94230", "94240", "94250", "94270", "94800"]
  
  //Codes postaux
let PostalCodes = TCT_ADDRESSES.map(function (b) {
    return b.postalCode
  })

let adressesBanlieuOk = PostalCodes.filter(function (c){
  return accepted_PostalCodes.includes(c)
})

let nbAdresseDansParis = TCT_ADDRESSES.map(function (a) {
  return `${a.postalCode}`
}).filter(function (PostalCodes) {
  return !["75"].includes(PostalCodes)
}).length

if (adressesBanlieuOk == AdressesHorsParis.includes) {
  extraprice = adressesBanlieuOk.length * 10
} else {
  // throw (new Error("Adresse Hors Zone"))
  console.error("hors zone")
}

// prix
let price = extraprice



  // cr??neau au plus tot
  let earlie = TCT_ITEMS.map(function (a) {
    return a.earliest_time
  })
  // heures au plus tard
  let latest = TCT_ITEMS.map(function (a) {
    return a.latest_time
  })
  //poids des items
  let weight = TCT_ITEMS.map(function (a) {
    return a.weight
  })
  // nombre de colis
  let packagesnumber = TCT_ITEMS.reduce((acc, curr) => acc + curr.quantity, 0)
  
  
  // Tarification 
  
  // codes postaux
  //est ce que mon code postal est compris dans mes codes accept??s?
  let PostalCodes_ok = PostalCodes.filter(PostalCodes => {
    return accepted_PostalCodes.includes(PostalCodes)
  })
  // Tarification des PostalCodes
  
  
  if (PostalCodes_ok.length == nbAdresseDansParis) {
    console.log('PostalCodes ok');
    extraprice = extraprice + 10
  }
  else {
    console.log('PostalCodes error');
    extraprice = extraprice + 20
  }
  
  // Poids
  // d??finition de la variable poids total
  let initialweight = 0
  let totalWeight = weight.reduce((acc, curr) => acc + curr, initialweight);
  // tarification du poids
  
  // Cr??neaux
  //cr??neaux ramassage
  const ramassage = earlie.flatMap(time => time.map(t => t));
  response.ramassage = ramassage.slice(0, 2)
  // cr??neaux d??pot
  const depot = latest.flatMap(time => time.map(t => t));
  response.depot = depot.slice(0, 2)
  // d??lai de ramassage
  const startramassage = ramassage[0]
  const stopramassage = ramassage[1]
  const [starthours, startminutes] = startramassage.split(":");
  const [stophours, stopminutes] = stopramassage.split(":");
  const totalstartminutes = parseInt(starthours, 10) * 60 + parseInt(startminutes, 10);
  const totalendminutes = parseInt(stophours, 10) * 60 + parseInt(stopminutes, 10);
  const minutesramassage = totalendminutes - totalstartminutes;
  // d??lai de depot
  const startdepot = depot[0]
  const stopdepot = depot[1]
  const [starthoursd, startminutesd] = startdepot.split(":");
  const [stophoursd, stopminutesd] = stopdepot.split(":");
  const totalstartminutesd = parseInt(starthoursd, 10) * 60 + parseInt(startminutesd, 10);
  const totalendminutesd = parseInt(stophoursd, 10) * 60 + parseInt(stopminutesd, 10);
  const minutesdepot = totalendminutesd - totalstartminutesd;
  // tarification des cr??neaux
  if (minutesramassage < 30) {
    console.log('ramassage moins de 30min');
    extraprice = extraprice + 20;
  } else {
    extraprice = extraprice + 10;
    console.log('ramassage plus de 30min')
  }
  if (minutesdepot < 30) {
    console.log('depot moins de 30min');
    extraprice = extraprice + 20;
  } else {
    extraprice = extraprice + 10;
    console.log('depot plus de 30min')
  }
  
  function main() {
    //demander ?? la console de me faire ressortir les ??l??ment
    console.log(AdressesHorsParis)
    console.log(adressesBanlieuOk)
    console.log(price)
  }
  main();
  
  