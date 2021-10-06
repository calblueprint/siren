import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import App from './App';

//will be the respective screens
const Home = () => <Text>Welcome to the homepage!</Text>; 

const Forms = () => <Text>Fill out your intake form!</Text>;

const Upload = () => <Text>Upload your necessary documents!</Text>;

const Schedule = () => <Text>Schedule an appointment with your attorney!</Text>

const NavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'forms', title: 'Forms', icon: 'pencil' },
    { key: 'upload', title: 'Recents', icon: 'upload' },
    { key: 'schedule', title: 'Schedule', icon: 'calendar'}
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    forms: Forms,
    upload: Upload,
    schedule: Schedule,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavBar;

