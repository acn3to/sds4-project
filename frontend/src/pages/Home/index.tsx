import Cards from "components/Cards";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
        <NavBar />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">DS-Vendas</h1>
                    <p className="lead">Analise o desempenho das suas vendas por diferentes perspectivas</p>
                    <hr />
                    <br></br>
                    <Link className="btn btn-outline-primary btn-lg" to="/dashboard">
                        Acesse o dashboard
                    </Link>
                    <br></br>
                    <p>Esta aplicação consiste em exibir um dashboard a partir de dados fornecidos por um back end construído com Spring Boot. Tecnologias:</p>
                    <br></br>
                    <Cards />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;