const regulatedLocations = require("./data/regulatedLocations");
const { regulatedCities, regulatedCounties } = regulatedLocations;

exports.createPages = async function({ actions, graphql }) {
  Object.keys(regulatedCities).forEach(city => {
    const slug = "/eligibility/cities/" + city;
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/city.js"),
      context: { slug: slug }
    });

    const slugEs = "/es/eligibility/cities/" + city;
    actions.createPage({
      path: slugEs,
      component: require.resolve("./src/templates/city-es.js"),
      context: { slug: slugEs }
    });
  });

  Object.keys(regulatedCounties).forEach(county => {
    const slug = "/eligibility/counties/" + county;
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/county.js"),
      context: { slug: slug }
    });

    const slugEs = "/es/eligibility/counties/" + county;
    actions.createPage({
      path: slugEs,
      component: require.resolve("./src/templates/county-es.js"),
      context: { slug: slugEs }
    });
  });
};
