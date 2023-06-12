<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Web Components for Knowledge Graphs 

![REUSE Compliance](https://github.com/noi-techpark/webcomp-kg/actions/workflows/reuse.yml/badge.svg)
[![REUSE status](https://api.reuse.software/badge/github.com/noi-techpark/webcomp-kg)](https://api.reuse.software/info/github.com/noi-techpark/webcomp-kg)
[![CI/CD](https://github.com/noi-techpark/webcomp-kg/actions/workflows/main.yml/badge.svg)](https://github.com/noi-techpark/webcomp-kg/actions/workflows/main.yml)

This project is a webcomponent for Knowledge Graphs displaying data starting from a SPARQL endpoint.

The demo shows how we can display the data obtained from the [Open Data Hub SPARQL endpoint](https://sparql.opendatahub.bz.it/)
in three different formats: gallery, map and table.

Live Demo available on our Web Component Store: <https://webcomponents.opendatahub.bz.it/webcomponent/567cb2e2-3e5d-421a-bf85-b8ecc500aab9>


## Table of contents

- [Usage](#usage)
- [Gettings started](#getting-started)
- [Tests and linting](#tests-and-linting)
- [Deployment](#deployment)
- [Docker environment](#docker-environment)
- [Information](#information)

## Usage

Include the webcompscript files `webcomp-kg.js` in your HTML and define the web components like below. 
A Web Component `<kg-widget>` with three visualizations (map, table, and image gallery) is defined. 

```html
<body>
<head>
  <title>Example Web Components for Knowledge Graphs</title>
  <script src="webcomp-kg.js"></script>
</head>
<kg-widget view="map" endpoint='https://sparql.opendatahub.bz.it/sparql' query="PREFIX schema: <http://schema.org/>
    PREFIX geo: <http://www.opengis.net/ont/geosparql#>
    SELECT ?h ?pos ?posLabel ?posColor
    WHERE {
    ?h a schema:LodgingBusiness ;
       geo:hasGeometry/geo:asWKT ?pos ;
       schema:name ?posLabel .
  FILTER (lang(?posLabel) = 'de')
  # Colors
  OPTIONAL {
  ?h a schema:Campground .
  BIND('chlorophyll,0.5' AS ?posColor) # Green
  }
  OPTIONAL {
  ?h a schema:BedAndBreakfast .
  BIND('viridis,0.1' AS ?posColor) # Purple
  }
  OPTIONAL {
  ?h a schema:Hotel .
  BIND('jet,0.3' AS ?posColor) # Light blue
  }
  OPTIONAL {
  ?h a schema:Hostel .
  BIND('jet,0.8' AS ?posColor) # Red
  }
  }
  LIMIT 500"
>
</kg-widget>
</body>
```



### Attributes

#### view

View

Type: string

Possible values: 'map', 'table', 'gallery'

#### endpoint

The SPARQL endpoint

Type: string


#### query

The SPARQL query

Type: string

###Special features
It is possible to personalize the pointers on the map
using colors or custom icons as shown in the example for kg-map.

You can run and test SPARQL queries on the endpoint at the [Open Data Hub Knowledge Graph Portal
](https://sparql.opendatahub.bz.it/).

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 12 

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
git clone https://github.com/noi-techpark/webcomp-kg.git
```

Change directory:

```bash
cd webcomp-kg/
```

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

Build and start the project:

```bash
npm run start
```
The application will be served and can be accessed at http://localhost:4200.

## Linting

The linting can be executed with the following command:

```bash
npm run lint
```

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

Then you can see the examples and the webcomponent script at the `example` directory.

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Dependenices

First, install all dependencies:

```bash
docker-compose run --rm app /bin/bash -c "npm install"
```

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose run --rm app /bin/bash -c "..."
```

Some examples are:

```bash
docker-compose run --rm app /bin/bash -c "npm run build"
```

## Information

### Support

For support, please contact [info@opendatahub.com](mailto:info@opendatahub.com).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `development` branch.

- Make sure the tests are passing.

- Create a pull request against the `development` branch.

A more detailed description can be found here: [https://github.com/noi-techpark/documentation/blob/master/contributors.md](https://github.com/noi-techpark/documentation/blob/master/contributors.md).

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the AGPL 3 license. See the [LICENSE.md](LICENSE.md) file for more information.

### REUSE

This project is [REUSE](https://reuse.software) compliant, more information about the usage of REUSE in NOI Techpark repositories can be found [here](https://github.com/noi-techpark/odh-docs/wiki/Guidelines-for-developers-and-licenses#guidelines-for-contributors-and-new-developers).

Since the CI for this project checks for REUSE compliance you might find it useful to use a pre-commit hook checking for REUSE compliance locally. The [pre-commit-config](.pre-commit-config.yaml) file in the repository root is already configured to check for REUSE compliance with help of the [pre-commit](https://pre-commit.com) tool.

Install the tool by running:
```bash
pip install pre-commit
```
Then install the pre-commit hook via the config file by running:
```bash
pre-commit install
```

