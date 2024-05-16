export const attendeesList = async (event, token) => {
	const attendeeData = await fetch(`http://localhost:3000/api/v1/attendees`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const attendeeDetails = await attendeeData.json();
	const attendeesList = document.querySelector(".attendees-list");
	const eventAttendees = attendeeDetails.filter((attendee) =>
		attendee.eventsConfirmed.includes(event._id)
	);

	attendeesList.innerHTML = "";

	eventAttendees.forEach((attendee) => {
		const attendeeItem = document.createElement("p");
		attendeeItem.classList.add("confirmedAttendee");
		attendeeItem.textContent = attendee.name;
		attendeesList.appendChild(attendeeItem);
	});
};
