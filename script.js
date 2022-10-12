const infoEl = document.querySelector("#info");
const okEl = document.querySelector("#ok");
const infoContainer = document.querySelector(".info");
const secondsEl = document.querySelector("#seconds");
const scoreEl = document.querySelector("#score");
const ballEl = document.querySelector(".ball");
const startEl = document.querySelector("#start");
const containerEl = document.querySelector(".container");
const restartGameEl = document.querySelector("#restart-game");
const subtractEl = document.querySelector("#subtract");
const addEl = document.querySelector("#add");
const startGameEl = document.querySelector(".start-game");
const decrease = document.querySelector("#decrease");
const increase = document.querySelector("#increase");
const widthEl = document.querySelector("#width");
const highscoreEl = document.querySelector("#highscore");

// Localstorage
localStorage.getItem("highscore")
	? (highscoreEl.textContent = localStorage.getItem("highscore"))
	: localStorage.setItem("highscore", "0");

let seconds = 10;
let score = 0;
let a = true;
const hit = new Audio("/sounds/hit.wav");
const win = new Audio("/sounds/win.wav");
const lose = new Audio("/sounds/lose.wav");
let width = 100;
let highscore = localStorage.getItem("highscore");

const getHighscore = () => {
	if (score > highscore) localStorage.setItem("highscore", score);
	highscoreEl.textContent = localStorage.getItem("highscore");
};

secondsEl.textContent = " " + seconds;
scoreEl.textContent = score;
widthEl.textContent = width;

const movement = () => {
	ballEl.style.top = `${Math.random() * 73}%`;
	ballEl.style.left = `${Math.random() * 65}%`;
};

const incrementScore = () => {
	score++;
	scoreEl.textContent = score;
};

infoEl.addEventListener("click", () => {
	infoContainer.classList.toggle("hide");
});
increase.addEventListener("mousedown", () => {
	if (width < 200) width += 10;
	widthEl.textContent = width;
	ballEl.style.width = `${width}px`;
});
decrease.addEventListener("mousedown", () => {
	if (width > 70) width -= 10;
	widthEl.textContent = width;
	ballEl.style.width = `${width}px`;
});

okEl.addEventListener("click", () => {
	infoContainer.classList.add("hide");
});

subtractEl.addEventListener("mousedown", () => {
	if (seconds > 3) seconds--;
	secondsEl.textContent = " " + seconds;
});

addEl.addEventListener("mousedown", () => {
	seconds++;
	secondsEl.textContent = " " + seconds;
});

ballEl.addEventListener("click", () => {
	hit.play();
	startEl.textContent = "";
	containerEl.classList.remove("center");
	movement();
	incrementScore();
	if (a) timer();
	a = false;
	getHighscore();
});
const timer = () => {
	subtractEl.classList.add("disable");
	addEl.classList.add("disable");
	setInterval(() => {
		if (seconds === 0) return;
		seconds--;
		secondsEl.textContent = " " + seconds;
		if (seconds === 0) {
			ballEl.classList.add("disable");
			subtractEl.classList.add("disable");
			addEl.classList.add("disable");
			restartGameEl.classList.remove("hide");
			if (score >= 20) {
				Swal.fire({
					icon: "success",
					title: "Congrats!",
					text: `Your Score is: ${score}`,
					allowOutsideClick: false,
				});
				win.play();
			} else {
				Swal.fire({
					icon: "error",
					title: "Keep trying!",
					text: `The goal is 20. Your Score is: ${score}`,
					allowOutsideClick: false,
				});
				lose.play();
			}
		}
	}, 1000);
};

restartGameEl.addEventListener("click", () => {
	location.reload();
});
