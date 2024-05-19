import Events from "./pages/Events/events";
import { Home } from "./pages/Home/home";
import { Login } from "./pages/Login/login";
import "./style.css";
// import "./global.css";
import "./variables.css";

// Login();
Events();

const loginNav = document.getElementById("explorelink");
const homeNav = document.getElementById("homelink");
const eventsNav = document.getElementById("eventslink");

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
	loginNav.innerHTML = `${user.user.username} <i class="ri-user-line"></i>`;
}

loginNav.addEventListener("click", () => {
	if (user) {
		localStorage.removeItem("user");
		// location.reload();
		Login();
	} else {
		Login();
	}
});

homeNav.addEventListener("click", () => {
	Home();
});

eventsNav.addEventListener("click", () => {
	Events();
});

window.onload = function () {
	const hamburger = document.querySelector(".hamburger");
	const close = document.querySelector(".close");
	const nav = document.querySelector("nav");

	hamburger.addEventListener("click", function () {
		nav.classList.toggle("open");
	});

	close.addEventListener("click", function () {
		nav.classList.remove("open");
	});
};
