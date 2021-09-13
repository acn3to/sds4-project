import { DiReact } from "react-icons/di";
import { SiBootstrap, SiJava, SiPostgresql, SiSpring, SiTypescript } from "react-icons/si";


const Cards = () => {
    return (
        <div className="card-group py-3 text-center">
            <div className="card col-sm-2 bg-secondary m-1">
                <SiJava className="card-img-top py-2" size="100" />
                <div className="card-body">
                    <h5 className="card-title">Java</h5>
                </div>
            </div>
            <div className="card col-sm-2 bg-secondary m-1">
                <SiSpring className="card-img-top py-2" size="100" />
                <div className="card-body">
                    <h5 className="card-title">Spring Boot</h5>
                </div>
            </div>
            <div className="card col-sm-2 bg-secondary m-1">
                <SiPostgresql className="card-img-top py-2" size="100" />
                <div className="card-body">
                    <h5 className="card-title">PostgreSQL</h5>
                </div>
            </div>
            <div className="card col-sm-2 bg-secondary m-1">
                <DiReact className="card-img-top" size="100" />
                <div className="card-body">
                    <h5 className="card-title">React</h5>
                </div>
            </div>
            <div className="card col-sm-2 bg-secondary m-1">
                <SiTypescript className="card-img-top py-2" size="100" />
                <div className="card-body">
                    <h5 className="card-title">TypeScript</h5>
                </div>
            </div>
            <div className="card col-sm-2 bg-secondary m-1">
                <SiBootstrap className="card-img-top py-2" size="100" />
                <div className="card-body">
                    <h5 className="card-title">Bootstrap</h5>
                </div>
            </div>
        </div>

    );
}

export default Cards;

