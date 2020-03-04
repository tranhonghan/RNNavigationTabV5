import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('Settings')}
        >
          <Text>Go to Tab Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('Details')}
        >
          <Text>Go to Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
     <View style={{ flex: 1}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Setting!</Text>
        <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('Home')}
        >
          <Text>Go to Tab Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('Details')}
        >
          <Text>Go to Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      {/* <Ionicons name={name} size={size} color={color} /> */}
      <Image source={name} style={{width: 20, height: 20}} resizeMode='contain'/>
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 17,
            height: 17,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={6} />;
}

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('./src/images/home-red.png')
                : require('./src/images/home-black.png');
              return (
                <HomeIconWithBadge
                  name={iconName}
                  size={size}
                  color={color}
                />
              )
            } else if (route.name === 'Settings') {
              iconName = focused ? require('./src/images/setting-red.png') 
              : require('./src/images/setting-black.png');
              return <Image source={iconName} style={{width: 20, height: 20}}
              resizeMode='contain'/>
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}