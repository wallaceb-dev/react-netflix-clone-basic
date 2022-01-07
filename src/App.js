import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MoviesRuler from './components/MoviesRuler';
import FeaturedMovie from './components/FeaturedMovie';

export default () => {
  const [categories, setCategories] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

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

  return (
    <div className="page">
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
    </div>
  );
};
