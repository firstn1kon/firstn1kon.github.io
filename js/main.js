'use strict';
class Quiz {
    constructor (wrapper,{yourClass = ".quiz", questions, results}) {
        this.wrapper = document.querySelector(wrapper);
        this.questions = questions;
        this.results = results;
        this.score = 0;
        this.current = 0;
        this.progress = 0;
        this.class = yourClass.slice(1);
        this.mainDiv = "";   
        this.divQuestion = "";
        this.divAnwers = "";
        this.divNav = "";
        this.divProgress = "";
        this.init();  
    }

    init() {
        this.mainDiv = document.createElement('div');
        this.divQuestion = document.createElement('div');
        this.divAnwers = document.createElement('div');
        this.divNav = document.createElement('div');
        this.divProgress = document.createElement('div');
        this.mainDiv.classList.add(`${this.class}`);
        this.divQuestion.classList.add(`${this.class}__question`);
        this.divAnwers.classList.add(`${this.class}__answers`);
        this.divNav.classList.add(`${this.class}__nav`);
        this.divProgress.classList.add(`${this.class}__progress`);
        this.wrapper.append(this.mainDiv);
        this.mainDiv.append(this.divQuestion);
        this.mainDiv.append(this.divAnwers);
        this.mainDiv.append(this.divNav);
        this.mainDiv.append(this.divProgress);
        this.divProgress.innerHTML = `<div class="${this.class}__progress-current" style="width: ${this.progress}%"></div>`;
        this.renderQuestion();
    }
    renderQuestion() {
        if (this.current == this.questions.length) {
            this.renderResult();

        }
        else {
            this.renderNavProgress();
            let {question, answers} = this.questions[this.current];
            this.divQuestion.textContent = question;
            answers.forEach(([answer], i) => {
                const btnAnswer = document.createElement('button');
                btnAnswer.classList.add(`${this.class}__btn`);
                btnAnswer.setAttribute('data-index', i);
                btnAnswer.textContent = answer;
                this.divAnwers.append(btnAnswer);
                    });
            const btns = this.divAnwers.querySelectorAll(`.${this.class}__btn`);   
            btns.forEach(item => {
                item.addEventListener('click', () => {
                    let index = item.getAttribute('data-index');
                    btns.forEach(item => {
                        item.classList.add(`${this.class}__btn_result`);
                    });
                    if (answers[index][1] > 0) {
                        this.score += answers[index][1];
                        item.classList.remove(`${this.class}__btn_result`);
                        item.classList.add(`${this.class}__btn_right`);
                    }
                    else if (answers[index][1] == 0) {
                        item.classList.remove(`${this.class}__btn_result`);
                        item.classList.add(`${this.class}__btn_wrong`);
                        btns.forEach(item => {
                            let index = item.getAttribute('data-index');
                            if (answers[index][1] > 0) {
                                item.classList.remove(`${this.class}__btn_result`);
                                item.classList.add(`${this.class}__btn_right`);
                            }
                        });
                    }
                    setTimeout(() => {
                        this.current++;
                        this.divQuestion.textContent = "";
                        this.divAnwers.innerHTML = "";
                        this.renderQuestion();
                        
                    }, 1000);
                }, { once: true });
            });

        }
    }
    renderResult() {
        this.divQuestion.textContent = `Квиз закончен правильных ответов ${this.score} из ${this.questions.length}`;
        this.divAnwers.innerHTML = "";
        this.divNav.innerHTML ="";
        this.progress = 100;
        this.wrapper.querySelector(`.${this.class}__progress-current`).style.width = `${this.progress}%`;
        this.results.forEach(([text, point]) => {
            if (point <= this.score) {
                this.divAnwers.innerHTML = `${text} <br> <br>Пройти квиз еще раз:`;
            }
        });
        const imgReload = document.createElement('img');
        imgReload.classList.add(`${this.class}__imgReload`);
        imgReload.src = "./icons/reload.svg";
        this.divAnwers.append(imgReload);
        imgReload.addEventListener('click', () => {
            this.current = 0;
            this.score = 0;
            this.divAnwers.innerHTML = "";
            this.renderQuestion();
            imgReload.remove();

        });
    }
    renderNavProgress() {
        this.divNav.innerHTML = `<span class ="quiz__current">${this.giveZero(this.current + 1)}
        </span><span class ="quiz__total">/${this.giveZero(this.questions.length)}</span>`;
        this.progress = (100 / this.questions.length) * this.current;
        this.wrapper.querySelector(`.${this.class}__progress-current`).style.width = `${this.progress}%`;
    }
    giveZero(num) {
        if (num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    }
}

const quizStart = new Quiz('.wrapper',{
    questions: [
        {question: 'Столица Канады?',
        answers: [['Ванкувер', 0], ['Торронто', 0], ['Оттава', 1], ['Эмонд', 0]]
        },
        {question: 'Самый большой город Канады?',
        answers: [['Монреаль', 0], ['Калгари', 0], ['Торронто', 1], ['Оттава', 0]]
        },
        {question: 'Сколько провинций в Канаде?',
        answers: [['9', 0], ['10', 1], ['11', 0], ['12', 0]]
        },
        {question: 'Какое место занимает Канада по площади в мире?',
        answers: [['1', 0], ['2', 1], ['4', 0], ['6', 0]]
        },
        {question: 'Какие люди самые образованные в мире?',
        answers: [['Японцы', 0], ['Канадцы', 1], ['Норвежцы', 0], ['Швейцарцы', 0]]
        },
        {question: 'Средняя продолжительность жизни канадцев?',
        answers: [['79.5', 0], ['85.5', 0], ['87', 0], ['81.16', 1]]
        },
        {question: 'Легализована ли марихуана в Канаде?',
        answers: [['Да', 1], ['Нет', 0]]
        },
        {question: 'Более 77% кленового сиропа в мире производится в?',
        answers: [['Калгари', 0], ['Виннипег', 0], ['Квебеке', 1], ['Реджайна', 0]]
        },
        {question: 'Самый популярный сыр в Канаде?',
        answers: [['Чеддер', 1], ['Грюйер', 0], ['Пармезан', 0], ['Столичный', 0]]
        },
        {question: 'Самый популярный вид спорта в Канаде?',
        answers: [['Хоккей', 1], ['Футбол', 0], ['Лакросс', 0], ['Баскетбол', 0]]
        },
        {question: 'Правда ли что государственный символ Канады бобер?',
        answers: [['Да', 1], ['Нет', 0]]
        },
        {question: 'Паша любит Таню?',
        answers: [['Да', 1], ['Да', 1]]
        }
    ],
    results: [['Надо бы подучить тему, а то как жить в этой стране?', 0], ['Неплохо, но есть что подучить', 4], ['Хорошо, можно перезжать', 5], ['Отлично, когда переезжаем?', 6]]
});







