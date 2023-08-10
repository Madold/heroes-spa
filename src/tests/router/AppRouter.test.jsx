import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../router/AppRouter";
import { AuthContext } from "../../auth";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en AppRouter', () => {

    test('Debe mostrar el login si el usuario no está autenticado', () => {
        const contextValue = {
            logged: false,
            user: {
                name: 'Juan',
                id: "ABC"
            }
        }

        render(
            <MemoryRouter initialEntries={["/marvel"]}>
                <AuthContext.Provider value={contextValue} >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getAllByText("Login").length).toBe(2);
    });

    test('Debe de mostrar el componente de marvel si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Juan',
                id: "ABC"
            }
        }

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <AuthContext.Provider value={contextValue} >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByLabelText("marvel").classList).toContain("active");
        expect(screen.getByLabelText("marvel-title").innerHTML).toBe("Marvel");
        expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
    });
    

});
