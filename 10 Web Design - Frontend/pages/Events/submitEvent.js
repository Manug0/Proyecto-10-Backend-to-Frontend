import { API_BASE_URL } from "../../main";

const submitEvent = async (name, date, location, description, poster) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const token = user.token;

	let formData = new FormData();
	formData.append("name", name);
	formData.append("date", date);
	formData.append("location", location);
	formData.append("description", description);
	formData.append("poster", poster);

	const response = await fetch(`${API_BASE_URL}/events/add`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method: "POST",
		body: formData,
	});

	if (response.ok) {
		window.location.reload();
	} else {
		alert("Ha habido un error al crear el evento");
	}
};

export default submitEvent;
