import React, { useState } from "react";
import NavigationLayout from '../navigations'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { ApolloProvider, withApollo } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import graphqlClient from '../../client'

export default function AppLayout(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <ApolloProvider client={graphqlClient}>
        <ApolloHooksProvider client={graphqlClient}>
          <NavigationLayout/>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    }),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
