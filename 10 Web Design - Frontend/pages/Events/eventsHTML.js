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

export default events;
