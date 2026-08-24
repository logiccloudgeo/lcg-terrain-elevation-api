# Logic Cloud Geo Terrain Elevation API

A public FastAPI service for retrieving USGS 3D Elevation Program (3DEP) bare-earth elevations for one WGS 84 coordinate or an ordered list of keyed points.

The project includes:

- single-point and bulk JSON endpoints;
- source and reference metadata in API responses;
- deterministic tests that do not contact USGS by default;
- a MapLibre point and line demonstration;
- reviewed Jupyter notebooks;
- synthetic Florida sample data; and
- documentation for Python, browser, and ArcGIS Pro clients.

## Live service

- Service home: <https://api.logiccloudgeo.com/>
- Terrain demonstration: <https://api.logiccloudgeo.com/elevation/demo>
- Interactive OpenAPI documentation: <https://api.logiccloudgeo.com/docs>
- Health check: <https://api.logiccloudgeo.com/health>

## Appropriate use

Inputs are WGS 84 geographic coordinates in decimal degrees:

- `longitude`: x-coordinate in EPSG:4326
- `latitude`: y-coordinate in EPSG:4326

Returned elevations are samples from an approximately 10-meter bare-earth DEM. They are not surveyed benchmarks and should not be represented as survey-grade elevations.

## API endpoints

### Single point

```http
GET /api/v1/elevation
```

Example:

```powershell
Invoke-RestMethod `
  -Uri "https://api.logiccloudgeo.com/api/v1/elevation?latitude=30.4383&longitude=-84.2807&units=feet"
```

### Ordered point list

```http
POST /api/v1/elevations
Content-Type: application/json
```

The bulk endpoint accepts uniquely keyed points, preserves request order, and supports GIS joins and topographic-profile workflows.

## Local development

Use Python 3.12 in an isolated environment:

```powershell
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -e ".[dev,docs,notebooks]"
```

Start the API:

```powershell
python -m uvicorn app.main:app --reload
```

Open:

- <http://127.0.0.1:8000/>
- <http://127.0.0.1:8000/elevation/demo>
- <http://127.0.0.1:8000/docs>

## Verification

Run the deterministic checks without contacting the live elevation provider:

```powershell
python -m ruff check .
python -m pytest -m "not integration"
python -m mkdocs build --strict
```

The live provider test is deliberately opt-in and should be used sparingly:

```powershell
$env:RUN_LIVE_USGS_TESTS = "1"
python -m pytest -m integration
```

## Jupyter notebooks

The repository includes:

- `notebooks/elevation_api_examples.ipynb`: single-coordinate and keyed-list examples;
- `notebooks/topographic_profile.ipynb`: ordered point input, geodesic distance, batching, plotting, and exports.

Start JupyterLab from the repository root:

```powershell
python -m jupyter lab
```

## Project structure

```text
app/          FastAPI application and browser interface
docs/         Public user and developer documentation
notebooks/    Reviewed instructional notebooks
sample_data/  Synthetic request and profile inputs
tests/        Deterministic and opt-in integration tests
```

## Deployment boundary

This public repository contains the application, container definition, tests, examples, and continuous-integration workflow. Cloud-account configuration, resource identifiers, credentials, DNS procedures, and operational deployment runbooks are maintained separately.

No credentials or private datasets should be committed to this repository.

## License and attribution

The software and documentation in this repository are licensed under the MIT License. See `LICENSE`.

Elevation values are derived from USGS 3DEP data through the Py3DEP/HyRiver software ecosystem. Source attribution does not imply endorsement by the U.S. Geological Survey.