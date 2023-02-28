
let depart = ["17:25", "18:08"]
let fin = ["19:08", "20:08"]

//depart au plus tôt
depart = "11/01/23 " + depart[0]
console.log(depart)
//arriver au plus tard
fin = "11-01-23 " + fin[fin.length - 1]
console.log(fin)

//conversion en date 
depart = new Date(depart)
console.log(depart)
end = new Date(fin)
console.log(end)
//recuperation des minutes depart
start_min = new Date(depart).getMinutes()
//recuperation des heures depart
start_hour = new Date(depart).getHours() * 60
//Total minutes depart
total_start_minutes = start_min + start_hour
//recuperation des minutes fin
end_min = new Date(fin).getMinutes()
//recuperation des heures fin
end_hour = new Date(fin).getHours() * 60
//Total minutes fin
total_end_minutes = end_min + end_hour


//Resultat 
console.log("total_start_minutes")
console.log(total_start_minutes)
console.log("total_end_minutes")
console.log(total_end_minutes)

//diference de temps en heure
console.log("diff")
const diff = (total_end_minutes - total_start_minutes )/60
console.log(Math.round(diff))

