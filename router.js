import renderMain from "./pages/main/main.js";
import renderAbout from "./pages/about/about.js";
import renderDetails from "./pages/details/details.js";

export default function () {
  window.router = new Navigo("/", { hash: true });

  router
    .on({
      "/": () => {
        // call updatePageLinks to let navigo handle the links
        // when new links have been inserted into the dom
        renderMain().then(router.updatePageLinks);
      },
      about: () => {
        renderAbout();
      },
      details: () => {
        renderDetails();
      },
    })
    .resolve();
}