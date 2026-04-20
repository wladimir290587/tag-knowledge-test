let questions = [
	{
		text:  'Какой тег создает гипертекстовые ссылки?',
		right: 'a',
	},
	{
		text:  'Какой тег делает перенос текста на новую строку?',
		right: 'br',
	},
	{
		text:  'Какой тег создает форму для сбора и отправки на сервер?',
		right: 'form',
	},
    {
		text:  'Какой тег встраивает изображения в HTML-документ?',
		right: 'img',
	},
    {
		text:  'Какой тег создает многофункциональные поля формы, в которые пользователь может вводить данные?',
		right: 'input',
	},
    {
		text:  'Какой тег создает заголовок HTML-документа, отображаемый в верхней части строки заголовка браузера?',
		right: 'title',
	},
    {
		text:  'Какой тег создает создает строку таблицы?',
		right: 'tr',
	},
    {
		text:  'Какой тег создает ячейку таблицы?',
		right: 'td',
	},
    {
		text:  'Какой тег подключает встраиваемые таблицы стилей?',
		right: 'style',
	},
    {
		text:  'Какой тег создает абзацы в тексте?',
		right: 'p',
	},
];

let buttonTest = document.querySelector('#buttonTest');  
let content = document.querySelector('#content');  
content.style.minHeight = (window.innerHeight - 130 - 70) + 'px';  

buttonTest.addEventListener('click', showTest);

function showTest() {
    content.innerHTML = "";
    buttonTest.style.display = 'none';

    let randomQuestions = [];  
    let responsesOfQuestions = [];  
    let countQuestions = questions.length;  
    while (randomQuestions.length < 5) {  
        let randomNumb = Math.floor(Math.random() * countQuestions);  
        if (!randomQuestions.includes(randomNumb)) {  
            let div = document.createElement('div');
            div.appendChild(createTags('p', questions[randomNumb]['text']));  
            responsesOfQuestions.push(questions[randomNumb]['right']);  
            div.appendChild(createTags('input', ''));
            content.appendChild(div);
            randomQuestions.push(randomNumb);  
        }
    }
    content.appendChild(createButtonCheckResponse(responsesOfQuestions))  
}

function createTags(tag, values) {  
    let tagName = document.createElement(tag);
    tagName.textContent = values;
    return tagName;
}

function checkInputResponses(inputResponses) {  
    let flagResponses = true;
    let countResponses = inputResponses.length;
    for (let i = 0; i < countResponses; i++) {
        if (getEditResponse(inputResponses[i].value).length == 0) {           
            inputResponses[i].classList.add('wrong');  
            inputResponses[i].placeholder = 'Введите ответ';
            flagResponses = false;
        } else {
            inputResponses[i].classList.remove('wrong');
        }
    }
    return flagResponses;
}

function createButtonCheckResponse(responsesOfQuestions) {  
    let buttonCheckResponse = document.createElement('button'); 
    buttonCheckResponse.textContent = 'Проверить ответы';
    buttonCheckResponse.classList.add('buttonCheckResponse');
    
    buttonCheckResponse.addEventListener('click', function() {  
        let inputResponses = content.querySelectorAll('input');  

        if (checkInputResponses(inputResponses)) {  
        this.style.display = 'none';
        let countRightResponses = inputResponses.length;
        let countResponses = inputResponses.length;

        for (let i = 0; i < countResponses; i++) {  
            if (getEditResponse(inputResponses[i].value) == responsesOfQuestions[i]) {  
                 inputResponses[i].classList.add('right');  
            } else {
                inputResponses[i].classList.add('wrong');  
                countRightResponses--;
            }
        }
        content.appendChild(createTagResult(countRightResponses, countResponses));  
        content.appendChild(createButtonReplay());  
        }
    });
    return buttonCheckResponse;
}

function createTagResult(countRightResponses, countResponses) {  
    let p = document.createElement('p'); 
    p.style.marginTop = '5px';
    p.style.marginBottom = '5px';
    p.style.color = 'green';
    p.style.fontSize = '25px';
    p.textContent = 'Процент правильных ответов: ' + Math.ceil((countRightResponses / countResponses) *100) + '%';
    return p;
}

function createButtonReplay() {  
    let replay = document.createElement('button');  
    replay.textContent = 'Начать снова';
    replay.classList.add('buttonReplay');
    replay.addEventListener('click', showTest)
    return replay;
}

function getEditResponse(text) {  
    let editResponse = text.toLowerCase().replace(/>/g, '').replace(/</g, '').replace(/ /g, '');
    return editResponse;
}