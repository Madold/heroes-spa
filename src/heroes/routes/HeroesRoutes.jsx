import { Navigate, Route, Routes } from "react-router-dom"
import { NavBar } from "../../ui"
import { DcPage, HeroPage, MarvelPage, SearchPage } from "../pages"

export const HeroesRoutes = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="marvel" />} />
                    <Route path="marvel" element={<MarvelPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="hero/:heroId" element={<HeroPage />} />
                    <Route path="dc" element={<DcPage />} />
                </Routes>
            </div>
        </>
    )
}
