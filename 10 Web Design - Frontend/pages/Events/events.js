import EventsContainer from "./EventsContainer";
import { Login } from "../Login/login";
import events from "./eventsHTML";
import submitEvent from "./submitEvent";

const Events = async () => {
	document.querySelector("main").innerHTML = events();

	await new Promise((resolve) => setTimeout(resolve, 0));

	await setupEventListeners();
	await EventsContainer();
};

const setupEventListeners = async () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const createEventButton = document.querySelector(".create-event-button");
	const createEvent = document.querySelector(".create-event");
	const closeCreateEvent = document.querySelector(".ri-close-line");

	if (createEventButton) {
		createEventButton.addEventListener("click", () => {
			if (user) {
				createEvent.style.transform = "translateX(0)";
			} else {
				alert("Debes estar conectado para realizar esta función");
				Login();
			}
		});
	}

	if (closeCreateEvent) {
		closeCreateEvent.addEventListener("click", () => {
			createEvent.style.transform = "translateX(100%)";
		});
	}

	const posterInput = document.querySelector(".poster");
	if (posterInput) {
		posterInput.addEventListener("change", () => {
			document.querySelector("#file-message").style.display = "inline";
		});
	}

	const addEventButton = document.querySelector(".add-event-button");
	if (addEventButton) {
		addEventButton.addEventListener("click", async (e) => {
			e.preventDefault();
			const name = document.querySelector(".name").value;
			const date = document.querySelector(".date").value;
			const location = document.querySelector(".location").value;
			const description = document.querySelector(".description").value;
			const poster = document.querySelector(".poster").files[0];
			await submitEvent(name, date, location, description, poster);
		});
	}
};

export default Events;
