# ALICE Bio-Platform

Bioinformatics simulation platform with molecular screening, protein prediction, and energy analysis.

## Architecture

```
Frontend (Next.js 15)       API Gateway (port 8081)
  /dashboard/console   →    POST /api/v1/bio/simulate
  /                         POST /api/v1/bio/screen
                            POST /api/v1/bio/predict
                            POST /api/v1/bio/energy
                            GET  /api/v1/stats
                                 │
               ┌─────────────────┼──────────────────┐
               ▼                 ▼                  ▼
        MD Engine          Docking Engine     QM Engine
    (AMBER / CHARMM)    (AutoDock-Vina GPU)  (DFT / 6-31G*)
               │                 │
        Job Queue (async)   AlphaFold3 Service
               │
        Time-Series Results DB
```

## Features

| Feature | Description |
|---------|-------------|
| Molecular Dynamics | AMBER99SB / CHARMM force-field simulations |
| Virtual Screening | GPU-accelerated docking against target proteins |
| Structure Prediction | AlphaFold3 secondary and tertiary structure |
| Quantum Energy | DFT single-point / gradient with COSMO solvation |
| Pipeline Orchestration | Chain steps into automated discovery pipelines |
| Scalable Compute | Burst to HPC / cloud GPU on demand |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check |
| GET | /api/v1/stats | Platform-wide statistics |
| POST | /api/v1/bio/simulate | Run molecular dynamics simulation |
| POST | /api/v1/bio/screen | Virtual screening against a target |
| POST | /api/v1/bio/predict | Protein structure prediction |
| POST | /api/v1/bio/energy | Quantum energy calculation |

### POST /api/v1/bio/simulate

```json
{
  "molecule": "ATP",
  "simulation_type": "molecular_dynamics",
  "timesteps": 10000,
  "temperature_k": 310,
  "solvent": "water",
  "force_field": "AMBER99SB"
}
```

### POST /api/v1/bio/screen

```json
{
  "target_protein": "ACE2",
  "library": "FDA-approved",
  "top_k": 20,
  "docking_algorithm": "AutoDock-Vina",
  "binding_threshold_kcal": -8.0
}
```

### POST /api/v1/bio/predict

```json
{
  "sequence": "MKTAYIAKQR...",
  "task": "secondary_structure",
  "model": "AlphaFold3"
}
```

### POST /api/v1/bio/energy

```json
{
  "molecule_id": "mol-0042",
  "method": "DFT",
  "basis_set": "6-31G*",
  "compute_gradient": true,
  "solvation_model": "COSMO"
}
```

## Quick Start

```bash
docker compose up -d
# API:      http://localhost:8081
# Frontend: http://localhost:3000
```

## License

AGPL-3.0-or-later
