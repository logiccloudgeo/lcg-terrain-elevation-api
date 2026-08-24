# Elevation API examples notebook

The compact examples notebook demonstrates the two primary API request patterns.

Notebook:

```text
notebooks/elevation_api_examples.ipynb
```

## Workflows demonstrated

1. Submit one WGS 84 latitude and longitude.
2. Review the returned elevation and source metadata.
3. Submit an ordered list of uniquely keyed points.
4. Preserve each user-supplied `db_key`.
5. Join results back to the original table.
6. Export reviewed results to CSV.

## Start the notebook

From the repository root and an activated Python 3.12 environment:

```powershell
python -m pip install -e ".[notebooks]"
python -m jupyter lab
```

Open:

```text
notebooks/elevation_api_examples.ipynb
```

Confirm that the selected kernel belongs to the repository’s `.venv`.

## Service URL

The reviewed public endpoint is:

```text
https://api.logiccloudgeo.com
```

Users may change the notebook configuration to `http://127.0.0.1:8000` when running the API locally.

## Coordinate convention

Requests use named fields:

- `longitude`: EPSG:4326 x-coordinate
- `latitude`: EPSG:4326 y-coordinate

Named fields prevent the ambiguity that can occur with positional coordinate pairs.

## Data interpretation

The returned elevation is a DEM sample, not a surveyed benchmark. Preserve the response metadata and review `status`, `elevation`, units, source, resolution, horizontal reference, and vertical reference before using the result.