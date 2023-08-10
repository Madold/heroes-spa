import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../router/PublicRoute";
import { AuthContext } from "../../auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Pruebas en PublicRoute', () => {

    test('Debe de mostrar el children si el usuario no está autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect(screen.getByText("Ruta publica")).toBeTruthy()
    })


    test('Debe de navegar si el usuario está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Juan',
                id: "ABC"
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/login"]}>
                    <Routes>
                        <Route path="marvel" element={<h1>Esta es la pagina de marvel</h1>} />
                        <Route
                            path="login"
                            element={
                                <PublicRoute>
                                    <h1>Ruta publica</h1>
                                </PublicRoute>
                            }
                        />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText("Esta es la pagina de marvel")).toBeTruthy()
    })



})
