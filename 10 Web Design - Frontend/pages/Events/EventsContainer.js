import { API_BASE_URL } from "../../main";
import { EventDetails } from "./EventsDetails";
import "./events.css";

const EventsContainer = async () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const eventsData = await fetch(`${API_BASE_URL}/events`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const events = await eventsData.json();
	const eventsContainer = document.querySelector(".event-list");

	if (!eventsContainer) {
		console.error("No se encontró el contenedor de eventos");
		return;
	}

	eventsContainer.innerHTML = "";

	for (const event of events) {
		const li = document.createElement("li");
		li.classList.add("event");
		li.dataset.id = event._id;
		li.innerHTML = `
            <img src=${event.poster} alt=${event.name}/>
            <h3>${event.name}</h3>
            <h4>${event.date}</h4>
            <h5>${event.location}</h5>
            <h5>${event.description}</h5>
        `;
		eventsContainer.appendChild(li);

		li.addEventListener("click", async function () {
			EventDetails(event, user);
		});
	}
};

export default EventsContainer;
