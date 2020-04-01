import React from "react";
import "../styles/footer.scss";
import { Link } from "gatsby";
import NewsletterForm from "../components/NewsletterForm";

const Footer = ({ location }) => (
  <footer>
    <NewsletterForm location={location} />
    <p>
      La información proporcionada en esta pagina web es solo para orientación
      general. Si actualmente está sujeto a un proceso de desalojo o un aumento
      de la renta, o está bajo amenaza de cualquiera de estos, consulte a un
      abogado o busque ayuda en nuestra página de Recursos{" "}
      <Link to="/es/about-us">Sobre Nosotros</Link>
    </p>
  </footer>
);
export default Footer;
