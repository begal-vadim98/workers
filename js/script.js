'use strict'
const createWorker = () => {

  const form = document.querySelector('.form'),
    input = form.querySelectorAll('input'),
    name = document.getElementById('name'),
    age = document.getElementById('age'),
    select = document.getElementById('selected'),
    checkbox = document.getElementById('checkbox'),
    date = document.getElementById('date'),
    drivingExperience = document.querySelector('.driving-experience'),
    categories = document.querySelector('.categories'),
    rank = document.querySelector('.rank'),
    materialWork = document.querySelector('.material-work'),
    driverLabel = document.querySelectorAll('.drivers'),
    plumberLabel = document.querySelectorAll('.plumber'),
    table = document.querySelector('.box-table'),
    workers = JSON.parse(localStorage.getItem('workers')) || [];

  class Worker {

    constructor(name, age, post, children, registrationDate) {
      this.name = name
      this.age = age
      this.post = post
      this.children = children
      this.registrationDate = registrationDate
    }


    init() {
      this.workerInit();
      this.renderWorker();
      this.formSubmit();
      select.addEventListener('change', this.workerInit);
    }

    workerInit() {

      if (select.value === 'Слесарь') {

        driverLabel.forEach(element => {
          element.remove();
        });

        plumberLabel.forEach(element => {
          form.querySelector('.btn-block').before(element);
        });

      }

      if (select.value === 'Водитель') {

        plumberLabel.forEach(element => {
          element.remove();;
        });

        driverLabel.forEach(element => {
          form.querySelector('.btn-block').before(element);
        });

      }

    }

    renderWorker() {
      table.innerHTML = "";

      workers.forEach((element, index, array) => {

        const div = document.createElement('div');


        const childrenReturn = () => element.children ? "есть" : "нет";

        if (element.post === "Водитель") {
          div.innerHTML = `<div>Имя: ${element.name}</div>
                          <div>Возраст: ${element.age} </div> 
                          <div>Должность: ${element.post} </div>
                          <div>Дети: ${childrenReturn()} </div>
                          <div>Дата Оформления: ${element.registrationDate} </div>
                          <div>Стаж вождения: ${element.drivingExperience} </div>
                          <div>Категории вождения: ${element.categories} </div>
                          <button class="btn-remove">Удалить</button>`;
        }

        if (element.post === "Слесарь") {
          div.innerHTML = `<div>Имя: ${element.name}</div>
                          <div>Возраст: ${element.age} </div> 
                          <div>Должность: ${element.post} </div>
                          <div>Дети: ${childrenReturn()} </div>
                          <div>Дата Оформления: ${element.registrationDate} </div>
                          <div>Разряд: ${element.rank} </div>
                          <div>Материал работы: ${element.materialWork} </div>
                          <button class="btn-remove">Удалить</button>`;
        }

        div.style.marginBottom = '20px';
        div.style.cssText = `display: flex;
                              justify-content: space-between;
                              padding: 5px 10px;
                              border-bottom: 1px solid black;`;

        table.append(div);


        div.querySelector('.btn-remove').addEventListener('click', () => {
          array.splice(index, 1);
          this.renderWorker();
        })


      });

      localStorage.setItem('workers', JSON.stringify(workers));
    }

    formSubmit() {


      form.addEventListener('submit', (event) => {


        event.preventDefault();

        if (select.value === 'Слесарь') {
          const workerPlumber = new Plumber(name.value, age.value, select.value, checkbox.checked, date.value, rank.value, (materialWork.value).split(/\s*,\s*/));
          workers.push(workerPlumber);
        }
        if (select.value === 'Водитель') {
          const workerDriver = new Driver(name.value, age.value, select.value, checkbox.checked, date.value, drivingExperience.value, (categories.value).split(/\s*,\s*/));
          workers.push(workerDriver);
        }

        input.forEach((element, i) => {

          if (element.checked) element.checked = false;

          element.value = "";
        })

        this.renderWorker();

      });
    }

  }

  class Driver extends Worker {

    constructor(name, age, post, children, registrationDate, drivingExperience, categories = []) {
      super(name, age, post, children, registrationDate)
      this.drivingExperience = drivingExperience
      this.categories = categories
    }

  }

  class Plumber extends Worker {

    constructor(name, age, post, children, registrationDate, rank, materialWork = []) {
      super(name, age, post, children, registrationDate)
      this.rank = rank
      this.materialWork = materialWork
    }

  }

  Worker.prototype.init();


}


createWorker();