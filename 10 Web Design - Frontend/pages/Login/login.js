import Events from "../Events/events";
import { LoginForm, setupLoginFormEvents } from "./LoginForm";

const login = () => {
	return `
		<section class="login">
			${localStorage.getItem("user") ? Events() : LoginForm()}
		</section>
	`;
};

export const Login = async () => {
	document.querySelector("main").innerHTML = login();
	if (!localStorage.getItem("user")) {
		setupLoginFormEvents();
	}
};
