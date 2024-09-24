# Rabies Vaccination Location Finder

![App Demo](public/find-rabies-vaccine-gyn.gif)

# English

## Description

This web application aims to simplify the process of finding vaccination points for pets in Goiânia, Brazil, specifically for the anti-rabies vaccination campaign. Each year, finding vaccination locations can be challenging due to disorganized information provided by local authorities. This application utilizes your location to list nearby vaccination points, allowing you to easily find where to take your pet without the hassle of outdated documents.

## Technologies Used
- **Next.js**: A React framework for building server-side rendered applications.
- **React Leaflet**: A library for integrating Leaflet maps into React applications.
- **OpenRouteService API**: For calculating distances and generating routes.
- **Material-UI**: A React UI framework for building responsive web applications.
- **Vercel**: For deploying the application.

## How It Works
1. The application requests your current location using the browser's Geolocation API.
2. It fetches vaccination point data and calculates distances to each point using OpenRouteService.
3. The results are displayed in a list and on an interactive map.
4. Users can click on a vaccination point to open the directions in Google Maps.

## Installation
To run this project locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/rabies-vaccination-location-finder.git
cd rabies-vaccination-location-finder
npm install
```

## Running the Application
To start the development server, run:
```bash
npm run dev
```
Navigate to http://localhost:3000 in your browser.

## Deployment
This application is deployed on Vercel and can be accessed [here](https://rabies-vaccine-location-finder-gyn.vercel.app/).

## Contribution
Feel free to fork the repository and make contributions. Any feedback or suggestions are welcome!

## License
This project is licensed under the MIT License.

---

# Português

## Descrição

Esta aplicação web tem como objetivo simplificar o processo de encontrar pontos de vacinação para pets em Goiânia, Brasil, especificamente para a campanha de vacinação antirrábica. Todo ano, encontrar os locais de vacinação pode ser desafiador devido à desorganização das informações fornecidas pelas autoridades locais. Esta aplicação utiliza sua localização para listar os pontos de vacinação próximos, permitindo que você encontre facilmente onde levar seu pet, sem a dificuldade de documentos desatualizados.

## Technologies Used
- **Next.js**: Um framework React para construir aplicações renderizadas no servidor.
- **React Leaflet**: Uma biblioteca para integrar mapas Leaflet em aplicações React.
- **OpenRouteService API**: Para calcular distâncias e gerar rotas.
- **Material-UI**: Um framework UI React para construir aplicações web responsivas.
- **Vercel**: Para fazer o deploy da aplicação.

## How It Works
1. A aplicação solicita sua localização atual usando a API de Geolocalização do navegador.
2. Ela busca dados dos pontos de vacinação e calcula as distâncias para cada ponto usando o OpenRouteService.
3. Os resultados são exibidos em uma lista e em um mapa interativo.
4. Os usuários podem clicar em um ponto de vacinação para abrir as direções no Google Maps.

## Instalação
Para rodar este projeto localmente, clone o repositório e instale as dependências:

```bash
git clone https://github.com/yourusername/rabies-vaccination-location-finder.git
cd rabies-vaccination-location-finder
npm install
```

## Executando a Aplicação
Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```
Acesse http://localhost:3000 em seu navegador.

## Deploy
Esta aplicação está hospedada no Vercel e pode ser acessada [aqui](https://rabies-vaccine-location-finder-gyn.vercel.app/).

## Contribuição
Sinta-se à vontade para bifurcar o repositório e fazer contribuições. Qualquer feedback ou sugestão é bem-vindo!

## License
Este projeto está licenciado sob a Licença MIT.

