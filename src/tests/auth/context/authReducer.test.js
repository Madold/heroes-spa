import { types, authReducer } from "../../../auth";

describe('Pruebas en el authReducer', () => {

    test('Debe de retornar el estado por defecto', () => {
        const initialState = {
            logged: false
        }
        const action = {
            type: 'default'
        }

        const { logged, user } = authReducer(initialState, action)

        expect(logged).toBeFalsy()
        expect(user).toBeUndefined()
    });

    test('Debe de autenticar y colocar el name del usuario', () => { 

        const initialState = {
            logged: false
        }

        const action = {
            type: types.login,
            payload: {
                name: 'Juan'
            }
        }

        const { logged, user } = authReducer(initialState, action)

        expect(logged).toBeTruthy()
        expect(user.name).toBe('Juan')

    })

    test('Debe de cerrar sesión y borrar el nombre del usuario', () => { 

        const initialState = {
            logged: true,
            user: { 
                name: 'Juan'
            }
        }
        
        const action = {
            type: types.logout
        }

        const { logged, user } = authReducer(initialState, action)

        expect(logged).toBeFalsy()
        expect(user).toBeUndefined()

    })

});

