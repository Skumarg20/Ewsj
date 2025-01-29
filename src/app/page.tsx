
import Hero from "./components/Hero";
import Services from "./components/Ourservice";
import Contact from "./components/Contact";
import Blog from "./components/Blog";

export default function Home() {
  return (
  <>
 <div>
  <Hero/>
 </div>

<div>
  <Services/>
</div>

<div>
  <Contact/>
</div>

<div><Blog/></div>
  </>
  );
}
