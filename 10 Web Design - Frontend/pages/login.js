import Events from "./events";

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
							<p class="login-msg">Inicio de sesión correcto</p>
							<p class="wrong-login-msg">Usuario o contraseña incorrectos</p>
							<p class="register-msg">Usuario registrado</p>
						</form>
					</div>
				</div>`
	}
	</section>
	`;
};

const loginSubmit = async () => {
	const username = document.querySelector(".username").value;
	const password = document.querySelector(".password").value;
	const badLogin = document.querySelector(".wrong-login-msg");
	const goodLogin = document.querySelector(".login-msg");

	const response = await fetch("http://localhost:3000/api/v1/auth/login", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});

	const dataRes = await response.json();

	if (response.ok) {
		localStorage.setItem("user", JSON.stringify(dataRes));
		badLogin.style.display = "none";
		goodLogin.style.display = "flex";
		setTimeout(location.reload(), 1500);
	} else {
		badLogin.style.display = "flex";
		setTimeout(function () {
			badLogin.style.display = "none";
		}, 1501);
	}
};

export const Login = async () => {
	document.querySelector("main").innerHTML = login();

	document.querySelector(".submit").addEventListener("click", (ev) => {
		ev.preventDefault();
		loginSubmit();
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
	<i class="ri-close-line"></i>
	<form class="register-form">
		<input type="text" class="usernameReg" placeholder="Nombre de usuario" required>
		<input type="email" class="emailReg" placeholder="Correo electrónico" required>
		<input type="password" class="passwordReg" placeholder="Contraseña" required>
		<button type="submit" class="registerSubmit">Registrarse</button>
		<button class="backLogin">Volver a iniciar sesión</button>
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

const registerSubmit = async () => {
	const username = document.querySelector(".usernameReg").value;
	const email = document.querySelector(".emailReg").value;
	const password = document.querySelector(".passwordReg").value;

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

		if (!response.ok) {
			throw new Error("Error al registrarse");
		}

		console.log("Usuario registrado con éxito");

		Login();
	} catch (error) {
		console.log(error.message);
	}
};

const Register = async () => {
	await register();
};
