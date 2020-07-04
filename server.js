const moment = require('moment');
// Cada array do conjunto representa uma lista de Jobs a serem executados em sequência;
// Cada array deve conter jobs que sejam executados em, no máximo, 8h;
// Deve ser respeitada a data máxima de conclusão do Job;
// Todos os Jobs devem ser executados dentro da janela de execução (data início e fim)

const job = [{ "id": 1, "description": "Importação de arquivos de fundos", "maxDate": "2019-11-10 12:00:00", "time": 2 },
{ "id": 2, "description": "Importação de dados da Base Legada", "maxDate": "2019-11-11 12:00:00", "time": 4 },
{ "id": 3, "description": "Importação de dados de integração", "maxDate": "2019-11-11 08:00:00", "time": 6 }];

const dateStart = new Date(' 2019-11-10 09:00:00');

const dateEnd = new Date('2019-11-11 12:00:00');

let arrayDate = [];
let arrayDateFinal = [];
let auxDate = moment(dateStart);

while (auxDate <= dateEnd) {
    arrayDate.push(auxDate.toDate());
    auxDate = auxDate.add(1, 'days');
}

let Job = job.filter((job) => {
    return job.time <= 8;
})

Job = job.filter((job, i) => {
    if (dateStart.getTime() <= new Date(Job[i].maxDate).getTime() && dateEnd.getTime() >= new Date(Job[i].maxDate).getTime()) {
        return job;
    }
})

Job.sort(function (a, b) {
    var dateA = new Date(a.maxDate),
        dateB = new Date(b.maxDate);
    return dateA - dateB;
});

let auxId = [];
arrayDate.map((date) => {
    let auxTime = 0;
    let auxArray = [];

    Job.map((jobItem) => {
        if (date.getTime() <= new Date(jobItem.maxDate).getTime() && (auxTime + jobItem.time) <= 8) {
            auxTime = auxTime + jobItem.time;
            auxId.push(jobItem.id)
            auxArray.push(jobItem);
        }
    })
    
    auxId.map((auxIdItem) => {
        Job = Job.filter((jobItem) => {
            return jobItem.id !== auxIdItem;
        });
    })

    arrayDateFinal.push(auxArray);
})

console.log(arrayDateFinal)