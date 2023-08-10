import { render, screen } from "@testing-library/react"
import { PrivateRoute } from "../../router/PrivateRoute"
import { AuthContext } from "../../auth"
import { MemoryRouter, Route, Routes } from "react-router-dom"

describe('Pruebas en PrivateRoute', () => {

    test('Si el usuario está autenticado debe mostrar el children', () => {

        const setItemMock = jest.fn()
        Storage.prototype.setItem = setItemMock

        const contextValue = {
            logged: true,
            user: {
                name: 'Juan',
                id: "ABC"
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/marvel"]}>
                    <Routes>
                        <Route
                            path="/marvel"
                            element={
                                <PrivateRoute>
                                    <h1>Esta es una ruta privada</h1>
                                </PrivateRoute>
                            }
                        />
                        <Route path="/login" element={<h1>Este es el login</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText("Esta es una ruta privada")).toBeTruthy()
        expect(setItemMock).toHaveBeenCalledWith("lastPath", "/marvel")
    })

    test('Si el usuario no está autenticado debe mostrar el login', () => {

        const setItemMock = jest.fn()
        Storage.prototype.setItem = setItemMock

        const contextValue = {
            logged: false,
            user: {
                name: 'Juan',
                id: "ABC"
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/marvel"]}>
                    <Routes>
                        <Route
                            path="/marvel"
                            element={
                                <PrivateRoute>
                                    <h1>Esta es una ruta privada</h1>
                                </PrivateRoute>
                            }
                        />
                        <Route path="/login" element={<h1>Este es el login</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText("Este es el login")).toBeTruthy()
        expect(setItemMock).toHaveBeenCalledTimes(1)
    })


})
