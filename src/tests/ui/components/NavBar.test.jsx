import { fireEvent, render, screen } from "@testing-library/react";
import { NavBar } from "../../../ui";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth";

const mockedUseNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en el NavBar', () => {

    test('debe de mostrar el nombre del usuario logeado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Juan',
                id: "ABC"
            }
        }

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue} >
                    <NavBar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByText(contextValue.user.name)).toBeTruthy()
    });

    test('Debe de llamar el logout y navigate cuando se hace click en el boton de cerrar sesión', () => {
        
        const logoutMock = jest.fn()
        const contextValue = {
            logged: true,
            user: {
                name: 'Juan',
                id: "ABC"
            },
            logout: logoutMock
        }

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue} >
                    <NavBar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const logoutButton = screen.getByText("Logout")
        fireEvent.click(logoutButton)
        expect(logoutMock).toHaveBeenCalled()
        expect(logoutMock).toHaveBeenCalledTimes(1)
        expect(mockedUseNavigate).toHaveBeenCalled()
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {replace: true})
    });


});
