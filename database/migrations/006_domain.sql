-- ALICE Bio Platform: Domain-specific tables
CREATE TABLE IF NOT EXISTS bio_simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    molecule_name TEXT NOT NULL,
    atom_count INTEGER NOT NULL DEFAULT 0,
    force_field TEXT NOT NULL DEFAULT 'amber' CHECK (force_field IN ('amber', 'charmm', 'opls', 'sdf-field')),
    timestep_fs DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    total_steps BIGINT NOT NULL DEFAULT 0,
    total_energy DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    elapsed_ms BIGINT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('queued', 'running', 'completed', 'failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS drug_screenings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    target_protein TEXT NOT NULL,
    compounds_screened INTEGER NOT NULL DEFAULT 0,
    hits_found INTEGER NOT NULL DEFAULT 0,
    hit_rate DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    best_affinity DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    screening_method TEXT NOT NULL DEFAULT 'sdf-dock' CHECK (screening_method IN ('sdf-dock', 'pharmacophore', 'shape-similarity', 'ml-score')),
    elapsed_ms BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS structure_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    sequence_length INTEGER NOT NULL DEFAULT 0,
    prediction_method TEXT NOT NULL DEFAULT 'sdf-fold' CHECK (prediction_method IN ('sdf-fold', 'homology', 'ab-initio', 'hybrid')),
    confidence DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    rmsd DOUBLE PRECISION,
    domain_count INTEGER NOT NULL DEFAULT 0,
    secondary_structure TEXT,
    elapsed_ms BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_bio_simulations_user ON bio_simulations(user_id, created_at);
CREATE INDEX idx_drug_screenings_user ON drug_screenings(user_id, created_at);
CREATE INDEX idx_drug_screenings_target ON drug_screenings(target_protein);
CREATE INDEX idx_structure_predictions_user ON structure_predictions(user_id, created_at);
