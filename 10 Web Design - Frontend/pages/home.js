const home = () => `
<section class="home">
  <h1>¡Bienvenido a Events App!</h1>
  <p>Aquí podrás crear y unirte a los eventos más emocionantes. ¡Explora y disfruta!</p>
</section>
`;

export const Home = async () => {
	document.querySelector("main").innerHTML = home();
};
