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
  });

  Object.keys(regulatedCounties).forEach(county => {
    const slug = "/eligibility/counties/" + county;
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/county.js"),
      context: { slug: slug }
    });
  });
};
