# API Integration Guide

This directory is reserved for future API service configurations and integrations.

## Services to Integrate

### NASA APIs
- **APOD** (Astronomy Picture of the Day) - Pre-configured ✅
- **Mars Rover Weather** - Partially configured
- **Exoplanet Data** - Ready for implementation
- **Hubble Imagery** - Ready for implementation

### ISS Tracking
- **ISS Location API** - Pre-configured ✅
- **Satellite Data** - Ready for implementation

### AI Services
- **OpenAI ChatGPT** - Placeholder ready
- **Local LLM** (Ollama/LM Studio) - Placeholder ready
- **Custom Backend** - Placeholder ready

## Configuration Files

Create files here to configure each service:

### `nasa-config.js` (Recommended)
```javascript
// NASA API specific configuration
const NASA_CONFIG = {
  API_KEY: 'your_key_here',
  ENDPOINTS: {
    APOD: '/planetary/apod',
    WEATHER: '/insight_weather',
    EXOPLANET: '/exoplanet/query'
  }
};
```

### `ai-config.js` (Recommended)
```javascript
// AI service configuration
const AI_CONFIG = {
  PROVIDER: 'openai', // or 'local', 'custom'
  API_KEY: 'your_key_here',
  MODEL: 'gpt-3.5-turbo',
  ENDPOINT: 'https://api.openai.com/v1/chat/completions'
};
```

## Implementation Steps

1. **Set up NASA API key**
   - Get free key from api.nasa.gov
   - Add to config or js/config.js

2. **Configure AI service**
   - Choose provider (OpenAI, Local LLM, Custom)
   - Set up credentials
   - Update endpoint in config

3. **Test connectivity**
   - Check browser console for logs
   - Verify data is loading
   - Monitor network tab for requests

4. **Deploy with secrets**
   - Use environment variables
   - Never commit API keys to Git
   - Use GitHub Secrets for CI/CD

## Available Endpoints

All functions are prepared in `js/api-integration.js`:

- `fetchNASAAPOD()` - Get Picture of the Day
- `fetchISSLocation()` - Get ISS coordinates
- `fetchMarsWeather()` - Get Mars weather data
- `queryAI()` - Send question to AI
- `getAIFunFact()` - Generate fun facts
- `processAICommand()` - Parse natural language

## Security Best Practices

1. Never expose API keys in client-side code
2. Use proxy server for sensitive APIs
3. Implement rate limiting
4. Monitor usage and costs
5. Rotate keys regularly
6. Use environment variables

## Troubleshooting

**CORS Errors?**
- Use CORS proxy: `https://cors-anywhere.herokuapp.com/`
- Or implement backend proxy

**Rate Limiting?**
- Cache responses
- Implement request queuing
- Use free tier wisely

**No Data Appearing?**
- Check browser console for errors
- Verify API key validity
- Check network tab in DevTools
- Verify endpoint URLs

---

For detailed integration examples, see main `README.md`
