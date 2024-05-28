import { API_BASE_URL } from "../../main";

export const attendeesList = async (event, token) => {
	try {
		const response = await fetch(`${API_BASE_URL}/users`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error("Error al obtener los usuarios");
		}

		const userDetails = await response.json();
		const attendeesListElement = document.querySelector(".attendees-list");

		const eventAttendees = userDetails.filter(
			(user) => user.eventsConfirmed && user.eventsConfirmed.some((e) => e._id === event._id)
		);

		attendeesListElement.innerHTML = "";

		eventAttendees.forEach((user) => {
			const attendeeItem = document.createElement("p");
			attendeeItem.classList.add("confirmedAttendee");
			attendeeItem.textContent = user.username;
			attendeesListElement.appendChild(attendeeItem);
		});
	} catch (error) {
		console.error("Error al obtener la lista de asistentes:", error);
	}
};
