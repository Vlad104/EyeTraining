const background = document.createElement('div');
const target = document.createElement('div');
const textField = document.createElement('p');

function init() {
    background.classList.add('eye-train-background');
    textField.classList.add('eye-train-text');
    target.classList.add('eye-train-block');
    
    background.append(textField);
    background.append(target);
}

function simpleStep(text, styles) {
    textField.textContent = text;
    target.classList.add(...styles);
}

function simpleStop(text, styles) {
    textField.textContent = text;
    target.classList.remove(...styles);
}

function* simpleScenario(timer, text, styles) {
    while (timer > 0) {
        yield simpleStep(`${text} ${timer}`, styles);
        timer -= 1;
    }
    return simpleStop('', styles);
}

function* horizontal() {
    let timer = 5;
    const text = 'Влево, вправо';
    const styles = ['eye-train-block__horizontal'];

    yield* simpleScenario(timer, text, styles);
}

function* vertical() {
    let timer = 5;
    const text = 'Вверх, вниз';
    const styles = ['eye-train-block__vertical', 'eye-train-block__center'];

    yield* simpleScenario(timer, text, styles);
}

function* verticalLeft() {
    let timer = 5;
    const text = 'Вверх, вниз';
    const styles = ['eye-train-block__vertical', 'eye-train-block__left'];

    yield* simpleScenario(timer, text, styles);
}

function* verticalRight() {
    let timer = 5;
    const text = 'Вверх, вниз';
    const styles = ['eye-train-block__vertical', 'eye-train-block__right'];

    yield* simpleScenario(timer, text, styles);
}

function* round() {
    let timer = 5;
    const text = 'По-кругу';
    const styles = ['eye-train-block__round'];

    yield* simpleScenario(timer, text, styles);
}

function* start() {
    yield document.body.append(background);
}

function* finish() {
    yield background.remove();
}

function* reduce(scenarios) {
    for (const scenario of scenarios) {
        yield* scenario();
    }
}

const standartTraining = [
    start,
    vertical,
    horizontal,
    verticalLeft,
    verticalRight,
    round,
    finish,
];

function startTraining() {
    const generator = reduce(standartTraining);

    let timerHandler = setInterval(() => {
        const res = generator.next();
        if (res.done) {
            clearInterval(timerHandler);
            sheduler();
        }
    }, 1000);
}

function sheduler() {
    setTimeout(() => startTraining(), 10 * 1000);
}

init();
sheduler();
