#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / "artifacts/gravity/hcsa_full_text_claim_boundary_packet_2026_05_22.json"
DOC = ROOT / "docs/status/HCSA_FULL_TEXT_CLAIM_BOUNDARY_PACKET_2026_05_22.md"
STATUS = "HCSA_FULL_TEXT_CLAIM_BOUNDARY_ONLY_NO_VALIDATION"

BOUNDARIES = {
    "dark matter resolution",
    "dark energy resolution",
    "CMB anomaly resolution",
    "DFM-MKC validation",
    "QICT validation",
    "Lambda-CDM failure",
    "modified gravity failure",
    "gravity closure",
    "empirical validation",
    "P vs NP",
    "any Clay problem",
}

CLAIMS = {
    "deterministic resolution of dark matter",
    "deterministic resolution of dark energy",
    "deterministic resolution of CMB anomalies",
    "informational pressure as replacement explanation for dark matter and dark energy",
    "Hendeca-Tier Cosmic Signal Architecture as deterministic cosmic operating system",
    "10^66 total informational pressure coefficient",
    "10^6 hierarchical scaling coefficient",
    "10^300 source information density",
    "10^120 observable-universe physical capacity",
    "2.725 K CMB temperature derivation claim",
}

assert ARTIFACT.exists(), f"Missing artifact: {ARTIFACT}"
assert DOC.exists(), f"Missing doc: {DOC}"

data = json.loads(ARTIFACT.read_text(encoding="utf-8"))
doc = DOC.read_text(encoding="utf-8")
baseline = data.get("baseline_reference", {})

assert data.get("id") == "HCSA_FULL_TEXT_CLAIM_BOUNDARY_PACKET", "Bad id"
assert data.get("status") == STATUS, "Bad status"
assert data.get("verification_target") == STATUS, "Bad verification target"
assert data.get("source_class") == "ssrn_preprint_full_text", "Bad source_class"
assert data.get("internal_object") == "no_overclaim_boundary", "Bad internal_object"
assert data.get("claim_classification") == "speculative_external_cosmology_claim", "Bad claim_classification"
assert set(data.get("does_not_prove", [])) == BOUNDARIES, "Bad does_not_prove set"
assert set(data.get("content_claims_recorded", [])) == CLAIMS, "Bad recorded claims set"
assert baseline.get("key") == "lambda_cdm_model_wikipedia_reference", "Bad baseline key"
assert baseline.get("source_class") == "encyclopedic_reference", "Bad baseline source_class"
assert baseline.get("claim_status") == "baseline_reference_only_no_failure_claim", "Bad baseline claim_status"
assert baseline.get("url") == "https://en.wikipedia.org/wiki/Lambda-CDM_model", "Bad baseline URL"
assert "lambda_cdm_model_wikipedia_reference" in doc, "Doc missing Lambda-CDM baseline reference"
assert "baseline_reference_only_no_failure_claim" in doc, "Doc missing baseline status"
assert STATUS in doc, "Doc missing status"
assert all(boundary in doc for boundary in BOUNDARIES), "Doc missing boundary"
assert all(claim in doc for claim in CLAIMS), "Doc missing claim"

print("HCSA full-text claim-boundary packet verification OK.")
print(f"Status: {STATUS}")
