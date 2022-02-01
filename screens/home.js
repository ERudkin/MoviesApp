import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Text,
  Button,
} from 'react-native';
import {getMovies, getTvSeries, getMovieByGenre} from '../services/services';
import {urlPaths as paths, genres} from '../services/enum';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
const errorText1 = 'Oops!, there was a error';
const errorText2 = 'please try again ';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [movieImages, setMovieImages] = useState([]);
  const [upComingMovies, setUpcomingMovies] = useState([]);
  const [popularTvShows, setpopularTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [latestTvShows, setLatestTvShows] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [historyMovies, setHistoryMovies] = useState([]);

  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getMovies(paths.upcoming),
      getTvSeries(paths.popular),
      getTvSeries(paths.top_rated),
      // getTvSeries(paths.latest),
      getMovieByGenre(genres.family, paths.discover_movie),
      getMovieByGenre(genres.history, paths.discover_movie),
    ]);
  };

  const fetchMovieImages = useCallback(async path => {
    const data = await getMovies(path).catch(err => {
      setError(err);
    });
    const arr = [];
    data.forEach(movie => {
      arr.push(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    });
    setMovieImages(arr);
  });

  const fetchMovieByGenreApi = useCallback(async path => {
    const data = await getMovieByGenre();
  });

  useEffect(() => {
    getData()
      .then(
        ([
          upComingMovies,
          popularTvShows,
          topRatedTvShows,
          familyMovies,
          historyMovies,
        ]) => {
          setUpcomingMovies(upComingMovies);
          setpopularTvShows(popularTvShows);
          setTopRatedTvShows(topRatedTvShows);
          setFamilyMovies(familyMovies);
          setHistoryMovies(historyMovies);
        },
      )
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoaded(true);
      });
    fetchMovieImages(paths.upcoming);
  }, []);
  console.log(familyMovies);
  return (
    // <React.Fragment>
    <View>
      {!error && isLoaded && (
        <ScrollView style={styles.scrollview}>
          <View style={styles.sliderContainer}>
            <SliderBox
              autoplay={true}
              circleLoop={true}
              dotStyle={styles.sliderStyle}
              sliderBoxHeight={dimensions.height / 1.5}
              images={movieImages}></SliderBox>
          </View>
          <View styles={styles.container}>
            {popularTvShows && (
              <List item={popularTvShows} title={'Popular Shows'} />
            )}
            {topRatedTvShows && (
              <List item={topRatedTvShows} title={'Top Rated Shows'} />
            )}

            {upComingMovies && (
              <List item={upComingMovies} title={'Popular Movies'} />
            )}

            {familyMovies && (
              <List item={familyMovies} title={'Family Movies'} />
            )}

            {/* {documentaries && (<List item = {documentaries} title = {'Documentary Movies'}/>)} */}

            {historyMovies && (
              <List item={historyMovies} title={'History Movies'} />
            )}
          </View>
        </ScrollView>
      )}
      <View style={styles.errorContainer}>
        {error && (
          <Error errorText1={errorText1} errorText2={errorText2}></Error>
        )}
        {!isLoaded && <ActivityIndicator size="large" />}
      </View>
    </View>
    // </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    height: dimensions.height / 1.5,
  },

  sliderStyle: {
    height: 0,
  },
  container: {
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  scrollview: {
    backgroundColor: 'black',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: dimensions.height,
    // backgroundColor: 'red',
  },
});

export default Home;
