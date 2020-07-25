import React, { FunctionComponent as Component } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import moment from "moment"
import { useNavigation } from "@react-navigation/native"
import Proximity from "@bodhi-project/react-native-proximity"
import { activateKeepAwake, deactivateKeepAwake } from "@sayem314/react-native-keep-awake"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
const bowserLogo = require("./bowser.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const WelcomeScreen: Component = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("demo")

  const [time, tick] = React.useState(moment())
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      tick(moment())
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  })

  const [proximityData, updateProximityState] = React.useState({
    proximity: false,
    times: 0,
    distance: 1,
  })

  const proximityListener = data => {
    updateProximityState({ proximity: data.proximity, distance: data.distance, times: times + 1 })
  }

  React.useEffect(() => {
    activateKeepAwake()
    Proximity.addListener(proximityListener)
    return () => {
      deactivateKeepAwake()
      Proximity.removeListener(proximityListener)
    }
  })

  const { proximity, distance, times } = proximityData

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        {/*<Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />*/}
        <Text style={CONTENT} text={time.format()} />
        <Text style={CONTENT}>Proximity – {proximity === true ? "True" : "False"}</Text>
        <Text style={CONTENT}>Times – {times}</Text>
        {/*
        <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
        */}
        {/*
        <Image source={bowserLogo} style={BOWSER} />
        */}
        {/*
        <Text style={CONTENT}>
          This probably isn't what your app is going to look like. Unless your designer handed you
          this screen and, in that case, congrats! You're ready to ship.
        </Text>
        */}
        {/*
        <Text style={CONTENT}>
          For everyone else, this is where you'll see a live preview of your fully functioning app
          using Ignite.
        </Text>
        */}
      </Screen>
      {/*
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="welcomeScreen.continue"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
      */}
    </View>
  )
})
