export const registrationForm = (user, event, token) => {
	const formOverlay = document.createElement("div");
	formOverlay.classList.add("overlay");

	const form = document.createElement("form");
	form.innerHTML = `
      <i class="ri-close-line"></i>
      <label for="name">Nombre:</label>
      <input ${
				user ? `value=${user.user.username}` : ""
			} type="text" id="name" name="name" required>
      <label for="email">Correo electrónico:</label>
      <input ${
				user ? `value=${user.user.email}` : ""
			} type="email" id="email" name="email" required>
      <input type="submit" value="Apuntarse">
  `;

	formOverlay.appendChild(form);

	document.querySelector("#event-details").appendChild(formOverlay);

	document.querySelector("#event-details .ri-close-line").addEventListener("click", () => {
		form.remove();
		formOverlay.remove();
	});

	form.addEventListener("submit", async (ev) => {
		ev.preventDefault();

		const name = document.querySelector("#name").value;
		const email = document.querySelector("#email").value;

		const attendeeData = await fetch(`http://localhost:3000/api/v1/attendees`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const attendeeDetails = await attendeeData.json();

		const isEmailUsed = attendeeDetails.some((attendee) => attendee.email === email);

		if (!isEmailUsed) {
			const confirmEventData = await fetch(
				`http://localhost:3000/api/v1/events/confirm/${event._id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					method: "PUT",
					body: JSON.stringify({ name, email }),
				}
			);

			if (confirmEventData.ok) {
				const registerDetails = await confirmEventData.json();

				const attendeesList = document.querySelector(".attendees-list");
				const attendeeItem = document.createElement("p");
				attendeeItem.classList.add("confirmedAttendee");
				attendeeItem.textContent = registerDetails.attendee.name;
				attendeesList.appendChild(attendeeItem);
			} else {
				console.log("Ha habido un error al apuntarse al evento");
			}
		} else {
			alert("Ya te has registrado para este evento con este correo electrónico.");
		}
	});
};

export default registrationForm;
