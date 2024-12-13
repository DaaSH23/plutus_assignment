> This is a boilerplate template developed by Plutus Labs Inc.

# Plutus Developer Audition

This is a repository containing a template for a Plutus Developer Audition. We don't believe in DSA interviews—what matters is your ability to write real-world code. This project is designed to be a test of that. It should not take you more than a couple of hours to implement everything. (Using AI code helpers is allowed, as long as you check the code and don't copy-paste blindly.) We are a fast-paced team, and this project mimics the real-world situation that you'll be in on a day-to-day basis. This project can also help you develop your CV, even if you don't end up working with us.

## How it works

The hiring process for us is simple:
- You fork this repository and develop a Next.js solution.
- We hop on a call and discuss your solution—why you used a certain approach, potential alternatives, etc.
- We review internally and provide feedback on your solution.

## Prerequisites

You need to know the following tools and languages to work with this:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Problem statement

You need to implement a website to show population data from the World Bank API. We provide documentation for the design and the API to use below. There are three pages that you need to implement: `Home`, `Population`, and `About`. We provide a design for `Home` and `Population`. You can be creative with the About section (it's for you; the About page won't be evaluated).

### Layout

- [ ] Use a layout to show the sidebar.
- [ ] The sidebar should be fixed at the side of the screen.
- [ ] Initialize anything that you may need.

### Home

- [ ] Implement the design for the Home page.
- [ ] Fetch the data from the API.
- [ ] Store the API data in the store.

### Population

- [ ] Implement the design for the Population page.
- [ ] Fetch the data from the API.
- [ ] Store the API data in the store.
- [ ] Implement the interactions for the user to play around with data and graphs.

## Design

Below is the design that you need to implement:

[Link to Figma](https://www.figma.com/design/2sjwN6l1ZBj9nPuG40mAOu/Plutus-Hire-Audition-Design?node-id=0-1&t=2puEYrpAgTWv4Vec-1)

## API Documentation for World Bank API

The World Bank API provides access to a wide range of global data, including population statistics. This documentation covers how to fetch population-related data using the API and includes examples for various use cases.

<details>
  <summary>API Documentation with examples</summary>

### Base API Endpoint

The base URL for querying the World Bank API is:

```
https://api.worldbank.org/v2/
```

### Key Parameters

- **country**: Specifies the country or region. You can use country codes (e.g., `WLD` for world, `IND` for India). Multiple countries can be queried by separating the codes with a semicolon (`;`).
- **indicator**: Specifies the type of data. For example, `SP.POP.TOTL` represents total population.
- **date**: Defines the range of years for the data. You can use a single year (e.g., `2023`) or a range of years (e.g., `1960:2023`).
- **format**: Specifies the format of the response. Available options are `json` and `xml`.
- **per_page**: Limits the number of records per page (default: 50). You can increase this value to return more data in one request.
- **sort**: Allows sorting the data by date or value.

### Example Queries
- **Fetch World Population Over the Years**:

```
https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?date=1960:2023&format=json
```

- **Fetch Population for Multiple Countries** (China, India, USA, Indonesia, and Pakistan):

```
https://api.worldbank.org/v2/country/CHN;IND;USA;IDN;PAK/indicator/SP.POP.TOTL?date=1960:2023&format=json
```


- **Fetch Population Density Over the Years**:

```
https://api.worldbank.org/v2/country/WLD/indicator/EN.POP.DNST?date=1960:2023&format=json
```


- **Fetch Urban Population Over the Years**:

```
https://api.worldbank.org/v2/country/WLD/indicator/SP.URB.TOTL?date=1960:2023&format=json
```


- **Fetch Population Growth Rate Over the Years**:

```
https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.GROW?date=1960:2023&format=json
```


### Advanced Querying

- **Paging**: By default, the API returns 50 records per page. To fetch more or fewer records, use the `per_page` parameter.
  
  Example: Fetch 100 results per page:
```
https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?date=1960:2023&format=json&per_page=100
```

- **Sorting**: You can sort the results by date (year) or value.

Example: Sort population data in descending order by year:

```
https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?date=1960:2023&format=json&per_page=100&sort=date:desc
```

</details>


## Getting Started with the Project

First, run the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

