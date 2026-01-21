# AGENTS.md

This file provides guidelines for agentic coding agents operating in this repository.

## Project Overview

This repository contains:
- **exam/** - JLPT Japanese test preparation system (N5-N1 levels)
- **tool/** - Utility collection (encryption, encoding, formatting tools)
- Main website files (HTML, CSS, JavaScript)

## Build, Lint, and Test Commands

### Local Server (for both exam and tool modules)
```bash
# Start server on port 8080 (for tool/ tests)
python -m http.server 8080

# Start server on port 8000 (for exam/ module)
python -m http.server 8000

# Check port usage
netstat -ano | findstr :8080
```

### Running Tests
```bash
# Automated tests (requires server running)
node tool/test/run_tests.js

# Browser-based testing
# Open tool/test/test_all_tools.html in browser
# Open exam/test.html in browser

# Run single test case manually
# Open specific test file in browser and check console output
```

## Code Style Guidelines

### General Principles
- Use ES6+ JavaScript syntax
- Keep code readable and maintainable
- Add clear comments for complex logic
- UTF-8 file encoding

### Naming Conventions
- **Files**: lowercase with hyphens (e.g., `aes-tools.js`, `json-tools.html`)
- **Variables**: camelCase (e.g., `currentQuestionIndex`, `userProgress`)
- **Functions**: camelCase (e.g., `loadQuestionsFromJSON`, `initializeDatabase`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_QUESTIONS`, `DEFAULT_TIMEOUT`)
- **CSS Classes**: kebab-case (e.g., `.notification`, `.question-card`)

### JavaScript Style
- Use `const` by default, `let` when reassignment needed
- Use template literals for string interpolation
- Use arrow functions for anonymous callbacks
- Use `async/await` for asynchronous operations
- Handle errors with try-catch blocks

### Error Handling
- Wrap async operations in try-catch
- Log errors to console with descriptive messages
- Show user-friendly error notifications
- Handle IndexedDB errors gracefully (database initialization, transactions)
- Example:
```javascript
try {
    await loadQuestionsFromJSON();
} catch (error) {
    console.error('Failed to load questions:', error);
    showNotification('加载失败，请刷新页面重试');
}
```

### HTML/CSS Guidelines
- Use semantic HTML5 elements (header, main, section, article, footer)
- Keep CSS organized and modular
- Use responsive design principles
- Avoid inline styles; use external CSS files
- Include proper meta tags for viewport and encoding

### IndexedDB Operations
- Initialize database before any CRUD operations
- Use proper transaction handling
- Implement error handling for quota exceeded scenarios
- Back up important user data locally

### Security Practices
- Use Web Crypto API for encryption operations
- Validate and sanitize user inputs
- Never expose sensitive data in logs or client-side code
- Keep user data local (no server transmission)

### File Structure
- Test files must be in `test/` subdirectory of respective module
- Test file naming: `test_*.html` or `*_test.js`
- Keep main application code separate from test files
- All tool scripts go in `tool/js/`, exam scripts in `exam/js/`

### Browser Compatibility
- Target modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Use feature detection where necessary
- Test on Chrome for development

## Development Workflow

1. Start local server: `python -m http.server 8080`
2. Make code changes
3. Test in browser (open relevant HTML file)
4. Check browser console for errors
5. Run automated tests: `node tool/test/run_tests.js`
6. Update documentation if needed

## Important Notes

- Windows environment: use PowerShell/CMD commands
- Paths: use Windows-style (e.g., `C:\path\to\file`)
- No build step required - pure client-side JavaScript
- No npm/package.json - vanilla JS project
- Always backup files before major changes
