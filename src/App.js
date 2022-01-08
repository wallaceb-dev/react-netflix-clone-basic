import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MoviesRuler from './components/MoviesRuler';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {
  const [categories, setCategories] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [darkenHeader, setDarkenHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let categories = await Tmdb.getCategories();
      setCategories(categories);
      let originals = categories.filter(
        (category) => category.slug === 'originals'
      );
      let randomPick = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let featured = originals[0].items.results[randomPick];
      let featuredDetails = await Tmdb.getMidiaDetails(featured.id, 'series');
      setFeaturedData(featuredDetails);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setDarkenHeader(true);
      } else {
        setDarkenHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [darkenHeader]);

  return (
    <div className="page">
      <Header darkenHeader={darkenHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {categories.map((category, index) => (
          <MoviesRuler
            key={index}
            title={category.title}
            items={category.items}
          />
        ))}
      </section>

      {categories.length <= 0 && (
        <div className="loading">
          <img
            src="https://www.rchandru.com/images/portfolio/modals/m-loading.gif"
            alt="Carregando..."
          />
        </div>
      )}
    </div>
  );
};
