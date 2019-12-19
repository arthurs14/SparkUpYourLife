import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ImageBackground,
  FlatList
} from 'react-native';

import EditProfileScreen from './EditProfileScreen';
import profilebg from '../../js/res/profilebg2.jpeg';

import * as firebase from 'firebase';
import '@firebase/firestore';

const UNSET = 'UNSET';
const EDIT_PROFILE_TYPE = 'EDIT_PROFILE';
const defaultNavigatorType = UNSET;

export default class ProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      name: 'Dominique',
      email: 'dominique@gmail.com',
      bio: 'Influencing young minds physically and digitally.',
      jobTitle: 'Software Engineer',
      interests: [],
      currentInterest: '',
      skills: [],
      currentSkill: '',
      location: 'The Greater SLO Area'
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);

    this._goToEditProfileScreen = this._goToEditProfileScreen.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
  }

  componentDidMount() {

      firebase.firestore().collection('users').doc(this.state.email)
      .onSnapshot(doc => {
          if (doc && doc.exists) {
              console.log("Document data:", doc.data());
              const user = doc.data()
              this.setState({name: user.name})
              this.setState({email: user.email})
              this.setState({ bio: user.bio})
              this.setState({ jobTitle: user.jobTitle})
              this.setState({ location: user.location})
              this.setState({ skills: user.skills})
              this.setState({ interests: user.interests})
              this.setState({ user: user})
          } else {
              console.log("No such document!");
          }
        })
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == EDIT_PROFILE_TYPE) {
      return this._goToEditProfileScreen();
    }
  }

  _getExperienceSelector() {
    return (
      <ImageBackground
        source={profilebg}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={localStyles.outer}>
          <View style={localStyles.inner}>
            <Text style={localStyles.titleText}>My Profile Screen</Text>
            <View>
              <Text style={localStyles.subTitle}>Name:</Text>
              <Text style={localStyles.words}>{this.state.name} </Text>
            </View>
            <View>
              <Text style={localStyles.subTitle}>Email:</Text>
              <Text style={localStyles.words}>{this.state.email}</Text>
            </View>
            <View>
              <Text style={localStyles.subTitle}>Bio:</Text>
              <Text style={localStyles.words}>{this.state.bio}</Text>
            </View>
            <View>
              <Text style={localStyles.subTitle}>Location:</Text>
              <Text style={localStyles.words}> {this.state.location}</Text>
            </View>
            <View>
              <Text style={localStyles.subTitle}>Job Title:</Text>
              <Text style={localStyles.words}> {this.state.jobTitle}</Text>
            </View>
            {/* <View>
          <Text style={localStyles.subTitle}>Interests:</Text>
          <FlatList
            data={this.state.interests}
            renderItem={({item}) => <Text style={localStyles.words}>{item}</Text>}
          />
        </View>
        <View>
          <Text style={localStyles.subTitle}>Skills:</Text>
          <FlatList
            data={this.state.skills}
            renderItem={({item}) => <Text style={localStyles.words}>{item}</Text>}
          />
        </View> */}

            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this._getExperienceButtonOnPress(EDIT_PROFILE_TYPE)}
              underlayColor={'#68a0ff'}
            >
              <Text style={localStyles.buttonText}>Edit Profile</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    );
  }

  _goToEditProfileScreen() {
    return <EditProfileScreen />;
  }
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }
}

const localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.85,
    backgroundColor: 'black'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 45,
    width: 150,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  inputTitle: {
    color: 'gray',
    fontSize: 10
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  input: {
    borderBottomColor: 'blue',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: 'white'
  },
  subTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25
  },
  words: {
    padding: 20,
    color: 'white'
  }
});
