import Events from "../Events/events";
import { Login } from "./login";
import { registerSubmit } from "./registerSubmit";

const RegisterForm = () => {
	return `
		<form class="register-form">
			<i class="ri-close-line"></i>
			<input type="text" class="usernameReg" placeholder="Nombre de usuario" required>
			<input class="emailReg" type="email" id="email" name="email" placeholder="Email" required>
			<input type="password" class="passwordReg" placeholder="Contraseña" required>
			<button type="submit" class="registerSubmit">Registrarse</button>
			<button class="backLogin">Volver a iniciar sesión</button>
			<p class="reg-msg">Usuario registrado correctamente</p>
			<p class="wrong-reg-msg">Error al registrarse</p>
		</form>
	`;
};

const setupRegisterFormEvents = () => {
	document.querySelector(".registerSubmit").addEventListener("click", (ev) => {
		ev.preventDefault();
		registerSubmit(ev);
	});

	document.querySelector(".backLogin").addEventListener("click", (ev) => {
		Login();
	});

	document.querySelector(".ri-close-line").addEventListener("click", () => {
		Events();
	});
};

const Register = async () => {
	document.querySelector(".login-popup").innerHTML = RegisterForm();
	setupRegisterFormEvents();
};

export { Register, setupRegisterFormEvents };
