![example workflow](https://github.com/techequitycollaborative/tenantprotections2/actions/workflows/e2e_tests.yml/badge.svg)

# Tenant Protections 2

This project is an effort to help Californians figure out whether the Tenant Protection Act of 2019 will protect them from excessive rent increases.

Most renters will be affected, but our goal is to help them answer that question using publicly available data based on their address.

[Text of the bill](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1482)

[Read more about it](https://www.latimes.com/california/story/2019-08-30/california-rent-increases-cap-newsom-housing-crisis)

This project, originally titled "Rent Cap", was started during the 2019 National Day of Civic Hacking through the [Code for SF](https://codeforsanfrancisco.org/) brigade. The original team did a fantastic job in setting up a great website.

This repository, a fork of the original Rent Cap project, will attempt to bring it up to date and add additional features. This project is being sponsored by [TechEquity Collaborative](https://techequitycollaborative.org/), a non-profit dedicated to tackling economic inequities in tech and with tech.

## Contributing

Contributions are always welcome. For larger contributions, feel free to get in touch with TechEquity Collaborative first so a member of the team can work with you to ensure things roll out as smooth as possible.

## Development

### Quickstart

This guide assumes the usage of **MacOS**, and is intended as a quickstart for beginners with only a passing familiarity in command line and tooling or for experienced devs wanting to jump in as fast as possible. Therefore it is opinionated on what tooling to use. Feel free to use your own set up and tooling if you prefer.

#### Homebrew

If you don’t have Homebrew, install it by following the instructions [in this link](https://brew.sh/).

#### Git

To get an updated version of `git`, install it via Homebrew by running the following command in your terminal.

    brew install git

#### Node

Currently, the site runs on Node 14. Install node via the `n` package manager. This package will allow you to cleanly manage multiple Node installations on your machine. The instructions below will set you up with Node 14, but `n` provides more features. Check out [their documentation](https://www.npmjs.com/package/n) for more instructions and options.

    brew install n
    sudo n 14

#### Clone Repo

Clone the repo. Choose a directory that you can access easily. Ensure you are cloning the repo from `techequitycollaborative`, which is forked from the (now unmaintained) original, and not the original itself.

    git clone https://github.com/techequitycollaborative/tenantprotections2

If you wish to clone via SSH (this is recommended), make sure to set up your SSH keys. GitHub has [a guide](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for it.

Once set up, you can clone via SSH (this allows you to perform GitHub actions without entering your password). It requires a different clone command, shown below.

    git clone git@github.com:techequitycollaborative/tenantprotections2.git

#### Build

Navigate into the tenantprotections2 folder:

    npm install
    npm run build

#### Run

The site is built via the Gatbsy framework, which provides the abilty to run the website on your local machine for testing. To see a local version of your site, run:

    npm run develop

The command will continuously run in your terminal. Navigate to `localhost:8000` in your browser to see the website running.

### Testing

This project follows the [Gatsby guide on testing](https://www.gatsbyjs.com/docs/how-to/testing/).

#### Cypress E2E Testing

This project follows the [Gatsby guide on Cypress](https://www.gatsbyjs.com/docs/how-to/testing/end-to-end-testing/) as well as the [Cypress Getting Started docs](https://docs.cypress.io/guides/getting-started/writing-your-first-test).

## Acknowledgments

A big thank you to Kyle Peacock, Herman Borrego, and other members of the [Code for SF](https://codeforsanfrancisco.org/) brigade for the amazing work on the original website.
