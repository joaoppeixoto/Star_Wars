import App from "../App"
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"


describe('Teste da Aplicação',() => {
test('Verifica se seletores de filtragem estão sendo renderizados', async() => {
render( <App />)
expect(screen.getByTestId(/comparison-filter/i)).toBeInTheDocument();
expect(screen.getByTestId(/column-filter/i)).toBeInTheDocument();
expect(screen.getByTestId(/value-filter/i)).toBeInTheDocument();
})
})
