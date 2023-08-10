import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers"
import { useMemo } from "react"
// import 'animate.css'

export const HeroPage = () => {

    const { heroId } = useParams()
    const hero = useMemo(() => getHeroById(heroId), [heroId])
    const navigate = useNavigate()

    const onNavigateBack = () => { 
        const heroPublisher = hero.publisher.toLowerCase()

        if (heroPublisher === 'dc comics') { 
            navigate('/dc')
            return
        }

        navigate('/marvel')
    }


    if (!hero) return <Navigate to="/marvel" />

    return (
        <div className="row mt-5 ">
            <div className="col-4 animate__animated animate__lightSpeedInLeft">
                <img src={`/assets/heroes/${hero.id}.jpg`} alt={hero.superhero} className="img-thumbnail" />
            </div>
            <div className="col-8 animate__animated animate__fadeInRight">
                <h3>{hero.superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b>{hero.alter_ego}</li>
                    <li className="list-group-item"><b>Publisher: </b>{hero.publisher}</li>
                    <li className="list-group-item"><b>First appearance: </b>{hero.first_appearance}</li>
                </ul>

                <h5 className="mt-3">Characters</h5>
                <p>{hero.characters}</p>
                <button
                    className="btn btn-outline-info"
                    onClick={onNavigateBack}>
                    Regresar
                </button>
            </div>
        </div>
    )
}
