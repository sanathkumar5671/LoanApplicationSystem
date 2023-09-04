/**
 * This is a helper function and not a component, which helps React components Fetch API data from various Endpoints.
 * This makes the code more reuseable.
 * @param {string} url 
 * @param {string} method 
 * @param {object} data 
 * @returns {object} HTTP Response
 */
export const makeApiRequest = async (url, method = 'GET', data = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const config = {
      method,
      headers,
    };

    if (method === 'POST' && data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`API request error: ${error.message}`);
  }
};
