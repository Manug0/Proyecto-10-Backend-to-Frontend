import { Login } from "../Login/login";
import { attendeesList } from "./AttendeesList";
import registrationForm from "./RegistrationForm";

export const EventDetails = async (event, user) => {
	if (user) {
		const token = user.token;
		const eventData = await fetch(`http://localhost:3000/api/v1/events/${event._id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const eventDetails = await eventData.json();

		const welcomeMsg = document.querySelector(".welcome-msg");
		welcomeMsg.style.display = "none";
		document.querySelector(".event-list").style.display = "none";
		document.querySelector(".create-event-button").style.display = "none";

		const eventDetailsDiv = document.querySelector("#event-details");
		eventDetailsDiv.innerHTML = `
            <div>
                <div class="image">
                    <img src=${eventDetails.poster} alt=${eventDetails.name}/>
                </div>
                <div class="data">
                    <h1>${eventDetails.name}</h1>
                    <h2>${eventDetails.date}</h2>
                    <h3>${eventDetails.location}</h3>
                    <p>${eventDetails.description}</p>
                    <button class="register">Apuntarse</button>
                </div>							
								<div class="attendees-list">
										<h4>Lista de asistentes</h4>
								</div>
            </div>
        `;

		registrationForm(user, event, token);

		document.querySelector(".register").addEventListener("click", () => {
			registrationForm(user, event, token);
		});

		attendeesList(event, token);
	} else {
		alert("Tienes que estar conectado para ver los detalles del evento");
		Login();
	}
};
