import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../heroes";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en SearchPage', () => {

    beforeEach(() => jest.clearAllMocks())

    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot()
    });

    test('debe mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole("textbox")
        const heroImage = screen.getByRole("img")
        expect(input.value).toBe("batman")
        expect(heroImage.src).toContain("assets/heroes/dc-batman.jpg")
        
    });

    test('debe de mostrar un error si no se encuentra el heroe', () => {
        render(
            <MemoryRouter initialEntries={["/search?q=batman123"]}>
                <SearchPage />
            </MemoryRouter>
        )

        expect(screen.getByLabelText("error-dialog")).toBeTruthy()
        
    });
    
    test('debe de llamar el navigate a la pantalla nueva', () => {

        const heroToSearch = "superman"

        render(
            <MemoryRouter initialEntries={["/search"]}>
                <SearchPage />
            </MemoryRouter>
        )
        
        const input = screen.getByRole("textbox")
        fireEvent.change(input, { target: { name: "searchText", value: heroToSearch } })
        const form = screen.getByRole("form")
        fireEvent.submit(form)
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${heroToSearch}`)
    });
    

});
