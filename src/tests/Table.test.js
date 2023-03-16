import App from "../App"
import { render, screen, waitFor } from '@testing-library/react'
import PlanetProvider from "../context/PlanetProvider"
import userEvent from "@testing-library/user-event"


describe('Teste da Aplicação',() => {
test('Testa se os valores de filtragem são renderizados na tela', async() => {
render(
    <PlanetProvider> 
    <App /> 
    </PlanetProvider>)
await waitFor(() => {
    const planet = screen.getByRole('columnheader', {name: /tatooine/i})
      expect(planet).toBeInTheDocument();
},{timeout:1000})

const btnFilter = screen.getByRole('button', { name: /filtrar/i})
  userEvent.click(btnFilter)

  const numberFilter = screen.getByRole('spinbutton')
  expect(numberFilter).toBeInTheDocument()

  const filterName = screen.getByRole('textbox')
  expect(filterName).toBeInTheDocument()




})
})

//   describe('Testes da aplicação completa', () => {
//     test('Testes de renderização', async () => {
//       render(<App />);
  
//       await waitFor(() => {
//         const FirstPlanet = screen.getByText('Tatooine')
//         expect(FirstPlanet).toBeInTheDocument()
//       }, { timeout: 10000 })
  
//       const nameInput = screen.getByTestId('name-filter')
  
//       userEvent.type(nameInput, 'Tatooine')
//       userEvent.type(nameInput, '')
  
//       const columnFilter = screen.getByTestId('column-filter')
//       const comparisonFilter = screen.getByTestId('comparison-filter')
  
//       expect(columnFilter).toBeInTheDocument()
//       expect(comparisonFilter).toBeInTheDocument()
  
//       const valueFilter = screen.getByTestId('value-filter')
  
//       userEvent.type(valueFilter, '463')
  
//       const buttonFilter = screen.getByTestId('button-filter')
  
//       userEvent.click(buttonFilter)
//     })
//     test('Testes condicional menor que', async () => {
//       render(<App />);
  
//       await waitFor(() => {
//         const FirstPlanet = screen.getByText('Tatooine')
//         expect(FirstPlanet).toBeInTheDocument()
//       }, { timeout: 10000 })
  
//       const columnFilter = screen.getByTestId('column-filter')
//       const comparisonFilter = screen.getByTestId('comparison-filter')
//       const valueFilter = screen.getByTestId('value-filter')
//       const buttonFilter = screen.getByTestId('button-filter')
  
//       userEvent.selectOptions(columnFilter, 'orbital_period')
//       userEvent.selectOptions(comparisonFilter, 'menor que')
//       userEvent.type(valueFilter, '500')
  
//       userEvent.click(buttonFilter)
//       const Planet = screen.getByText('Kamino')
//       expect(Planet).toBeInTheDocument()
//     })
//     test('Testes condicional igual a', async () => {
//       render(<App />);
  
//       await waitFor(() => {
//         const FirstPlanet = screen.getByText('Tatooine')
//         expect(FirstPlanet).toBeInTheDocument()
//       }, { timeout: 10000 })
  
//       const columnFilter = screen.getByTestId('column-filter')
//       const comparisonFilter = screen.getByTestId('comparison-filter')
//       const valueFilter = screen.getByTestId('value-filter')
//       const buttonFilter = screen.getByTestId('button-filter')
  
//       userEvent.selectOptions(columnFilter, 'diameter')
//       userEvent.selectOptions(comparisonFilter, 'igual a')
//       userEvent.type(valueFilter, '4900')
  
//       userEvent.click(buttonFilter)
  
//       const Planet = screen.getByText('Endor')
//       expect(Planet).toBeInTheDocument()
//     })
// })