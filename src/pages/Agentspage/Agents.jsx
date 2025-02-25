import axios from 'axios';

const fetchAgents = async () => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/agents');
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
};

export default fetchAgents
