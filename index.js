const items = [
    {
      weight: 128,
      name: "Caisse bois",
      quantity: 15,
      earliest_time: ["08:20", "11:20"],
      latest_time: ["09:40", "11:20"]
    },
    {
      weight: 114,
      name: "sac < 5kg",
      quantity: 12,
      earliest_time: ["08:20", "11:20"],
      latest_time: ["09:40", "11:20"]
    }
  ];
  
  const adresse = [
    {
      address_complete: "24 Rue Notre Dame de Nazareth, Paris, France, 75003",
      locality: "Paris",
      postalCode: "75003"
    },
    {
      address_complete: "63 rue de l'amiral mouchez, Paris, France, 75013",
      locality: "Paris",
      postalCode: "75013"
    }
  ];

  let response = {
    prix : 0,
    hanfdling : 0,
    person: 1,
    error: ""
  }

//modifs Luca

// définir les codes postaux accétpés
  var accepted_codes = ["75013","75002"]

//créer un tableau qui va chercher uniquement les codes postaux dans 'adresses'
  var postal_codes = adresse.map(function (a){
    return a.postalCode
  })

//même chose avec créneau au plus tot
  var earlie = items.map(function (a){
    return a.earliest_time
  })

// heures au plus tard
  var latest = items.map(function (a){
    return a.latest_time
    })

//est ce que mon code postal est compris dans mes codes acceptés?
    /* var adressesaccepted = postal_codes.filter(function (cp){
   return accepted_codes.include(cp)
 }) */
// marche pas car postal_codes est un object, doit devenir un array
/*  */
var addressesok = postal_codes.forEach(function (cp){
    return accepted_codes.includes(cp)
})

  //Execute ton code dans la function main
  function main() {
    //demander à la console de me faire ressortir les éléments
    console.log (postal_codes)
    console.log ("test de nodemon")
  }
  main();
  
