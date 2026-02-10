# BNB Chain Repository Submission Guidelines

## 1. Purpose
To ensure accurate data tracking and ecosystem authenticity, all submitted repositories must demonstrate clear intent to deploy on the **BNB Chain ecosystem** (including **BSC**, **opBNB**, or **Greenfield**) through their content and configuration.

---

## 2. Core Verification Principle
A repository is considered **compliant** if:
- A reviewer can examine only the repository (without external context)  
- And **reasonably conclude** that the project is deployed on BNB Chain.  

The verification process evaluates **multiple indicators holistically**, not just a single keyword or file.

---

## 3. Positive Indicators 
Signals that increase confidence a project is deployed on BNB Chain:

### Configuration Evidence
- Config files explicitly point to BNB Chain nodes, RPCs, or network IDs.
- If config files list dozens of chains without prioritization, **intent becomes unclear**.

### README Documentation
- Clearly states deployment on **BNB Chain** (or related networks like BSC, opBNB, Greenfield).
- README may also list other chains, but BNB Chain deployment must be **explicitly mentioned**.

### BNB Chain–Specific SDK Usage
- Uses SDKs, APIs, or libraries **specific to BNB Chain** (e.g., Greenfield SDK).
- Common in non-EVM integrations, but also applies to EVM-compatible projects.

### Chain-Specific Files or Formats
- Presence of files unique to BNB Chain development (e.g., `bnbconfig.json`).

### Function Names or Signatures
- Smart contract functions or scripts referencing **BNB-specific operations or parameters**.

### Code Comments
- Developer comments explicitly referencing **intent to deploy or support BNB Chain**.

---

## 4. Common False Positives
The following **do not guarantee** BNB Chain deployment:

- README claims deployment on Ethereum, but configs point elsewhere.
- Repo name contains another chain (e.g., `xyzswap-avalanche`) but code actually targets BNB Chain.
- Repo includes the term **BNB** only because it trades the **BNB token**, not because it supports BNB Chain infrastructure.
- Mixed signals across files (e.g., conflicting configs and documentation).

---

## 5. Submission Requirements
- Repository must be **public** (no private repos or inaccessible code).
- Must be the **official source code** of the project.
- README and config files must comply with these guidelines.
- Multiple repos are acceptable if the **main repo is clearly identified**.
