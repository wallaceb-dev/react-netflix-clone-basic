const API_KEY = 'ee7671c1c1730e392513514262e97c58';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = req.json();
  return json;
};

export default {
  getCategories: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais da Netflix',
        items: await basicFetch(
          `/discover/tv?with_network=213&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'trending',
        title: 'Em alta',
        items: await basicFetch(`/trending/all/week?api_key=${API_KEY}`),
      },
      {
        slug: 'top rated',
        title: 'Recomendados para Você',
        items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}`),
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(
          `/discover/movie?with_genres=28&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(
          `/discover/movie?with_genres=35&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(
          `/discover/movie?with_genres=27&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'documentary',
        title: 'Documentário',
        items: await basicFetch(
          `/discover/movie?with_genres=99&api_key=${API_KEY}`
        ),
      },
    ];
  },
  getMidiaDetails: async (id, type) => {
    let info = {};

    if (id) {
      switch (type) {
        case 'movie':
          info = await basicFetch(`/movie/${id}?api_key=${API_KEY}`);
          break;
        case 'series':
          info = await basicFetch(`/tv/${id}?api_key=${API_KEY}`);
      }
    }

    return info;
  },
};
