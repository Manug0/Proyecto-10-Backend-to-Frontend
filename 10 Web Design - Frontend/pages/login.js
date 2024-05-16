import Events from "./Events/events";

const login = () => {
	return `
	<section class="login">
	${
		localStorage.getItem("user")
			? Events()``
			: `	
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
				</div>`
	}
	</section>
	`;
};

const loginSubmit = async (username, password) => {
	const badLogin = document.querySelector(".wrong-login-msg");
	const goodLogin = document.querySelector(".login-msg");

	try {
		const response = await fetch("http://localhost:3000/api/v1/auth/login", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ username, password }),
		});

		const dataRes = await response.json();

		if (response.ok) {
			localStorage.setItem("user", JSON.stringify(dataRes));
			if (badLogin) {
				badLogin.style.display = "none";
			}
			if (goodLogin) {
				goodLogin.style.display = "flex";
			}
			setTimeout(() => location.reload(), 1000);
		} else {
			badLogin.style.display = "flex";
			console.error(dataRes.message || "Error de inicio de sesión");
		}
	} catch (error) {
		console.error("Error en la solicitud de inicio de sesión:", error);
	}
};

export const Login = async () => {
	document.querySelector("main").innerHTML = login();

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

const register = () => {
	document.querySelector(".login-popup").innerHTML = `
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

	document.querySelector(".registerSubmit").addEventListener("click", (ev) => {
		ev.preventDefault();
		registerSubmit();
	});

	document.querySelector(".backLogin").addEventListener("click", () => {
		Login();
	});

	document.querySelector(".ri-close-line").addEventListener("click", () => {
		Events();
	});
};

const registerSubmit = async (ev) => {
	const username = document.querySelector(".usernameReg").value;
	const email = document.querySelector(".emailReg").value;
	const password = document.querySelector(".passwordReg").value;

	const usernameInput = document.querySelector(".usernameReg");
	const emailInput = document.querySelector(".emailReg");
	const passwordInput = document.querySelector(".passwordReg");

	const badReg = document.querySelector(".wrong-reg-msg");
	const goodReg = document.querySelector(".reg-msg");

	try {
		const response = await fetch("http://localhost:3000/api/v1/auth/register", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
			}),
		});

		if (usernameInput.value.length < 4) {
			badReg.innerText = "El nombre de usuario debe tener más de 4 carácteres";
			badReg.style.display = "flex";

			usernameInput.style.border = "1px solid red";
			usernameInput.style.backgroundColor = "#FFCCCC";

			ev.preventDefault();
		} else {
			usernameInput.style.border = "1px solid black";
			usernameInput.style.backgroundColor = "white";
			badReg.style.display = "none";
		}

		let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
		if (!emailInput.value.match(emailPattern)) {
			badReg.innerText = "Formato de email incorrecto";
			badReg.style.display = "flex";

			emailInput.style.border = "1px solid red";
			emailInput.style.backgroundColor = "#FFCCCC";

			ev.preventDefault();
		} else {
			emailInput.style.border = "1px solid black";
			emailInput.style.backgroundColor = "white";
			badReg.style.display = "none";
		}

		if (passwordInput.value.length < 4) {
			badReg.innerText = "La contraseña debe tener más de 4 carácteres";
			badReg.style.display = "flex";

			passwordInput.style.border = "1px solid red";
			passwordInput.style.backgroundColor = "#FFCCCC";

			ev.preventDefault();
		} else {
			passwordInput.style.border = "1px solid black";
			passwordInput.style.backgroundColor = "white";
			badReg.style.display = "none";
		}

		goodReg.style.display = "flex";
		badReg.style.display = "none";

		loginSubmit(username, password);
	} catch (error) {
		console.log(error.message);
	}
};

const Register = async () => {
	await register();
};
