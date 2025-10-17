# JsonUtil

JsonUtil is an open‑source, healthcare‑grade framework for dynamic form generation, JSON Schema validation, and interoperable data exchange across EHR ecosystems. It renders production‑ready forms from schemas and templates, validates payloads in real time, and moves data securely between standards such as OpenEHR and HL7 FHIR—without vendor lock‑in.

**License:** MIT  
**Status:** Actively maintained  
**Targets:** Hospitals, clinics, digital health vendors, researchers, and developers building regulated clinical workflows

---

## Table of Contents

- [Key Features](#key-features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Production Checklist](#production-checklist)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Community & Support](#community--support)
- [Citation](#citation)

---

## Key Features

### Dynamic Form Generation
- Render functional UIs directly from JSON Schemas and clinical templates (intake, specialty assessments, discharge)
- Support for conditional logic, defaults, computed fields, and multilingual labels
- Healthcare-optimized field types for demographics, medications, diagnoses, and assessments

### Real-time Validation
- High-throughput JSON validation (17,000 ops/sec) with strict modes and healthcare rules
- Pluggable terminology hooks for SNOMED CT, ICD-10, LOINC
- Clinical decision support integration with evidence-based validation rules

### Secure CRUD Pipeline
- Header-controlled operations (`X-Operation`, `X-Schema`, `X-Username`, `X-API-Key`)
- Fine-grained RBAC/ABAC with least-privilege evaluation
- Immutable audit trails with blockchain-inspired tamper detection
- Field-level encryption (AES-256) for PHI protection

### Interoperability by Design
- Native OpenEHR archetype/template processing
- HL7 FHIR R4/R5 resource support
- HTTP/webhooks/JSON file adapters for legacy systems
- Real-time bi-directional synchronization

### Compliance & Observability
- HIPAA-ready with 99% compliance across administrative/technical/physical safeguards
- MFA-ready authentication integration
- WORM-style audit logs for regulatory requirements
- Structured metrics and request tracing for operations teams

### Flexible Deployment
- Runs in containers/VMs/bare metal
- Supports PostgreSQL/MongoDB/MySQL
- Horizontal scaling with load balancing
- Cloud-ready for AWS/Azure/GCP healthcare environments

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Data Sources                            │
│  (JSON Files, OpenEHR/FHIR/ISO13606, HTTP, WebHooks)        │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   Frontend Layer                            │
│  • Credential Check    • RBAC    • Form Preview             │
│  • JSON Content Validation       • HTML Schema Rendering    │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              RESTful API Framework                          │
│  • API Gateway        • Rate Limiting                       │
│  • Authentication     • Authorization                       │
│  • Endpoints: /v1/forms, /api/v1/schemas, /api/v1/audit     │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  Backend Services                           │
│  • Dynamic Form Generation Engine                           │
│  • CRUD Operations Handler                                  │
│  • Data Persistence Layer                                   │
│  • OpenEHR/FHIR Connectors                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│           Cross-Cutting Security Layer                      │
│  • Audit Trails    • HIPAA Compliance    • Encryption       │
│  • Access Control  • Threat Detection                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                 Data Synchronization                        │
│  (JSON Files, OpenEHR/FHIR/ISO13606, HTTP, WebHooks)        │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites
- **Runtime:** Node.js 18+ (or Python 3.10+ for Python services)
- **Container:** Docker & Docker Compose (recommended)
- **Database:** PostgreSQL 14+, MongoDB 6+, or MySQL 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jsonutil.git
cd jsonutil

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Set database URL, encryption keys, and API secrets

# Start with Docker Compose (recommended)
docker compose up -d

# OR start manually
npm install
npm run migrate
npm start
```

### Verify Installation

```bash
# Health check
curl http://localhost:8080/health

# View example form
curl -H 'X-Operation: view' \
     -H 'X-Schema: patient-intake' \
     http://localhost:8080/api/v1/forms/example

# Validate schema
curl -X POST http://localhost:8080/api/v1/schemas/validate \
     -H 'Content-Type: application/json' \
     -d @examples/schemas/patient-intake.json
```

---

## Usage

### 1. Create or Import Schema

```bash
# Use example schemas
cp examples/schemas/patient-intake.json schemas/

# Or create your own JSON Schema
cat > schemas/custom-form.json <<EOF
{
  "type": "object",
  "properties": {
    "patientId": { "type": "string" },
    "symptoms": { "type": "array" }
  },
  "required": ["patientId"]
}
EOF
```

### 2. Validate Schema

```bash
curl -X POST http://localhost:8080/api/v1/schemas/validate \
     -H 'Content-Type: application/json' \
     -d @schemas/custom-form.json
```

### 3. Generate Form

```bash
# View-only form
curl -H 'X-Operation: view' \
     -H 'X-Schema: custom-form' \
     http://localhost:8080/v1/forms/view

# Editable form
curl -H 'X-Operation: edit' \
     -H 'X-Schema: custom-form' \
     -H 'X-Username: dr.smith' \
     http://localhost:8080/v1/forms/edit
```

### 4. Submit Data

```bash
curl -X POST http://localhost:8080/api/v1/data \
     -H 'X-Operation: create' \
     -H 'X-Schema: custom-form' \
     -H 'X-Username: dr.smith' \
     -H 'X-API-Key: your-api-key' \
     -H 'Content-Type: application/json' \
     -d '{"patientId": "PT12345", "symptoms": ["fever", "cough"]}'
```

### 5. Enable Interoperability

```bash
# Configure OpenEHR connection
cat > config/interop/openehr.yml <<EOF
endpoint: https://your-openehr-server/rest/v1
credentials: ${OPENEHR_API_KEY}
archetypes:
  - openEHR-EHR-OBSERVATION.blood_pressure.v2
EOF

# Configure FHIR connection
cat > config/interop/fhir.yml <<EOF
baseUrl: https://your-fhir-server/fhir
version: R4
resources:
  - Patient
  - Observation
EOF
```

---

## Configuration

### Security Settings

```env
# JWT Authentication
JWT_ISSUER=https://your-auth-server
JWKS_URI=https://your-auth-server/.well-known/jwks.json

# Multi-Factor Authentication
MFA_PROVIDER=totp
MFA_ISSUER=JsonUtil

# Field-Level Encryption
ENCRYPTION_ALGORITHM=aes-256-gcm
ENCRYPTION_KEY=your-256-bit-key-here
HSM_ENABLED=false
```

### Access Control

```yaml
# config/rbac/roles.yml
roles:
  physician:
    permissions:
      - forms:read
      - forms:write
      - data:create
      - data:update
      - audit:read
  
  nurse:
    permissions:
      - forms:read
      - data:create
      - data:read
  
  admin:
    permissions:
      - "*"
```

### Database Configuration

```env
# PostgreSQL (recommended for production)
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jsonutil
DB_USER=jsonutil_user
DB_PASSWORD=secure_password
DB_SSL=true

# MongoDB (alternative)
DB_TYPE=mongodb
DB_URI=mongodb://localhost:27017/jsonutil

# MySQL (alternative)
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=jsonutil
```

### Observability

```yaml
# config/telemetry/metrics.yml
metrics:
  enabled: true
  provider: prometheus
  endpoint: /metrics
  
tracing:
  enabled: true
  provider: opentelemetry
  exporters:
    - jaeger
    - zipkin
```

---

## Examples

### Patient Intake Form

```json
{
  "type": "object",
  "title": "Patient Intake Form",
  "properties": {
    "demographics": {
      "type": "object",
      "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "dateOfBirth": { "type": "string", "format": "date" },
        "gender": { 
          "type": "string",
          "enum": ["male", "female", "other", "prefer-not-to-say"]
        }
      },
      "required": ["firstName", "lastName", "dateOfBirth"]
    },
    "chiefComplaint": {
      "type": "string",
      "minLength": 10,
      "maxLength": 500
    },
    "allergies": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "allergen": { "type": "string" },
          "reaction": { "type": "string" },
          "severity": {
            "type": "string",
            "enum": ["mild", "moderate", "severe"]
          }
        }
      }
    }
  }
}
```

### Medication Order Form

See `examples/forms/medication-order.json`

### Discharge Summary

See `examples/forms/discharge-summary.json`

### OpenEHR Integration

See `examples/interop/openehr-blood-pressure.json`

### FHIR Integration

See `examples/interop/fhir-observation.json`

---

## Production Checklist

### Security
- [ ] Rotate all secrets and API keys
- [ ] Configure HSM/KMS for encryption key management
- [ ] Enable TLS 1.3 with valid certificates
- [ ] Configure mTLS for service-to-service communication
- [ ] Set up WAF (Web Application Firewall)
- [ ] Enable rate limiting and DDoS protection
- [ ] Configure IP allowlist/denylist
- [ ] Set up intrusion detection system (IDS)

### Compliance
- [ ] Enable field-level encryption for all PHI
- [ ] Configure immutable audit logging
- [ ] Set up log retention policies (minimum 6 years for HIPAA)
- [ ] Enable comprehensive access logging
- [ ] Configure automated compliance reporting
- [ ] Set up breach detection and notification procedures
- [ ] Conduct security assessment and penetration testing
- [ ] Document Business Associate Agreements (BAAs)

### Infrastructure
- [ ] Run database migrations
- [ ] Configure automated backups (RPO < 1 hour)
- [ ] Set up disaster recovery procedures
- [ ] Enable high availability with load balancing
- [ ] Configure horizontal pod autoscaling
- [ ] Set up health checks and liveness probes
- [ ] Configure resource limits and quotas
- [ ] Enable monitoring and alerting

### Operations
- [ ] Set up centralized logging
- [ ] Configure distributed tracing
- [ ] Enable application performance monitoring
- [ ] Set up on-call rotation and incident response
- [ ] Document runbooks and playbooks
- [ ] Configure automated alerting rules
- [ ] Set up status page and maintenance windows
- [ ] Conduct chaos engineering exercises

### Validation
- [ ] Perform load testing (target: 500+ concurrent users)
- [ ] Conduct security penetration testing
- [ ] Validate HIPAA compliance (aim for 99%+)
- [ ] Test disaster recovery procedures
- [ ] Verify backup and restore procedures
- [ ] Validate audit trail immutability
- [ ] Test failover and redundancy
- [ ] Conduct user acceptance testing with clinical staff

---

## Roadmap

### Q1 2026
- [ ] AI-assisted form authoring with GPT-4 integration
- [ ] Intelligent field suggestions based on clinical context
- [ ] Automated validation rule generation
- [ ] Enhanced natural language processing for clinical notes

### Q2 2026
- [ ] Mobile-first progressive web application
- [ ] Offline-first architecture with conflict resolution
- [ ] Mobile device synchronization
- [ ] Point-of-care data collection optimization

### Q3 2026
- [ ] Expanded terminology services
  - RxNorm medication terminology
  - CPT procedure codes
  - Custom terminology mappings
- [ ] Specialty-specific templates
  - Oncology treatment plans
  - Cardiology assessments
  - Mental health screenings

### Q4 2026
- [ ] Advanced analytics dashboard
- [ ] Machine learning-powered anomaly detection
- [ ] Clinical decision support integration
- [ ] Population health management features

### Future Considerations
- [ ] Blockchain-based audit trails
- [ ] Quantum-resistant encryption
- [ ] Voice-enabled form completion
- [ ] AR/VR interfaces for surgical planning
- [ ] Federated learning for privacy-preserving AI

---

## Contributing

We welcome contributions from the healthcare informatics community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Update documentation
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines
- Follow the coding standards in `CONTRIBUTING.md`
- Write tests for all new features (aim for >80% coverage)
- Update documentation for user-facing changes
- Keep commits atomic and write meaningful commit messages
- Ensure CI/CD pipeline passes before submitting PR

### Areas for Contribution
- **Core Framework:** Performance optimizations, new validators
- **Interoperability:** Additional connectors (Epic, Cerner, etc.)
- **Security:** Enhanced encryption, threat detection
- **Documentation:** Tutorials, examples, translations
- **Clinical Templates:** Specialty-specific forms and workflows
- **Testing:** Integration tests, load tests, security tests

### Code Review Process
- All PRs require approval from at least one maintainer
- Automated tests must pass
- Security scan must pass
- Documentation must be updated
- Breaking changes require discussion in an issue first

---

## Community & Support

### Communication Channels
- **GitHub Discussions:** General questions and community discussions
- **GitHub Issues:** Bug reports and feature requests
- **Security Issues:** See SECURITY.md for responsible disclosure
- **Email:** support@jsonutil.org (for enterprise inquiries)

### Getting Help
1. Check the [documentation](docs/)
2. Search [existing issues](https://github.com/yourusername/jsonutil/issues)
3. Ask in [GitHub Discussions](https://github.com/yourusername/jsonutil/discussions)
4. Join our community chat (link coming soon)

### Reporting Security Vulnerabilities
Please do NOT report security vulnerabilities through public GitHub issues. Instead, follow the process outlined in [SECURITY.md](SECURITY.md).

### Community Guidelines
- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers get started
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

---

## Citation

If JsonUtil supports your research or academic work, please cite:

```bibtex
@article{kumar2024jsonutil,
  title={JsonUtil: An Open-Source RESTful JSON-Based Dynamic Form Generation Framework for Healthcare Interoperability},
  author={Kumar, Akshat and Sachdeva, Shelly},
  journal={Journal of Healthcare Informatics Research},
  year={2024},
  publisher={National Institute of Technology Delhi}
}
```

Or cite the repository:

```
Kumar, A., & Sachdeva, S. (2024). JsonUtil: Healthcare-Grade Dynamic Form Generation Framework. 
GitHub repository: https://github.com/yourusername/jsonutil
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Akshat Kumar, Shelly Sachdeva

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

- Built with support from the National Institute of Technology Delhi
- Inspired by OpenEHR, HL7 FHIR, and the open-source healthcare community
- Special thanks to all contributors and early adopters

---

## Project Statistics

![GitHub stars](https://img.shields.io/github/stars/yourusername/jsonutil?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/jsonutil?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/jsonutil)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/jsonutil)
![License](https://img.shields.io/github/license/yourusername/jsonutil)
![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/jsonutil/ci.yml)
![Coverage](https://img.shields.io/codecov/c/github/yourusername/jsonutil)

---

**Made with ❤️ for the healthcare community**
