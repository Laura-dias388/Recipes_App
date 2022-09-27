import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
// import fetchRecipe from '../services/FetchAPI';

function Provider({ children }) {
  // const URL_BASE_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
  // const URL_BASE_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';
  // const URL_INGREDIENT = 'filter.php?i=';
  // const URL_NAME = 'search.php?s=';
  // const URL_FIRST_LETTER = 'search.php?f=';

  /* const [urlToFetch, setUrlToFetch] = useState({
    urlBase: URL_BASE_MEAL,
    urlTypeFilter: '',
    urlInput: '',
  });
  const [url, setUrl] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    setUrl(`${urlBase}${urlTypeFilter}${urlInput}`);
  }, [urlToFetch]);

  useEffect(() => {
    setData(fetchRecipe(urlToFetch));
  }, [url]);
 */
  const recipesValues = useMemo(() => ({
  }));

  return (
    <RecipeContext.Provider value={ recipesValues }>
      {children}
    </RecipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
