import _ from 'lodash';

function buildQuery(filters) {
  let query = '';
  _.each(filters, (value, key) => {
    if (value != null) {
      query += `&${key}=${value}`;
    }
  });
  return query;
}

export { buildQuery };
