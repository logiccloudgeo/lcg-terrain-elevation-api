# Verification

The default automated suite uses a deterministic provider and does not consume live USGS capacity.

It covers:

- request validation;
- coordinate ordering;
- duplicate identifiers;
- batch and request-body limits;
- provider no-data handling;
- elevation unit conversion;
- single and bulk API contracts;
- browser routes and static assets;
- notebook download allowlisting;
- notebook JSON validity; and
- synthetic Florida sample data.

## Local verification

From an activated Python 3.12 environment:

```powershell
python -m ruff check .
python -m pytest -m "not integration"
python -m mkdocs build --strict
```

The initial clean public-repository baseline contains 36 passing offline tests and one intentionally deselected live integration test.

A dependency-owned FastAPI/Starlette test-client deprecation warning may appear. It does not indicate an application test failure.

## Live-provider test

The live test is deliberately opt-in:

```powershell
$env:RUN_LIVE_USGS_TESTS = "1"
python -m pytest -m integration
```

It submits a limited request for a Tallahassee-area coordinate and checks for a finite, plausible result. This is a connectivity smoke test, not an elevation-accuracy benchmark.

Remove the temporary environment variable afterward:

```powershell
Remove-Item Env:RUN_LIVE_USGS_TESTS
```

## Public service checks

The following routes provide non-destructive operational checks:

```text
https://api.logiccloudgeo.com/health
https://api.logiccloudgeo.com/docs
https://api.logiccloudgeo.com/elevation/demo
```

The health route verifies that the FastAPI process is available without querying the upstream elevation provider. An elevation request additionally exercises the provider path.