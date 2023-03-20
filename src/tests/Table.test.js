import App from "../App"
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import mock from "./mock"
// import getPlanets from "../services/FetchApi"
import PlanetProvider from "../context/PlanetProvider"


const endpoint = 'https://swapi.dev/api/planets'

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockImplementation(() => mock),
  });
});

afterEach(() => {
  jest.resetAllMocks();
});


describe('Teste da Aplicação',() => {
  test('Testa a requisição da API', async() => {
    render(<App />)
    const response = await global.fetch();
    const result = await response.json();
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(result).toEqual(mock);
    })
    })

      
test('Verifica se seletores de filtragem estão sendo renderizados',() => {
render( <App />)
const comparison = screen.getByTestId(/comparison-filter/i)
const values = screen.getByTestId(/value-filter/i)
const columns = screen.getByTestId(/column-filter/i)
const btnFilter = screen.getByTestId('button-filter')
expect(comparison).toBeInTheDocument();
expect(values).toBeInTheDocument();
expect(columns).toBeInTheDocument();

userEvent.selectOptions(columns, 'population')
userEvent.selectOptions(comparison, 'igual a')
userEvent.type(values, '8900')
userEvent.click(btnFilter)
})

test('Verifica se o input de filtro por nome de planetas é renderizado',() => {
  render( <App />)
  const inputFilter = screen.getByTestId(/name-filter/i)
  expect(inputFilter).toBeInTheDocument();
  })

test('Planetas da API são renderizados', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mock),
  }); 
  
  render(<App />);
  const planets = await screen.findByText(/Tatooine/i);
  expect(planets).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    'https://swapi.dev/api/planets',
  );
  });

    test('Verifica se os botões e filtro por nome estão funcionando', () => {
      render(<App />)
    const buttons = screen.getAllByRole('button')
    userEvent.click(buttons[2])
    userEvent.type(screen.getByTestId('name-filter'), 'a')

    userEvent.click(buttons[1])
      })

      test('Testa a condição igual a',() => {
        render(
          <PlanetProvider>
           <App />
           </PlanetProvider>
           )
        waitFor(() => {
          const planet = screen.getByText('Tatooine')
          expect(planet).toBeInTheDocument();
          }, {timeout:4000})
        const values = screen.getByTestId(/value-filter/i)
        const columns = screen.getByTestId(/column-filter/i)
        const comparison = screen.getByTestId(/comparison-filter/i)
        const btnFilter = screen.getByTestId('button-filter')

        userEvent.selectOptions(columns, ['surface_water'])
        userEvent.selectOptions(comparison, 'maior que')
        userEvent.type(values, '40' )
    
        userEvent.click(btnFilter) 

        })
        test('Testa a condição maior que', () => {
          render(
          <PlanetProvider>
             <App />
              </PlanetProvider>);
          waitFor(() => {
          const planet = screen.getByText('Tatooine')
          expect(planet).toBeInTheDocument();
          }, {timeout:4000})

          const values = screen.getByTestId(/value-filter/i)
          const columns = screen.getByTestId(/column-filter/i)
          const comparison = screen.getByTestId(/comparison-filter/i)
          const btnFilter = screen.getByTestId('button-filter')
  
          userEvent.selectOptions(columns, 'population')
          userEvent.selectOptions(comparison, 'maior que')
          userEvent.type(values, '0' )
          userEvent.click(btnFilter)
          })

          test('Testa a condição menor que', async() => {
            render(<PlanetProvider> <App /> </PlanetProvider>)
            await waitFor(() => {
              const planet = screen.getByText('Tatooine')
              expect(planet).toBeInTheDocument();
              }, {timeout:4000})
            const values = screen.getByTestId(/value-filter/i)
            const columns = screen.getByTestId(/column-filter/i)
            const comparison = screen.getByTestId(/comparison-filter/i)
            const btnFilter = screen.getByTestId('button-filter')

            userEvent.selectOptions(columns, 'surface_water')
            userEvent.selectOptions(comparison, 'menor que')
            userEvent.type(values, '200' )
    
            userEvent.click(btnFilter)
            
            })
         
              test('Testa se os filtros dos planetas são utilizados', async () => {
                jest.spyOn(global, 'fetch');
                global.fetch.mockResolvedValue({
                  json: jest.fn().mockResolvedValue(mock),
                });
                render(<App />);
                const inputColumns = await screen.findByTestId('column-filter');
                userEvent.selectOptions(inputColumns, 'population');
                const comparison = await screen.findByTestId('comparison-filter');
                userEvent.selectOptions(comparison, 'igual a');
                const values =  await screen.findByTestId('value-filter');
                userEvent.type(values, '10000');
              
                const numericalValue = await screen.findByTestId('value-filter');
                userEvent.type(numericalValue, '90000');
              
                const filters = await screen.findByTestId('button-filter');
                userEvent.click(filters);
                expect(await screen.findAllByRole('row')).toHaveLength(1);
                const btnRemove = await screen.findByRole('button', { name: /Remover Filtros/i });
                expect(btnRemove).toBeInTheDocument();
                const filterPlanets = await screen.findByTestId("filter");
                expect(filterPlanets).toBeInTheDocument();
              });

              test('Testa o botão de remover todos filtros',() => {
                render( <App />)
                const btnRemove = screen.getByRole('button', {name: /remover filtros/i })
                expect(btnRemove).toBeInTheDocument();
                userEvent.click(btnRemove) 
                })

                test('Testa se os radio buttons e botão de ordenar estão na tela ',() => {
                  render( <App />)
                  const orderBtn = screen.getByRole('button', { name: /ordenar/i })
                 const ascDesc = screen.getByText(/ascendentedescendente/i)
                 expect(orderBtn).toBeInTheDocument()
                 expect(ascDesc).toBeInTheDocument;
                 userEvent.click(ascDesc);
                 userEvent.click(orderBtn);
                  }) 
})
