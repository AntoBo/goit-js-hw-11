import './sass/main.scss';
import axios from 'axios';

axios
  .get('https://pokeapi.co/api/v2/pokemon/ditto')
  .then(r => r.json())
  .then(console.log);
