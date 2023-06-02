import Menu from "@/components/Menu";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="flex flex-row items-center ">
        <Menu />
        <div className="w-full">
          <Component {...pageProps} />;
        </div>
      </div>
    </>
  );
}
