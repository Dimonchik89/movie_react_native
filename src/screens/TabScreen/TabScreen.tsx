import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {HomeScreen, MoviesScreen, SearchScreen, TvScreen} from '..';
import HomeIcon from '../../assets/svg/HomeIcon';
import MovieIcon from '../../assets/svg/MovieIcon';
import SearchIcon from '../../assets/svg/SearchIcon';
import TvIcon from '../../assets/svg/TVIcon';
import {RootStackParamsTabsList} from '../../types/tabs';

const Tab = createBottomTabNavigator<RootStackParamsTabsList>();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarLabelStyle: {fontSize: 15}}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <HomeIcon style={styles.icon} fill={color} />
          ),
          title: 'Головна',
        }}
      />
      <Tab.Screen
        name="MoviesScreen"
        component={MoviesScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MovieIcon style={styles.icon} fill={color} />
          ),
          title: 'Фiльми',
        }}
      />
      <Tab.Screen
        name="TvScreen"
        component={TvScreen}
        options={{
          tabBarIcon: ({color}) => <TvIcon style={styles.icon} fill={color} />,
          title: 'ТВ шоу',
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => (
            <SearchIcon style={styles.icon} fill={color} />
          ),
          title: 'Пошук',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});
