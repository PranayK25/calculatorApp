import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { colors, scaling, fonts } from "../../library";
import IconFeather from "react-native-vector-icons/Feather";
import IconFontAwesome from "react-native-vector-icons/FontAwesome5";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { PlusMinus } from "../../../assets";

const { normalize, widthScale, heightScale, moderateScale } = scaling;
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const CalculatorScreen = (props) => {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("");
  const [isFinal, setIsFinal] = useState("");

  useEffect(() => {
    if (equation) {
      const argsWithOnlyMath = equation.replace(/[^\d+\-\/*x()>^=]/g, " ");
      const spacedArgs = argsWithOnlyMath
        .replace(/\s*(\D+)\s*/g, " $1 ") // add spaces
        .replace(/ +/g, " ") // ensure no duplicate spaces
        .replace(/\( /g, "(") // remove space after (
        .replace(/ \)/g, ")"); // remove space before )

      console.log(spacedArgs);

      let res;
      try {
        if (
          spacedArgs.slice(-2, -1) === "+" ||
          spacedArgs.slice(-2, -1) === "-" ||
          spacedArgs.slice(-2, -1) === "*" ||
          spacedArgs.slice(-2, -1) === "/"
        ) {
          res = eval(spacedArgs.slice(0, -2));
        } else {
          res = eval(spacedArgs);
        }
      } catch (e) {
        console.log("Could not evaluate expression :(");
      }
      if (res && res != undefined) {
        setResult(res);
      } else {
        console.log("Could not evaluate expression");
      }
    } else {
      setEquation("");
      setResult("");
    }
  }, [equation]);

  const equationBuilder = (item) => {
    if (item === "CLEAR") {
      setEquation("");
      setResult("");
      setIsFinal("");
    } else if (item === "=") {
      setIsFinal(result);
      setEquation("");
      setResult("");
    } else if (item === "DEL") {
      setEquation(equation.slice(0, -1));
    } else {
      setIsFinal("");
      if (
        (item === "+" || item === "*" || item === "/") &&
        equation.slice(-1) === "-" &&
        (equation.slice(-2, -1) === "+" ||
          equation.slice(-2, -1) === "*" ||
          equation.slice(-2, -1) === "/")
      ) {
        setEquation(equation.slice(0, -2) + item);
      } else if (item === "." && equation.slice(-1) === ".") {
        setEquation(equation.slice(0, -1) + item);
      } else if (
        (item === "-" || item === "+") &&
        (equation.slice(-1) === "+" || equation.slice(-1) === "-")
      ) {
        setEquation(equation.slice(0, -1) + item);
      } else if (
        (item === "+" || item === "*" || item === "/") &&
        (equation.slice(-1) === "+" ||
          equation.slice(-1) === "*" ||
          equation.slice(-1) === "/" ||
          equation.slice(-1) === "-")
      ) {
        setEquation(equation.slice(0, -1) + item);
      } else {
        setEquation(equation + item);
      }
    }
  };

  const calculatorArray = [
    ["CLEAR", "PLUSMINUS", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    [".", "0", "DEL", "="],
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={colors.lightGrey} />
      <View style={styles.buttonsContainer}>
        <View style={styles.upperContent}>
          {equation ? (
            <View style={styles.equationContainer}>
              <Text style={styles.equationText}>{equation}</Text>
            </View>
          ) : null}
          {result ? (
            <View style={styles.equationContainer}>
              <Text style={styles.resultText}>{result}</Text>
            </View>
          ) : null}
          {isFinal ? (
            <View style={styles.equationContainer}>
              <Text style={styles.finalText}>{isFinal}</Text>
            </View>
          ) : null}
        </View>
        <FlatList
          scrollEnabled={false}
          data={calculatorArray}
          renderItem={({ item }) => {
            return (
              <FlatList
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={item}
                horizontal
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onLongPress={() => {
                        if (item === "DEL") {
                          setEquation("");
                          setResult("");
                          setIsFinal("");
                          Vibration.vibrate();
                        }
                      }}
                      onPress={() => equationBuilder(item)}
                      style={
                        item === "="
                          ? [styles.box, { backgroundColor: colors.red2 }]
                          : styles.box
                      }
                    >
                      {item === "CLEAR" ? (
                        <Text
                          style={[
                            styles.buttonText,
                            {
                              marginTop: heightScale(2),
                              fontSize: normalize(26),
                              color: colors.red2,
                              fontFamily: fonts.poppins.regular,
                            },
                          ]}
                        >
                          C
                        </Text>
                      ) : item === "DEL" ? (
                        <IconMaterial
                          name="backspace-outline"
                          size={25}
                          color={colors.black2}
                        />
                      ) : item === "PLUSMINUS" ? (
                        <Image source={PlusMinus} style={colors.iconStyle} />
                      ) : item === "%" ? (
                        <IconFeather
                          name={"percent"}
                          size={25}
                          style={styles.percentage}
                        />
                      ) : item === "/" ? (
                        <IconFontAwesome
                          name={"divide"}
                          size={25}
                          style={styles.percentage}
                          color={colors.red2}
                        />
                      ) : item === "*" ? (
                        <IconMaterial
                          name={"close"}
                          size={30}
                          style={styles.percentage}
                          color={colors.red2}
                        />
                      ) : (
                        <Text
                          style={
                            item === "x" || item === "-" || item === "+"
                              ? [
                                  styles.buttonText,
                                  {
                                    color: colors.red2,
                                    fontSize: normalize(28),
                                  },
                                ]
                              : item === "="
                              ? [
                                  styles.buttonText,
                                  {
                                    color: colors.lightGrey,
                                    fontSize: normalize(34),
                                  },
                                ]
                              : styles.buttonText
                          }
                        >
                          {item}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  box: {
    height: screenHeight / 8,
    width: screenWidth / 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: fonts.poppins.regular,
    fontSize: normalize(24),
    color: colors.black2,
  },
  upperContent: {
    // justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
  },
  iconStyle: {
    height: widthScale(20),
    width: widthScale(15),
    marginBottom: heightScale(2),
  },
  equationContainer: {
    marginRight: widthScale(30),
  },
  equationText: {
    fontFamily: fonts.poppins.regular,
    fontSize: normalize(30),
    color: colors.black2,
  },
  resultText: {
    marginTop: heightScale(-10),
    fontFamily: fonts.poppins.bold,
    fontWeight: "bold",
    fontSize: normalize(75),
    color: colors.black2,
    marginBottom: heightScale(10),
  },
  finalText: {
    marginTop: heightScale(-10),
    fontFamily: fonts.poppins.bold,
    fontWeight: "bold",
    fontSize: normalize(110),
    color: colors.black2,
    marginBottom: heightScale(10),
  },
});

export default CalculatorScreen;
