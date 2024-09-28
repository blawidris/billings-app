import styled from "styled-components/native";
import { colors } from "@/infrastructure/theme/colors";
import { fontWeights } from "@/infrastructure/theme/fonts";
import { Text } from "./typography/text.component";
import { LinearGradient } from "expo-linear-gradient";

export const AccountBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.ui.primary};
`;

export const WelcomeBackground = styled.ImageBackground.attrs({
  source: require("@/assets/Onboarding3.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Logo = styled.Image`
  width: 200px;
  height: 200px;
`;

export const Title = styled(Text)`
  font-size: 32px;
  font-weight: ${fontWeights.bold};
  color: ${colors.text.inverse};
  font-family: ${(props) => props.theme.fonts.body};
  margin-top: 20px;
`;
export const FooterTitle = styled(Text)`
  font-size: 24px;
  font-weight: ${fontWeights.bold};
  color: ${colors.text.primary};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const FooterText = styled(Text)`
  font-size: 14px;
  font-weight: ${fontWeights.light};
  color: ${colors.text.primary};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const OnboardBG = styled.View`
  flex: 1;
  background-color: #fff;
  position: relative;
`;
export const OnboardImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: -99;
`;
export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: 77.5px;
  padding-right: 77.5px;
  position: relative;
`;

export const LastImageContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: start;
  align-items: start;
  position: absolute;
  top: 0;
`;

export const LastImage = styled.Image`
  object-fit: contain;
  width: 100%;
  height: 70%;
`;

export const GradientOverlay = styled(LinearGradient).attrs({
  colors: [
    "rgba(255, 255, 255, 0)",
    "rgba(255, 255, 255, 0.1)",
    "rgba(255, 255, 255, 0.2)",
    "rgba(255, 255, 255, 1)",
    "rgba(255, 255, 255, 1)",
    "rgba(255, 255, 255, 1)",
  ],
  locations: [0, 0.2, 0.4, 0.6, 0.8, 1],
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
`;
export const WelcomeOverlay = styled(LinearGradient).attrs({
  colors: [
    "rgba(31, 108, 171, 0.2)",
    "rgba(31, 108, 171, 0.3)",
    "rgba(31, 108, 171, 0.4)",
    "rgba(31, 108, 171, 0.5)",
    "rgba(31, 108, 171, 0.6)",
    "rgba(31, 108, 171, 0.8)",
    "rgba(31, 108, 171, 1)",
  ],
  locations: [0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1],
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
`;
export const ReceiptOverlay = styled(LinearGradient).attrs({
  colors: [
    "rgba(31, 108, 171, 1)",
    "rgba(31, 108, 171, 1)",
    "rgba(31, 108, 171, 1)",
    "rgba(31, 108, 171, 1)",
    "rgba(13, 43, 69, 1)",
    "rgba(13, 43, 69, 1)",
  ],
  locations: [0.3, 0.4, 0.5, 0.6, 0.8, 1],
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
`;
export const ReceiptBackground = styled.ImageBackground.attrs({
  source: require("@/assets/icons/receipt-bgg.png"),
  resizeMode: "contain",
})`
  width: 100%;
  height: 90%;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  top: 50px;
`;

export const OnBoardBT = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 130px;
  left: 0;
  right: 0;
  z-index: 99;
`;
export const BottomContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

export const ButtonContainer = styled.View`
  flex: 2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 50px;
  left: 30px;
  right: 30px;
  z-index: 99;
`;

export const Dots = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 220px;
  left: 0;
  right: 0;
  z-index: 99;
`;

export const Dot = styled.View`
  width: 30px;
  height: 1px;
  border-radius: 20px;
  margin-horizontal: 5px;
`;

export const ActiveDot = styled(Dot)`
  background-color: ${colors.ui.primary};
`;

export const InactiveDot = styled(Dot)`
  background-color: #ccc;
`;

// export const SkipButton = styled(Button).attrs({
//   color: colors.button.primary,
// })`

// `

export const SkipButton = styled.TouchableOpacity`
  color: "#000000";
`;

export const SkipButtonText = styled(Text)`
  color: "#000000";
  font-size: 16px;
  font-weight: ${fontWeights.bold};
`;
// export const NextButton = styled(Button).attrs({
//   color: colors.button.primary,

// })`
// text-align: center;
// align-items: center;
// justify-content: center;
// width: 50px;
// height: 50px;
// border-radius: 50%;
// background-color: ${colors.ui.primary};
// `

export const NextButton = styled.TouchableOpacity`
  color: ${colors.button.primary};
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 1000px;
  background-color: ${colors.ui.primary};
`;

export const NextButtonImage = styled.Image`
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const GetStartedButton = styled.TouchableOpacity`
  border-radius: 100px;
  background-color: ${colors.ui.primary};
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 48px;
  bottom: 50px;
  left: 37px;
  right: 30px;
  position: absolute;
  z-index: 99;
`;
export const GetStartedButtonText = styled(Text)`
  font-size: 14px;
  color: ${colors.text.inverse};
  font-weight: ${fontWeights.bold};
`;

export const WelcomeContainer = styled.View`
  flex: 3;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  position: absolute;
  bottom: 138px;
  gap: 10px;
`;

export const ReceiptContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const SignUpButton = styled.TouchableOpacity`
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  width: 335px;
  height: 48px;
  background-color: "rgba(255, 255, 255, 1)";
  z-index: 99;
`;

export const SignInButton = styled.TouchableOpacity`
  border-radius: 100px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-color: "rgba(255, 255, 255, 1)";
  width: 335px;
  height: 48px;
  z-index: 99;
`;

export const SignUpText = styled(Text)`
  color: ${colors.ui.primary};
  font-weight: ${fontWeights.bold};
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.body};
`;
export const SignInText = styled(Text)`
  color: ${colors.text.inverse};
  font-weight: ${fontWeights.bold};
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.body};
`;

export const SupportContainer = styled.View`
  flex: 3;
  position: absolute;
  bottom: 60px;
  z-index: 99;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #fff;
`;

export const Header = styled.View`
  background-color: ${colors.ui.primary};
  padding: 20px;
  border-top-right-radius: ${(props) =>
    typeof props.borderTopRightRadius === "number"
      ? props.borderTopRightRadius
      : 0};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  justify-content: center;
  width: 100%;
`;

export const HeaderText = styled(Text)`
  font-size: 24px;
  color: ${colors.text.inverse};
  font-weight: ${fontWeights.bold};
  padding-top: 64px;
`;

export const SubHeaderText = styled(Text)`
  font-size: 16px;
  color: ${colors.text.inverse};
  padding-top: 15px;
`;

export const Form = styled.View`
  margin-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
`;

export const Input = styled.TextInput`
  border-radius: 10px;
  height: 48px;
  border-width: 0.5px;
  border-color: rgba(196, 196, 196, 1);
  padding: 10px;
  margin-top: 5px;
  color: "black";
`;

export const ContinueButton = styled.TouchableOpacity`
  background-color: ${colors.ui.primary};
  padding: 10px;
  align-items: center;
  border-radius: 100px;
  height: 48px;
  margin-top: 5px;
`;

export const ContinueButtonText = styled(Text)`
  color: ${colors.text.inverse};
  font-weight: ${fontWeights.bold};
`;

export const SocialButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const SocialButton = styled.TouchableOpacity`
  border-color: gray;
  padding: 15px 24px 15px 24px;
  border-radius: 5px;
  border-width: 1px;
`;

export const SignupFooterText = styled(Text)`
  text-align: center;
  margin-top: 20px;
  color: ${colors.text.primary};
`;

export const SupportText = styled(Text)`
  text-align: center;
  margin-top: 20px;
  color: ${colors.text.secondary};
`;

export const PickerWrapper = styled.View`
  flex: 1;
  border-width: 0.5px;
  border-color: rgba(196, 196, 196, 1);
  border-radius: 10px;
  justify-content: center;
  height: 48px;
  padding-left: 10px;
  position: relative;
`;

export const PasswordContainer = styled.View`
  flex: 1;
  border-width: 0.5px;
  border-color: rgba(196, 196, 196, 1);
  border-radius: 10px;
  justify-content: center;
  height: 48px;
  padding-left: 10px;
  position: relative;
  z-index: 99;
`;

export const PasswordInput = styled.TextInput`
  padding: 10px;
  color: "black";
`;
export const PhoneInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  border-width: 0.5px;
  border-color: rgba(196, 196, 196, 1);
  border-radius: 10px;

  margin-top: 10px;
`;

export const PhoneInput = styled.TextInput`
  flex: 1;
  border-radius: 10px;
  height: 48px;
  padding: 10px;
`;

export const CountryFlagBox = styled.View`
  height: 48px;
  padding: 0px 8px 0px 8px;
  border-radius: 6px 0px 0px 6px;
  background-color: rgba(243, 245, 249, 1);
  align-items: center;
  justify-content: center;
`;

export const PhoneBox = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding-left: 10px;
`;

export const LinkText = styled.Text`
  color: ${colors.ui.primary};
  font-weight: ${fontWeights.bold};
`;

export const OTPContainer = styled.View`
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.15);
  width: 90%;
  margin-top: 20px;
`;
export const OTPInput = styled.TextInput`
  border-width: 1px;
  border-color: rgba(196, 196, 196, 1);
  border-radius: 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  margin: 0 5px;
  background-color: white;
`;

export const OtpBackground = styled.ImageBackground.attrs({
  source: require("@/assets/Onboarding3.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgba(31, 108, 171, 1);
  width: 100%;
`;

export const MailCover = styled.View`
  background-color: rgba(249, 249, 249, 1);
  width: 80px;
  height: 80px;
  border-radius: 80px;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  align-items: center;
  border-radius: 100px;
  margin-top: 20px;
  width: 90%;
  height: 48px;
`;

export const SubmitButtonText = styled(Text)`
  color: rgba(31, 108, 171, 1);
  font-weight: ${fontWeights.bold};
`;

export const OTPHeaderText = styled(Text)`
  font-size: 16px;
  color: ${colors.text.inverse};
  font-weight: ${fontWeights.regular};
  padding-top: 16px;
`;

export const OTPHeaderSubHeaderText = styled(Text)`
  font-size: 16px;
  color: ${colors.text.inverse};
  font-weight: ${fontWeights.regular};
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const OTPFooterText = styled(Text)`
  font-size: 14px;
  color: ${colors.text.inverse};
  font-weight: ${fontWeights.regular};
`;
