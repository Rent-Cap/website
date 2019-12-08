const controlCities = [
    'Alameda',
    'Berkeley',
    'Beverly Hills',
    'East Palo Alto',
    'Hayward',
    'Los Angeles',
    'Los Gatos',
    'Oakland',
    'Palm Springs',
    'San Francisco',
    'San Jose',
    'Santa Monica',
    'West Hollywood',
]
const controlCounties = [
    'San Francisco',
    'Los Angeles',
]

exports.createPages = async function({ actions, graphql }) {
    controlCities.forEach(city => {
        const slug = '/eligibility/cities/' + city;
        actions.createPage({
            path: slug,
            component: require.resolve('./src/templates/city.js'),
            context: {slug: slug},
        })
    });
 
    controlCounties.forEach(county => {
        const slug = '/eligibility/counties/' + county;
        actions.createPage({
            path: slug,
            component: require.resolve('./src/templates/county.js'),
            context: {slug: slug},
        })
    });
    
  }