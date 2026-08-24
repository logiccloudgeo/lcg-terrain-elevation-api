# Logic Cloud Geo Terrain Elevation API

The Logic Cloud Geo Terrain Elevation API provides a focused HTTP interface for retrieving bare-earth elevations from the USGS 3D Elevation Program.

It is intended for:

- browser maps;
- Python applications;
- Jupyter notebooks;
- ArcGIS Pro geoprocessing tools; and
- other clients capable of sending standard HTTPS requests.

## Current capabilities

- Single-point elevation requests
- Ordered bulk requests with stable `db_key` identifiers
- WGS 84 longitude and latitude inputs
- Meters or international feet
- Source and reference metadata
- Configurable batch, timeout, retry, and concurrency controls
- Deterministic offline tests
- Opt-in live-provider verification
- MapLibre point and line demonstration
- Reviewed instructional notebooks

!!! warning "Appropriate use"
    Returned values are samples from an approximately 10-meter bare-earth DEM. They are not surveyed benchmarks and should not be represented as survey-grade elevations.

## Public service

- Service home: <https://api.logiccloudgeo.com/>
- Map demonstration: <https://api.logiccloudgeo.com/elevation/demo>
- OpenAPI documentation: <https://api.logiccloudgeo.com/docs>
- Health check: <https://api.logiccloudgeo.com/health>

## Public source

The application, tests, examples, and notebooks are maintained at:

<https://github.com/logiccloudgeo/lcg-terrain-elevation-api>

Operational cloud infrastructure and private deployment runbooks are intentionally outside the public repository.