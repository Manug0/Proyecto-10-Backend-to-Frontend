import { attendeesList } from "./AttendeesList";

export const registrationForm = (user, event, token) => {
	const formOverlay = document.createElement("div");
	formOverlay.classList.add("overlay");

	const form = document.createElement("form");
	form.innerHTML = `
		<i class="ri-close-line"></i>
		<label for="name">Nombre:</label>
		<input ${user ? `value="${user.user.username}"` : ""} type="text" id="name" name="name" required>
		<label for="email">Correo electrónico:</label>
		<input ${user ? `value="${user.user.email}"` : ""} type="email" id="email" name="email" required>
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

		const username = document.querySelector("#name").value;
		const email = document.querySelector("#email").value;

		try {
			const confirmEventData = await fetch(
				`http://localhost:3000/api/v1/events/confirm/${event._id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					method: "PUT",
					body: JSON.stringify({ username, email }),
				}
			);

			if (confirmEventData.ok) {
				await attendeesList(event, token);

				form.remove();
				formOverlay.remove();
			} else {
				const errorData = await confirmEventData.json();
				console.error("Error:", errorData.message);
				alert("Ha habido un error al apuntarse al evento: " + errorData.message);
			}
		} catch (error) {
			console.error("Error de red:", error);
			alert("Ha habido un error al apuntarse al evento.");
		}
	});
};

export default registrationForm;
