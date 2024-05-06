import { Login } from "./login";

const user = JSON.parse(localStorage.getItem("user"));

const events = () => `
<section class="events">
	${user ? `<h2 class="welcome-msg">Bienvenido, ${user.user.username}</h2>` : ""}
	<button class="create-event-button">Crear evento</button>
	<div class="create-event">
		<form class="event-form">
			<div>
				<label for="name">Nombre</label> <input type="text" class="name" name="name" required />
			</div>
			<div>
				<label for="date">Fecha</label> <input type="date" class="date" name="date" required />
			</div>
			<div>
				<label for="location">Ubicación</label>
				<input type="text" class="location" name="location" required />
			</div>
			<div>
				<label for="description">Descripción</label>
				<input type="text" class="description" name="description"/>
			</div>
			<div>
				<label for="poster" class="custom-file-upload">Poster</label>
				<input type="file" id="poster" class="poster" name="poster"	required/>
			</div>
			<span id="file-message" style="display: none;">Archivo seleccionado</span>
			<button class="add-event-button">Crear</button>
		</form>
		<i class="ri-close-line"></i>
	</div>
	<div id="event-details"></div>
	<div class="event-list"></div>
</section>
`;

const getEvents = async () => {
	const eventsData = await fetch("http://localhost:3000/api/v1/events", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const events = await eventsData.json();
	const eventsContainer = document.querySelector(".event-list");

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
				eventsContainer.style.display = "none";

				const createEventButton = document.querySelector(".create-event-button");
				createEventButton.style.display = "none";

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

				document.querySelector(".register").addEventListener("click", () => {
					if (!this.classList.contains("clicked")) {
						const form = document.createElement("form");
						form.innerHTML = `
							<i class="ri-close-line"></i>
							<label for="name">Nombre:</label>
							<input ${user ? `value=${user.user.username}` : ""} type="text" id="name" name="name" required>
							<label for="email">Correo electrónico:</label>
							<input ${user ? `value=${user.user.email}` : ""} type="email" id="email" name="email" required>
							<input type="submit" value="Apuntarse">
						`;

						document.querySelector("#event-details").appendChild(form);

						document
							.querySelector("#event-details .ri-close-line")
							.addEventListener("click", () => {
								form.remove();
								this.classList.remove("clicked");
							});

						this.classList.add("clicked");

						form.addEventListener("submit", async (ev) => {
							ev.preventDefault();

							const user = JSON.parse(localStorage.getItem("user"));
							const token = user.token;

							const name = document.querySelector("#name").value;
							const email = document.querySelector("#email").value;

							const attendeeData = await fetch(`http://localhost:3000/api/v1/attendees`, {
								headers: {
									Authorization: `Bearer ${token}`,
								},
							});

							const attendeeDetails = await attendeeData.json();

							const isEmailUsed = attendeeDetails.some((attendee) => attendee.email === email);

							let confirmEventData;

							if (!isEmailUsed) {
								confirmEventData = await fetch(
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
							} else {
								alert("Ya te has registrado para este evento con este correo electrónico.");
							}

							if (confirmEventData && confirmEventData.ok) {
								const registerDetails = await confirmEventData.json();
								const attendeesList = document.querySelector(".attendees-list");

								const attendeeItem = document.createElement("p");
								attendeeItem.classList.add("confirmedAttendee");
								attendeeItem.textContent = registerDetails.attendee.name;
								attendeesList.appendChild(attendeeItem);

								const eventAttendees = attendeeDetails.filter((attendee) =>
									attendee.eventsConfirmed.includes(event._id)
								);

								eventAttendees.forEach((attendee) => {
									const attendeeItem = document.createElement("p");
									attendeeItem.classList.add("confirmedAttendee");
									attendeeItem.textContent = attendee.name;
									attendeesList.appendChild(attendeeItem);
								});
							} else {
								console.log("Ha habido un error al apuntarse al evento");
							}
						});
					}
				});
			} else {
				alert("Tienes que estar conectado para ver los detalles del evento");
				Login();
			}
		});
	}
};

const Events = async () => {
	document.querySelector("main").innerHTML = events();
	getEvents();

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

	document.querySelector(".add-event-button").addEventListener("click", (ev) => {
		eventSubmit();
	});
};

const eventSubmit = async () => {
	const name = document.querySelector(".name").value;
	const date = document.querySelector(".date").value;
	const location = document.querySelector(".location").value;
	const description = document.querySelector(".description").value;
	const poster = document.querySelector(".poster").files[0];

	const user = JSON.parse(localStorage.getItem("user"));
	const token = user.token;

	let formData = new FormData();
	formData.append("name", name);
	formData.append("date", date);
	formData.append("location", location);
	formData.append("description", description);
	formData.append("poster", poster);

	const response = await fetch("http://localhost:3000/api/v1/events/add", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method: "POST",
		body: formData,
	});

	if (response.ok) {
		getEvents();
	} else {
		alert("Ha habido un error al crear el evento");
	}
};

export default Events;
