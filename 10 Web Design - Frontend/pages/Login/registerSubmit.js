import { API_BASE_URL } from "../../main";
import { loginSubmit } from "./loginSubmit";

const registerSubmit = async (ev) => {
	ev.preventDefault();

	const username = document.querySelector(".usernameReg").value;
	const email = document.querySelector(".emailReg").value;
	const password = document.querySelector(".passwordReg").value;

	const usernameInput = document.querySelector(".usernameReg");
	const emailInput = document.querySelector(".emailReg");
	const passwordInput = document.querySelector(".passwordReg");

	const badReg = document.querySelector(".wrong-reg-msg");
	const goodReg = document.querySelector(".reg-msg");

	const validateForm = () => {
		if (usernameInput.value.length < 4) {
			badReg.innerText = "El nombre de usuario debe tener más de 4 caracteres";
			badReg.style.display = "flex";
			usernameInput.style.border = "1px solid red";
			usernameInput.style.backgroundColor = "#FFCCCC";
			return false;
		} else {
			usernameInput.style.border = "1px solid black";
			usernameInput.style.backgroundColor = "white";
			badReg.style.display = "none";
		}

		const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
		if (!emailInput.value.match(emailPattern)) {
			badReg.innerText = "Formato de email incorrecto";
			badReg.style.display = "flex";
			emailInput.style.border = "1px solid red";
			emailInput.style.backgroundColor = "#FFCCCC";
			return false;
		} else {
			emailInput.style.border = "1px solid black";
			emailInput.style.backgroundColor = "white";
			badReg.style.display = "none";
		}

		if (passwordInput.value.length < 4) {
			badReg.innerText = "La contraseña debe tener más de 4 caracteres";
			badReg.style.display = "flex";
			passwordInput.style.border = "1px solid red";
			passwordInput.style.backgroundColor = "#FFCCCC";
			return false;
		} else {
			passwordInput.style.border = "1px solid black";
			passwordInput.style.backgroundColor = "white";
			badReg.style.display = "none";
		}
		return true;
	};

	if (validateForm()) {
		try {
			const response = await fetch(`${API_BASE_URL}/auth/register`, {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					username,
					email,
					password,
				}),
			});

			const dataRes = await response.json();
			if (response.ok) {
				goodReg.style.display = "flex";
				badReg.style.display = "none";
				loginSubmit(username, password);
			} else {
				badReg.style.display = "flex";
				badReg.innerText = dataRes.message || "Error al registrarse";
				console.error(dataRes.message || "Error al registrarse");
			}
		} catch (error) {
			badReg.style.display = "flex";
			badReg.innerText = "Error en la solicitud de registro";
			console.error("Error en la solicitud de registro:", error);
		}
	}
};

export { registerSubmit };
