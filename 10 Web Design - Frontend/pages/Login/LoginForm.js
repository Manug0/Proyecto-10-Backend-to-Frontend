import Events from "../Events/events";
import { Register } from "./RegisterForm";
import { loginSubmit } from "./loginSubmit";
import "./login-popup.css";
import "./forms.css";

const LoginForm = () => {
	return `
		<div class="overlay">
			<div class="login-popup">
				<form class="login-form">
					<i class="ri-close-line"></i>
					<label for="username">Nombre de usuario:</label>
					<input type="text" class="username" name="username" required />
					<label for="password">Contraseña:</label>
					<input type="password" class="password" name="password" required />
					<div class="login-buttons">
						<button class="submit">Iniciar sesión</button>
						<button class="register-btn">Registrarse</button>
					</div>
					<p class="login-msg">Sesión iniciada correctamente</p>
					<p class="wrong-login-msg">Usuario o contraseña incorrectos</p>
				</form>
			</div>
		</div>
	`;
};

const setupLoginFormEvents = () => {
	document.querySelector(".submit").addEventListener("click", (ev) => {
		ev.preventDefault();
		const username = document.querySelector(".username").value;
		const password = document.querySelector(".password").value;
		loginSubmit(username, password);
	});

	document.querySelector(".register-btn").addEventListener("click", () => {
		Register();
	});

	document.querySelector(".ri-close-line").addEventListener("click", () => {
		Events();
	});
};

export { LoginForm, setupLoginFormEvents };
