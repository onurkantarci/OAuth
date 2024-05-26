import axiosService from "./axios-service";

export async function checkAuthentication(): Promise<boolean> {
  try {
    const response = await axiosService.get("/auth/me");
    return !!response.data.accessToken;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}
