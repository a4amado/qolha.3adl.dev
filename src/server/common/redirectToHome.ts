export default function RedirectToHome() {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
