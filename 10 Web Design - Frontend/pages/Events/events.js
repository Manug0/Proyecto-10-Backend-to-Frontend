import { Login } from "../login";
import EventsContainer from "./EventsContainer";
import events from "./eventsHTML";
import submitEvent from "./submitEvent";

events();

const Events = async () => {
	const user = JSON.parse(localStorage.getItem("user"));

	document.querySelector("main").innerHTML = events();
	await EventsContainer();

	const createEventButton = document.querySelector(".create-event-button");
	const createEvent = document.querySelector(".create-event");
	const closeCreateEvent = document.querySelector(".create-event .ri-close-line");

	createEventButton.addEventListener("click", () => {
		if (user) {
			createEvent.style.transform = "translateX(0)";
		} else {
			alert("Debes estar conectado para realizar esta función");
			Login();
		}
	});

	closeCreateEvent.addEventListener("click", () => {
		createEvent.style.transform = "translateX(100%)";
	});

	document.querySelector(".poster").addEventListener("change", function () {
		document.querySelector("#file-message").style.display = "inline";
	});

	document.querySelector(".add-event-button").addEventListener("click", async (e) => {
		e.preventDefault();
		const name = document.querySelector(".name").value;
		const date = document.querySelector(".date").value;
		const location = document.querySelector(".location").value;
		const description = document.querySelector(".description").value;
		const poster = document.querySelector(".poster").files[0];
		await submitEvent(name, date, location, description, poster);
	});
};

export default Events;
