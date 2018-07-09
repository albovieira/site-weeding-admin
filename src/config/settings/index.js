import dev from './dev';
import prod from './prod';

const env = process.env.NODE_ENV;
const config = env === 'development' ? dev : prod;

console.log(config);
export default config;
