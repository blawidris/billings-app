import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  OnboardBG,
  OnboardImage,
  ImageContainer,
  GradientOverlay,
  Title,
  OnBoardBT,
  Dot,
  Dots,
  ActiveDot,
  InactiveDot,
  FooterTitle,
  FooterText,
  BottomContainer,
  ButtonContainer,
  SkipButton,
  SkipButtonText,
  NextButton,
  NextButtonImage,
  LastImageContainer,
  LastImage,
  GetStartedButton,
  GetStartedButtonText,
} from "../components/account.styles";
import { Spacer } from "../components/spacer/spacer.component";
import { router } from "expo-router";

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const slides = [
    {
      id: "1",
      title: "Make Bills Payment",
      description: "Easily add your utility, credit card, and other bills",
      image: require("@/assets/Onboarding.png"),
    },
    {
      id: "2",
      title: "Track Spendings & Expenses",
      description: "Easily add your utility, credit card, and other bills",
      image: require("@/assets/Onboarding.png"),
    },
    {
      id: "3",
      title: "Financial Freedom At Your Fingertip",
      description: "Easily add your utility, credit card, and other bills",
      image: require("@/assets/Onboarding2.png"),
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("Welcome");
    }
  };

  return (
    <OnboardBG>
      {currentIndex < slides.length - 1 ? (
        <ImageContainer>
          <OnboardImage source={slides[currentIndex].image} />
          <GradientOverlay />
        </ImageContainer>
      ) : (
        <LastImageContainer>
          <LastImage source={slides[currentIndex].image} />
        </LastImageContainer>
      )}
      <Dots>
        {slides.map((_, index) => (
          <React.Fragment key={index}>
            {currentIndex === index ? <ActiveDot /> : <InactiveDot />}
          </React.Fragment>
        ))}
      </Dots>
      <OnBoardBT>
        <BottomContainer>
          <FooterTitle>{slides[currentIndex].title}</FooterTitle>

          <Spacer size="small">
            <FooterText>{slides[currentIndex].description}</FooterText>
          </Spacer>
        </BottomContainer>
      </OnBoardBT>
      {currentIndex < slides.length - 1 ? (
        <ButtonContainer>
          <SkipButton onPress={() => router.push("/welcome")}>
            <SkipButtonText>Skip</SkipButtonText>
          </SkipButton>
          <NextButton onPress={handleNext}>
            <NextButtonImage source={require("@/assets/arrow-right.png")} />
          </NextButton>
        </ButtonContainer>
      ) : (
        <GetStartedButton onPress={() => router.push("/welcome")}>
          <GetStartedButtonText>Get Started</GetStartedButtonText>
        </GetStartedButton>
      )}
    </OnboardBG>
  );
}
