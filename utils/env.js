import { Platform } from "react-native";

const liveHost = "https://paybillsbackend.onrender.com";
const localHost = "https://paybillsbackend.onrender.com";

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = true;
export const host = !isDevelopment || isAndroid ? liveHost : localHost;


