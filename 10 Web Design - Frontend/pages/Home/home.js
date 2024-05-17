import "./home.css";
const home = () => `
<section class="home">
  <h1>¡Bienvenido a Events App!</h1>
  <p>Aquí podrás crear y unirte a los eventos más emocionantes. ¡Explora y disfruta!</p>
  <p>¿Tienes una idea para un evento? <span>¡Adelante, crea uno!</span> Nuestra plataforma hace que sea fácil compartir tus intereses con otros.</p>
  <p>¿Buscas algo emocionante para hacer? <span>¡Únete a un evento!</span> Nunca se sabe qué nuevas amistades podrías hacer o qué nuevas experiencias podrías descubrir.</p>
</section>
`;

export const Home = async () => {
	document.querySelector("main").innerHTML = home();
};
