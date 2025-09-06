# BiCare MVP

## Overview
BiCare MVP is a Vite + React application showcasing a multi-role health care platform. It provides demo views for patients, care guides, nurses and organizations, accessible through web, WhatsApp and USSD.

**✨ Recently Modularized**: The project has been restructured into a modular architecture for better scaling and debugging.

## Installation
1. Clone the repository and change into it.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   npm run validate:env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development Scripts

### Core Commands
```bash
npm run dev         # Start development server
npm run build       # Create production build
npm run preview     # Preview production build
npm test           # Run tests
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### New Modular Development Tools
```bash
npm run validate:env    # Validate environment variables
npm run analyze        # Analyze code structure and quality
npm run check         # Run complete validation pipeline
npm run mock:server   # Start mock API server
```

## Project Structure

The project has been modularized for better maintainability:

```
src/
├── components/
│   ├── portals/          # Main application portals
│   │   ├── PatientHome.jsx      # Patient/Family portal
│   │   ├── CareGuide.jsx        # Care guide companion
│   │   ├── NurseConsole.jsx     # Nurse triage console
│   │   └── OrgPortal.jsx        # Hospital/Insurer portal
│   ├── shared/           # Reusable components
│   │   ├── Section.jsx          # Layout sections
│   │   ├── ProgressRing.jsx     # Progress indicators
│   │   └── OmniChannelPreview.jsx
│   └── ui/              # Base UI components
├── data/                # Mock data and constants
├── services/            # API service layer
├── utils/               # Utilities and helpers
├── hooks/               # Custom React hooks (future)
└── BiCareStaticMVP.jsx  # Main app shell (122 lines, was 1071!)
```

## Environment Configuration

The project uses environment variables for configuration:

- Copy `.env.example` to `.env.local`
- Required variables:
  - `VITE_API_BASE_URL`: API endpoint URL
  - `VITE_APP_ENV`: Application environment
- Run `npm run validate:env` to verify setup

## Build and Quality Checks

### Enhanced CI Pipeline
- ✅ Environment variable validation
- ✅ Security and dependency auditing  
- ✅ Code quality analysis
- ✅ Bundle size monitoring
- ✅ Modular structure verification

### Code Quality Metrics
- **Main component**: 122 lines (reduced from 1071 lines)
- **Bundle size**: ~309KB (optimized)
- **ESLint errors**: 0
- **Modular structure**: ✅ Implemented

## Contributing
Contributions are welcome! To propose changes:

- Fork the repository and create a feature branch.
- Run `npm run check` to validate your changes.
- Ensure code follows the modular structure principles.
- Provide clear descriptions and reference any related issues.

## Roadmap
- [x] **Modular Architecture**: Split large components into focused modules
- [x] **Enhanced CI/CD**: Comprehensive validation and quality checks
- [x] **Environment Management**: Proper configuration setup
- [ ] Patient and family portal enhancements
- [ ] Care guide companion app improvements  
- [ ] Nurse console for triage and support optimization
- [ ] Organization portal for hospitals and insurers
- [ ] Omni-channel access via WhatsApp, USSD and web
