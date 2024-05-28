import { API_BASE_URL } from "../../main";

const loginSubmit = async (username, password) => {
	const badLogin = document.querySelector(".wrong-login-msg");
	const goodLogin = document.querySelector(".login-msg");

	try {
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
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

export { loginSubmit };
