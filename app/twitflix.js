//@ sourceURL=twitflix.js

// Whether to print out new media names when discovered.
const PRINT_MEDIA_NAMES = false;

// Whether to show the histogram.
const SHOW_HISTOGRAM = false;

// The current active tile as: (ID, media name, boxart element).
var activeTile = null;

// All media names we know of so far.
const mediaNames = new Set();

// Unique identifier for a tile's canvas element.
const canvasContainerID = (tileID) =>
  `twitflix-canvas-container-${tileID}`;


// An identifier to uniquely identify a Twitflix tile.
function newTileID() {
  _tileID++;
  return `twitflix-${_tileID - 1}`;
}
var _tileID = 1;


// Return the film data from the large data object.
function filmData(name) {
  return _filmData[name];
}
const _filmData = {"Isn't It Romantic": {'genre': 'Comedy, Fantasy, Romance', 'rotten-tomatoes': '68%', 'imdb': '6.1/10', 'metacritic': '60/100', 'scores': {'mean_scores': {'neg': 0.038029850746268655, 'neu': 0.7287276119402987, 'pos': 0.23322761194029842, 'compound': 0.4980473880597014}, 'failed': 50}, 'critic_score': '6', 'agreement': 'Strong agreement'}, 'The Blacklist': {'genre': 'Crime, Drama, Mystery, Thriller', 'rotten-tomatoes': 0, 'imdb': '8.1/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.028037234042553195, 'neu': 0.8842659574468085, 'pos': 0.08769148936170214, 'compound': 0.13055319148936173}, 'failed': 35}, 'critic_score': '8.1', 'agreement': 'General agreement'}, 'Birdman or (The Unexpected Virtue of Ignorance)': {'genre': 'Comedy, Drama', 'rotten-tomatoes': '91%', 'imdb': '7.7/10', 'metacritic': '88/100', 'scores': {'mean_scores': {'neg': 0.12079752066115701, 'neu': 0.6763512396694217, 'pos': 0.19871487603305793, 'compound': 0.2775037190082643}, 'failed': 51}, 'critic_score': '8.8', 'agreement': 'General agreement'}, 'The Good Place': {'genre': 'Comedy, Drama, Fantasy, Romance', 'rotten-tomatoes': 0, 'imdb': '8.2/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.0384551282051282, 'neu': 0.6874807692307692, 'pos': 0.26766666666666655, 'compound': 0.5230929487179483}, 'failed': 22}, 'critic_score': '8.2', 'agreement': 'Strong agreement'}, 'Queer Eye': {'genre': 'Reality-TV', 'rotten-tomatoes': 0, 'imdb': '8.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.05205022831050229, 'neu': 0.8124885844748857, 'pos': 0.1354566210045662, 'compound': 0.25699132420091314}, 'failed': 39}, 'critic_score': '8.4', 'agreement': 'General agreement'}, 'For the Love of Spock': {'genre': 'Documentary, Biography', 'rotten-tomatoes': '100%', 'imdb': '7.6/10', 'metacritic': '74/100', 'scores': {'mean_scores': {'neg': 0.02634240362811792, 'neu': 0.6624739229024941, 'pos': 0.31119047619047596, 'compound': 0.7080086167800465}, 'failed': 17}, 'critic_score': '7.4', 'agreement': 'Very strong agreement'}, 'Conan Without Borders': {'genre': '', 'rotten-tomatoes': 0, 'imdb': 0, 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.051312380952380984, 'neu': 0.7523809523809524, 'pos': 0.19629142857142853, 'compound': 0.38954457142857163}, 'failed': 77}, 'critic_score': 'NA', 'agreement': 'General agreement'}, 'House of Cards': {'genre': 'Drama', 'rotten-tomatoes': 0, 'imdb': '8.8/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.05014444444444444, 'neu': 0.8557999999999998, 'pos': 0.09406666666666667, 'compound': 0.09509222222222223}, 'failed': 37}, 'critic_score': '8.8', 'agreement': 'General agreement'}, "Larry Charles' Dangerous World of Comedy": {'genre': 'N/A', 'rotten-tomatoes': 0, 'imdb': '7.5/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.1619090909090909, 'neu': 0.6841818181818182, 'pos': 0.1538181818181818, 'compound': -0.0522818181818182}, 'failed': 3}, 'critic_score': '7.5', 'agreement': 'Mixed opinions'}, 'The Walking Dead': {'genre': 'Drama, Horror, Sci-Fi, Thriller', 'rotten-tomatoes': 0, 'imdb': '8.3/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.2629391891891891, 'neu': 0.6503243243243244, 'pos': 0.08673648648648648, 'compound': -0.4398506756756758}, 'failed': 44}, 'critic_score': '8.3', 'agreement': 'Strong agreement'}, 'Jane The Virgin': {'genre': 'Comedy', 'rotten-tomatoes': 0, 'imdb': '7.8/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.05155309734513275, 'neu': 0.8555929203539822, 'pos': 0.09288053097345134, 'compound': 0.12427699115044247}, 'failed': 45}, 'critic_score': '7.8', 'agreement': 'General agreement'}, 'Russian Doll': {'genre': 'Comedy, Drama, Mystery', 'rotten-tomatoes': 0, 'imdb': '8.1/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.022066433566433567, 'neu': 0.8437167832167837, 'pos': 0.13422377622377626, 'compound': 0.2770653846153845}, 'failed': 90}, 'critic_score': '8.1', 'agreement': 'General agreement'}, 'New Girl': {'genre': 'Comedy', 'rotten-tomatoes': 0, 'imdb': '7.7/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.06624305555555554, 'neu': 0.8334861111111107, 'pos': 0.10028472222222219, 'compound': 0.10300694444444446}, 'failed': 20}, 'critic_score': '7.7', 'agreement': 'General agreement'}, 'Nightflyers': {'genre': 'Horror, Sci-Fi', 'rotten-tomatoes': 0, 'imdb': '6.0/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.031804687500000005, 'neu': 0.8851289062499998, 'pos': 0.08307031249999997, 'compound': 0.08260937500000004}, 'failed': 375}, 'critic_score': '6', 'agreement': 'General agreement'}, 'BoJack Horseman': {'genre': 'Animation, Comedy, Drama', 'rotten-tomatoes': 0, 'imdb': '8.5/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.07127044025157234, 'neu': 0.8263522012578616, 'pos': 0.10238364779874216, 'compound': 0.09597924528301886}, 'failed': 43}, 'critic_score': '8.5', 'agreement': 'General agreement'}, 'Blade Runner: The Final Cut': {'genre': '', 'rotten-tomatoes': 0, 'imdb': 0, 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.12463475177304957, 'neu': 0.7765567375886532, 'pos': 0.09879432624113471, 'compound': 0.05627340425531919}, 'failed': 19}, 'critic_score': 'NA', 'agreement': 'Mixed opinions'}, 'FYRE: The Greatest Party That Never Happened': {'genre': '', 'rotten-tomatoes': 0, 'imdb': 0, 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.04453644859813087, 'neu': 0.605429906542055, 'pos': 0.35002803738317767, 'compound': 0.7383816822429892}, 'failed': 72}, 'critic_score': 'NA', 'agreement': 'Very strong agreement'}, 'GoodFellas': {'genre': 'Crime, Drama', 'rotten-tomatoes': '96%', 'imdb': '8.7/10', 'metacritic': '89/100', 'scores': {'mean_scores': {'neg': 0.054864130434782624, 'neu': 0.8304891304347827, 'pos': 0.11465760869565216, 'compound': 0.18269239130434775}, 'failed': 16}, 'critic_score': '8.9', 'agreement': 'General agreement'}, 'The Umbrella Academy': {'genre': 'Action, Adventure, Comedy, Crime, Drama, Fantasy', 'rotten-tomatoes': 0, 'imdb': '8.3/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.021920972644376903, 'neu': 0.7653981762917936, 'pos': 0.2096413373860183, 'compound': 0.2266121580547113}, 'failed': 264}, 'critic_score': '8.3', 'agreement': 'General agreement'}, 'Rick and Morty': {'genre': 'Animation, Adventure, Comedy, Sci-Fi', 'rotten-tomatoes': 0, 'imdb': '9.3/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.04789655172413794, 'neu': 0.8416120689655173, 'pos': 0.10187068965517242, 'compound': 0.11985948275862067}, 'failed': 19}, 'critic_score': '9.3', 'agreement': 'General agreement'}, 'The Godfather': {'genre': 'Crime, Drama', 'rotten-tomatoes': 0, 'imdb': '9.2/10', 'metacritic': '100/100', 'scores': {'mean_scores': {'neg': 0.052203703703703704, 'neu': 0.8380925925925925, 'pos': 0.10969444444444444, 'compound': 0.1506074074074074}, 'failed': 7}, 'critic_score': '10', 'agreement': 'General agreement'}, 'Jurassic Park': {'genre': 'Adventure, Sci-Fi, Thriller', 'rotten-tomatoes': '91%', 'imdb': '8.1/10', 'metacritic': '68/100', 'scores': {'mean_scores': {'neg': 0.03821383647798741, 'neu': 0.8520503144654091, 'pos': 0.10976729559748427, 'compound': 0.22042012578616355}, 'failed': 30}, 'critic_score': '6.8', 'agreement': 'General agreement'}, 'Friends from College': {'genre': 'Comedy, Drama', 'rotten-tomatoes': 0, 'imdb': '6.8/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.042245353159851305, 'neu': 0.663565055762082, 'pos': 0.29418959107806686, 'compound': 0.5216884758364305}, 'failed': 28}, 'critic_score': '6.8', 'agreement': 'Strong agreement'}, 'Star Trek: Deep Space Nine': {'genre': 'Action, Adventure, Drama, Sci-Fi', 'rotten-tomatoes': 0, 'imdb': '7.9/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03310882352941176, 'neu': 0.8620941176470589, 'pos': 0.10480000000000003, 'compound': 0.25348294117647047}, 'failed': 15}, 'critic_score': '7.9', 'agreement': 'General agreement'}, 'The Ranch': {'genre': 'Comedy, Drama', 'rotten-tomatoes': 0, 'imdb': '7.6/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.06621100917431191, 'neu': 0.8382201834862385, 'pos': 0.09555963302752299, 'compound': 0.07455504587155967}, 'failed': 10}, 'critic_score': '7.6', 'agreement': 'Mixed opinions'}, 'Archer': {'genre': 'Animation, Action, Comedy', 'rotten-tomatoes': 0, 'imdb': '8.7/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.07252727272727273, 'neu': 0.8277636363636364, 'pos': 0.09970909090909089, 'compound': 0.07392545454545454}, 'failed': 5}, 'critic_score': '8.7', 'agreement': 'Mixed opinions'}, 'The Hangover': {'genre': 'Comedy', 'rotten-tomatoes': '78%', 'imdb': '7.7/10', 'metacritic': '73/100', 'scores': {'mean_scores': {'neg': 0.052272189349112444, 'neu': 0.8046686390532546, 'pos': 0.1430532544378698, 'compound': 0.2536467455621302}, 'failed': 6}, 'critic_score': '7.3', 'agreement': 'General agreement'}, 'Arrested Development': {'genre': 'Comedy', 'rotten-tomatoes': 0, 'imdb': '8.9/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.19304166666666672, 'neu': 0.6999444444444443, 'pos': 0.10702083333333336, 'compound': -0.16116458333333325}, 'failed': 38}, 'critic_score': '8.9', 'agreement': 'General agreement'}, 'Demolition Man': {'genre': 'Action, Crime, Sci-Fi, Thriller', 'rotten-tomatoes': '61%', 'imdb': '6.6/10', 'metacritic': '34/100', 'scores': {'mean_scores': {'neg': 0.04963675213675214, 'neu': 0.8438760683760684, 'pos': 0.10646581196581195, 'compound': 0.1487239316239316}, 'failed': 26}, 'critic_score': '3.4', 'agreement': 'General agreement'}, 'Ken Jeong: You Complete Me, Ho': {'genre': 'N/A', 'rotten-tomatoes': '20%', 'imdb': '5.7/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.021724137931034483, 'neu': 0.7582758620689654, 'pos': 0.22, 'compound': 0.6385862068965518}, 'failed': 4}, 'critic_score': '5.7', 'agreement': 'Very strong agreement'}, 'Ray Romano: Right Here, Around the Corner': {'genre': 'Documentary, Comedy', 'rotten-tomatoes': '60%', 'imdb': '7.3/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.0, 'neu': 0.9091599999999999, 'pos': 0.09083999999999999, 'compound': 0.205912}, 'failed': 6}, 'critic_score': '7.3', 'agreement': 'General agreement'}, 'Black Mirror': {'genre': 'Drama, Sci-Fi, Thriller', 'rotten-tomatoes': 0, 'imdb': '8.9/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.044461538461538455, 'neu': 0.8557499999999997, 'pos': 0.09977884615384615, 'compound': 0.1373826923076923}, 'failed': 54}, 'critic_score': '8.9', 'agreement': 'General agreement'}, 'Trailer Park Boys': {'genre': 'Comedy, Crime', 'rotten-tomatoes': 0, 'imdb': '8.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.0665193370165746, 'neu': 0.816093922651934, 'pos': 0.11738121546961329, 'compound': 0.13335580110497247}, 'failed': 12}, 'critic_score': '8.4', 'agreement': 'General agreement'}, "Workin' Moms": {'genre': 'Comedy', 'rotten-tomatoes': 0, 'imdb': '5.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.0323, 'neu': 0.8020153846153848, 'pos': 0.16568076923076921, 'compound': 0.34929115384615395}, 'failed': 12}, 'critic_score': '5.4', 'agreement': 'General agreement'}, 'Sherlock': {'genre': 'Crime, Drama, Mystery, Thriller', 'rotten-tomatoes': 0, 'imdb': '9.2/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03827083333333333, 'neu': 0.8306041666666669, 'pos': 0.1310833333333333, 'compound': 0.27650208333333337}, 'failed': 19}, 'critic_score': '9.2', 'agreement': 'General agreement'}, 'Inside the Mossad': {'genre': '', 'rotten-tomatoes': 0, 'imdb': 0, 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.04306557377049181, 'neu': 0.8902295081967213, 'pos': 0.0667377049180328, 'compound': 0.05703114754098361}, 'failed': 9}, 'critic_score': 'NA', 'agreement': 'Mixed opinions'}, "Monty Python's Life of Brian": {'genre': '', 'rotten-tomatoes': 0, 'imdb': 0, 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03776285714285714, 'neu': 0.8683199999999998, 'pos': 0.0939142857142857, 'compound': 0.17083371428571428}, 'failed': 18}, 'critic_score': 'NA', 'agreement': 'General agreement'}, 'The Big Short': {'genre': 'Biography, Comedy, Drama, History', 'rotten-tomatoes': '88%', 'imdb': '7.8/10', 'metacritic': '81/100', 'scores': {'mean_scores': {'neg': 0.0691546052631579, 'neu': 0.7983289473684207, 'pos': 0.12919736842105267, 'compound': 0.18395559210526308}, 'failed': 50}, 'critic_score': '8.1', 'agreement': 'General agreement'}, 'Teen Wolf': {'genre': 'Action, Drama, Fantasy, Romance, Thriller', 'rotten-tomatoes': 0, 'imdb': '7.7/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03577894736842105, 'neu': 0.8719052631578952, 'pos': 0.09233684210526316, 'compound': 0.14985894736842106}, 'failed': 37}, 'critic_score': '7.7', 'agreement': 'General agreement'}, 'Period. End of Sentence.': {'genre': 'Documentary, Short', 'rotten-tomatoes': 0, 'imdb': '7.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.021529953917050693, 'neu': 0.8426082949308752, 'pos': 0.13582949308755765, 'compound': 0.24342119815668195}, 'failed': 18}, 'critic_score': '7.4', 'agreement': 'General agreement'}, 'Dave Chappelle: Equanimity & The Bird Revelation': {'genre': 'Documentary, Comedy', 'rotten-tomatoes': 0, 'imdb': '8.1/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.01573566878980892, 'neu': 0.8960207006369427, 'pos': 0.08824363057324834, 'compound': 0.18696640127388517}, 'failed': 37}, 'critic_score': '8.1', 'agreement': 'General agreement'}, 'Brooklyn Nine-Nine': {'genre': 'Comedy, Crime', 'rotten-tomatoes': 0, 'imdb': '8.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.02269963369963371, 'neu': 0.9218534798534799, 'pos': 0.055446886446886445, 'compound': 0.0913897435897436}, 'failed': 136}, 'critic_score': '8.4', 'agreement': 'General agreement'}, 'American Crime Story': {'genre': 'Biography, Crime, Drama', 'rotten-tomatoes': 0, 'imdb': '8.5/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.2604924623115574, 'neu': 0.679522613065326, 'pos': 0.059964824120603014, 'compound': -0.4522442211055274}, 'failed': 78}, 'critic_score': '8.5', 'agreement': 'Strong agreement'}, 'World War II in Colour': {'genre': 'Documentary, War', 'rotten-tomatoes': 0, 'imdb': '8.7/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.23698476190476223, 'neu': 0.6875790476190468, 'pos': 0.07543047619047617, 'compound': -0.42765123809523864}, 'failed': 79}, 'critic_score': '8.7', 'agreement': 'Strong agreement'}, 'Theo Maassen: VANKWAADTOTERGER': {'genre': 'Documentary, Comedy', 'rotten-tomatoes': 0, 'imdb': '7.6/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.0, 'neu': 0.949, 'pos': 0.051, 'compound': 0.06743333333333333}, 'failed': 25}, 'critic_score': '7.6', 'agreement': 'General agreement'}, 'James Acaster: Repertoire': {'genre': 'Comedy', 'rotten-tomatoes': 0, 'imdb': '8.3/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03475856443719412, 'neu': 0.7589445350734085, 'pos': 0.20628058727569332, 'compound': 0.4670778140293642}, 'failed': 51}, 'critic_score': '8.3', 'agreement': 'Strong agreement'}, 'The Big Lebowski': {'genre': 'Comedy, Crime', 'rotten-tomatoes': '82%', 'imdb': '8.1/10', 'metacritic': '71/100', 'scores': {'mean_scores': {'neg': 0.040822629969418975, 'neu': 0.8715045871559637, 'pos': 0.08767889908256882, 'compound': 0.15318990825688075}, 'failed': 28}, 'critic_score': '7.1', 'agreement': 'General agreement'}, 'Disenchantment': {'genre': 'Animation, Adventure, Comedy, Fantasy', 'rotten-tomatoes': 0, 'imdb': '7.2/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.04151184834123224, 'neu': 0.8298767772511851, 'pos': 0.12386729857819902, 'compound': 0.1866222748815165}, 'failed': 52}, 'critic_score': '7.2', 'agreement': 'General agreement'}, 'Ricky Gervais: Humanity': {'genre': 'Comedy', 'rotten-tomatoes': '43%', 'imdb': '7.9/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.06521881838074396, 'neu': 0.7100809628008751, 'pos': 0.22468490153172868, 'compound': 0.4119437636761488}, 'failed': 12}, 'critic_score': '7.9', 'agreement': 'General agreement'}, 'Bodyguard': {'genre': 'Crime, Drama, Thriller', 'rotten-tomatoes': 0, 'imdb': '8.2/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.04131297709923664, 'neu': 0.8586946564885495, 'pos': 0.09998473282442746, 'compound': 0.15625419847328242}, 'failed': 35}, 'critic_score': '8.2', 'agreement': 'General agreement'}, 'Sex Education': {'genre': 'Comedy, Drama', 'rotten-tomatoes': 0, 'imdb': '8.5/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03421348314606742, 'neu': 0.8423033707865172, 'pos': 0.12348314606741573, 'compound': 0.195170786516854}, 'failed': 67}, 'critic_score': '8.5', 'agreement': 'General agreement'}, 'Velvet Buzzsaw': {'genre': 'Horror, Mystery, Thriller', 'rotten-tomatoes': '65%', 'imdb': '5.8/10', 'metacritic': '61/100', 'scores': {'mean_scores': {'neg': 0.06844680851063828, 'neu': 0.8184361702127659, 'pos': 0.113127659574468, 'compound': 0.0855978723404256}, 'failed': 94}, 'critic_score': '6.1', 'agreement': 'Mixed opinions'}, 'ROMA': {'genre': 'Drama', 'rotten-tomatoes': 0, 'imdb': '7.9/10', 'metacritic': '96/100', 'scores': {'mean_scores': {'neg': 0.04641666666666667, 'neu': 0.822625, 'pos': 0.13095833333333334, 'compound': 0.2046875}, 'failed': 27}, 'critic_score': '9.6', 'agreement': 'General agreement'}, 'Serenity': {'genre': 'Action, Adventure, Sci-Fi, Thriller', 'rotten-tomatoes': '83%', 'imdb': '7.9/10', 'metacritic': '74/100', 'scores': {'mean_scores': {'neg': 0.07773684210526315, 'neu': 0.7236992481203005, 'pos': 0.10837593984962407, 'compound': 0.10666466165413534}, 'failed': 11}, 'critic_score': '7.4', 'agreement': 'General agreement'}, 'Crazy Ex-Girlfriend': {'genre': 'Comedy, Musical', 'rotten-tomatoes': 0, 'imdb': '7.7/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.16991578947368424, 'neu': 0.7389578947368419, 'pos': 0.09102105263157895, 'compound': -0.08909368421052628}, 'failed': 41}, 'critic_score': '7.7', 'agreement': 'Mixed opinions'}, 'Star Trek: Discovery': {'genre': 'Action, Adventure, Drama, Sci-Fi', 'rotten-tomatoes': 0, 'imdb': '7.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.04002991452991453, 'neu': 0.8753461538461539, 'pos': 0.08461111111111112, 'compound': 0.15306965811965817}, 'failed': 53}, 'critic_score': '7.4', 'agreement': 'General agreement'}, 'Star Trek: Voyager': {'genre': 'Action, Adventure, Sci-Fi', 'rotten-tomatoes': 0, 'imdb': '7.7/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.0441793893129771, 'neu': 0.848713740458015, 'pos': 0.10710305343511452, 'compound': 0.20450725190839678}, 'failed': 42}, 'critic_score': '7.7', 'agreement': 'General agreement'}, 'Dirty John': {'genre': 'N/A', 'rotten-tomatoes': 0, 'imdb': '7.1/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.1816666666666667, 'neu': 0.7064175084175079, 'pos': 0.11192255892255897, 'compound': -0.17195656565656559}, 'failed': 47}, 'critic_score': '7.1', 'agreement': 'General agreement'}, 'Gilmore Girls': {'genre': 'Comedy, Drama', 'rotten-tomatoes': 0, 'imdb': '8.2/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03563451776649747, 'neu': 0.8601167512690358, 'pos': 0.10423857868020298, 'compound': 0.22126091370558382}, 'failed': 34}, 'critic_score': '8.2', 'agreement': 'General agreement'}, 'Bo Burnham: Make Happy': {'genre': 'Documentary, Comedy, Music', 'rotten-tomatoes': 0, 'imdb': '8.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.02682539682539682, 'neu': 0.6109954648526081, 'pos': 0.3621609977324257, 'compound': 0.6030129251700679}, 'failed': 73}, 'critic_score': '8.4', 'agreement': 'Strong agreement'}, 'Pineapple Express': {'genre': 'Action, Comedy, Crime', 'rotten-tomatoes': 0, 'imdb': '7.0/10', 'metacritic': '64/100', 'scores': {'mean_scores': {'neg': 0.04344516129032258, 'neu': 0.8125225806451615, 'pos': 0.14400645161290318, 'compound': 0.2208406451612903}, 'failed': 12}, 'critic_score': '6.4', 'agreement': 'General agreement'}, 'The Americans': {'genre': 'Crime, Drama, Mystery, Thriller', 'rotten-tomatoes': 0, 'imdb': '8.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.06680769230769232, 'neu': 0.8404807692307692, 'pos': 0.09267307692307694, 'compound': 0.017638461538461537}, 'failed': 11}, 'critic_score': '8.4', 'agreement': 'Mixed opinions'}, 'Elementary': {'genre': 'Crime, Drama, Mystery', 'rotten-tomatoes': 0, 'imdb': '7.9/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.05261290322580645, 'neu': 0.8480645161290322, 'pos': 0.09932258064516129, 'compound': 0.1433483870967742}, 'failed': 13}, 'critic_score': '7.9', 'agreement': 'General agreement'}, 'Star Trek: The Next Generation': {'genre': 'Action, Adventure, Mystery, Sci-Fi', 'rotten-tomatoes': 0, 'imdb': '8.6/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03797478991596639, 'neu': 0.8683319327731088, 'pos': 0.09372689075630258, 'compound': 0.18496302521008412}, 'failed': 18}, 'critic_score': '8.6', 'agreement': 'General agreement'}, 'Bird Box': {'genre': 'Drama, Horror, Sci-Fi, Thriller', 'rotten-tomatoes': '63%', 'imdb': '6.7/10', 'metacritic': '51/100', 'scores': {'mean_scores': {'neg': 0.1257149758454107, 'neu': 0.7876038647343002, 'pos': 0.08667632850241544, 'compound': -0.07916231884057968}, 'failed': 91}, 'critic_score': '5.1', 'agreement': 'Mixed opinions'}, 'Bates Motel': {'genre': 'Drama, Horror, Mystery, Thriller', 'rotten-tomatoes': 0, 'imdb': '8.2/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.056291338582677174, 'neu': 0.8450236220472441, 'pos': 0.0986771653543307, 'compound': 0.08773228346456695}, 'failed': 84}, 'critic_score': '8.2', 'agreement': 'General agreement'}, 'Homeland': {'genre': 'Crime, Drama, Mystery, Thriller', 'rotten-tomatoes': 0, 'imdb': '8.3/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.0661594202898551, 'neu': 0.8546231884057972, 'pos': 0.07917391304347825, 'compound': 0.012692753623188406}, 'failed': 11}, 'critic_score': '8.3', 'agreement': 'Mixed opinions'}, 'The Alienist': {'genre': 'Drama, Mystery', 'rotten-tomatoes': 0, 'imdb': '7.8/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.02549484536082475, 'neu': 0.884046391752577, 'pos': 0.0904587628865979, 'compound': 0.16420154639175258}, 'failed': 73}, 'critic_score': '7.8', 'agreement': 'General agreement'}, 'Orange Is the New Black': {'genre': 'Comedy, Crime, Drama', 'rotten-tomatoes': 0, 'imdb': '8.1/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.04681944444444445, 'neu': 0.8705833333333333, 'pos': 0.08259722222222224, 'compound': 0.09014722222222225}, 'failed': 10}, 'critic_score': '8.1', 'agreement': 'Mixed opinions'}, 'Behind the Curve': {'genre': 'Documentary', 'rotten-tomatoes': 0, 'imdb': '6.8/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.08629310344827587, 'neu': 0.8349482758620691, 'pos': 0.07879310344827589, 'compound': -0.04706034482758622}, 'failed': 0}, 'critic_score': '6.8', 'agreement': 'Mixed opinions'}, 'Black Mirror: Bandersnatch': {'genre': 'Drama, Mystery, Sci-Fi, Thriller', 'rotten-tomatoes': 0, 'imdb': '7.3/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.05292083333333335, 'neu': 0.841316666666667, 'pos': 0.10577083333333322, 'compound': 0.07693916666666663}, 'failed': 131}, 'critic_score': '7.3', 'agreement': 'Mixed opinions'}, 'Great News': {'genre': 'Comedy', 'rotten-tomatoes': 0, 'imdb': '7.0/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.017365853658536583, 'neu': 0.6855121951219513, 'pos': 0.2971219512195123, 'compound': 0.7634439024390244}, 'failed': 2}, 'critic_score': '7', 'agreement': 'Very strong agreement'}, 'Northern Rescue': {'genre': 'Drama, Family', 'rotten-tomatoes': 0, 'imdb': '7.1/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.015551886792452828, 'neu': 0.7729103773584903, 'pos': 0.2115518867924529, 'compound': 0.4788801886792446}, 'failed': 28}, 'critic_score': '7.1', 'agreement': 'Strong agreement'}, 'Grace and Frankie': {'genre': 'Comedy', 'rotten-tomatoes': 0, 'imdb': '8.3/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03698571428571429, 'neu': 0.7234928571428578, 'pos': 0.23949285714285717, 'compound': 0.41117642857142805}, 'failed': 38}, 'critic_score': '8.3', 'agreement': 'Strong agreement'}, 'The Ballad of Buster Scruggs': {'genre': 'Comedy, Drama, Musical, Mystery, Romance, Western', 'rotten-tomatoes': '91%', 'imdb': '7.3/10', 'metacritic': '79/100', 'scores': {'mean_scores': {'neg': 0.04074691358024691, 'neu': 0.8471574074074074, 'pos': 0.10900925925925936, 'compound': 0.19602037037037037}, 'failed': 67}, 'critic_score': '7.9', 'agreement': 'General agreement'}, 'The Affair': {'genre': 'Drama', 'rotten-tomatoes': 0, 'imdb': '8.0/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.06239344262295084, 'neu': 0.8516229508196722, 'pos': 0.0859672131147541, 'compound': 0.0718377049180328}, 'failed': 17}, 'critic_score': '8', 'agreement': 'Mixed opinions'}, "That '70s Show": {'genre': 'Comedy, Romance', 'rotten-tomatoes': 0, 'imdb': '8.1/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.041350467289719625, 'neu': 0.8675607476635516, 'pos': 0.09108878504672901, 'compound': 0.1400369158878505}, 'failed': 37}, 'critic_score': '8.1', 'agreement': 'General agreement'}, 'The Hunger Games: Mockingjay - Part 2': {'genre': 'Action, Adventure, Sci-Fi, Thriller', 'rotten-tomatoes': '70%', 'imdb': '6.6/10', 'metacritic': '65/100', 'scores': {'mean_scores': {'neg': 0.16948128342245986, 'neu': 0.7561016042780754, 'pos': 0.07440106951871658, 'compound': -0.17236737967914442}, 'failed': 22}, 'critic_score': '6.5', 'agreement': 'General agreement'}, 'The Toys That Made Us': {'genre': 'Documentary, History', 'rotten-tomatoes': 0, 'imdb': '8.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.028678185745140385, 'neu': 0.8507926565874729, 'pos': 0.12052699784017276, 'compound': 0.30445572354211686}, 'failed': 86}, 'critic_score': '8.4', 'agreement': 'General agreement'}, 'Once Upon a Time': {'genre': 'Adventure, Fantasy, Romance', 'rotten-tomatoes': 0, 'imdb': '7.8/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.03727777777777778, 'neu': 0.8608444444444446, 'pos': 0.10183333333333335, 'compound': 0.19915888888888894}, 'failed': 14}, 'critic_score': '7.8', 'agreement': 'General agreement'}, 'Money Heist': {'genre': 'Short, Comedy', 'rotten-tomatoes': 0, 'imdb': 0, 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.049811881188118814, 'neu': 0.8288910891089109, 'pos': 0.1212937293729373, 'compound': 0.1447630363036303}, 'failed': 66}, 'critic_score': 'NA', 'agreement': 'General agreement'}, 'Sick Note': {'genre': 'Comedy, Crime', 'rotten-tomatoes': 0, 'imdb': '6.8/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.24867676767676763, 'neu': 0.6633232323232324, 'pos': 0.08798989898989898, 'compound': -0.29341616161616174}, 'failed': 73}, 'critic_score': '6.8', 'agreement': 'General agreement'}, 'The Mask': {'genre': 'Comedy, Fantasy', 'rotten-tomatoes': '77%', 'imdb': '6.9/10', 'metacritic': '56/100', 'scores': {'mean_scores': {'neg': 0.048728571428571434, 'neu': 0.8541714285714287, 'pos': 0.09714285714285717, 'compound': 0.16895571428571424}, 'failed': 8}, 'critic_score': '5.6', 'agreement': 'General agreement'}, 'Going in Style': {'genre': 'Comedy, Crime', 'rotten-tomatoes': '82%', 'imdb': '6.6/10', 'metacritic': '50/100', 'scores': {'mean_scores': {'neg': 0.03636216216216217, 'neu': 0.7748594594594591, 'pos': 0.18878918918918924, 'compound': 0.3262654054054051}, 'failed': 43}, 'critic_score': '5', 'agreement': 'General agreement'}, 'Riverdale': {'genre': 'Crime, Drama, Mystery, Romance', 'rotten-tomatoes': 0, 'imdb': '7.4/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.07560204081632654, 'neu': 0.8155918367346937, 'pos': 0.10879591836734691, 'compound': 0.09175816326530614}, 'failed': 40}, 'critic_score': '7.4', 'agreement': 'Mixed opinions'}, "Monty Python's Flying Circus": {'genre': 'Comedy', 'rotten-tomatoes': 0, 'imdb': '8.8/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.0424295532646048, 'neu': 0.8742749140893471, 'pos': 0.08329553264604814, 'compound': 0.13786219931271484}, 'failed': 29}, 'critic_score': '8.8', 'agreement': 'General agreement'}, 'Monty Python and the Holy Grail': {'genre': 'Adventure, Comedy, Fantasy', 'rotten-tomatoes': '97%', 'imdb': '8.3/10', 'metacritic': '93/100', 'scores': {'mean_scores': {'neg': 0.03531851851851853, 'neu': 0.8741703703703702, 'pos': 0.09051851851851854, 'compound': 0.16562691358024675}, 'failed': 12}, 'critic_score': '9.3', 'agreement': 'General agreement'}, 'A Series of Unfortunate Events': {'genre': 'Adventure, Comedy, Family, Fantasy', 'rotten-tomatoes': '72%', 'imdb': '6.8/10', 'metacritic': '62/100', 'scores': {'mean_scores': {'neg': 0.26227865168539305, 'neu': 0.6638719101123602, 'pos': 0.07275168539325845, 'compound': -0.3129397752808977}, 'failed': 109}, 'critic_score': '6.2', 'agreement': 'General agreement'}, 'The Nice Guys': {'genre': 'Action, Comedy, Crime, Mystery, Thriller', 'rotten-tomatoes': '93%', 'imdb': '7.4/10', 'metacritic': '70/100', 'scores': {'mean_scores': {'neg': 0.059826086956521744, 'neu': 0.709782608695652, 'pos': 0.20869565217391295, 'compound': 0.47077173913043463}, 'failed': 0}, 'critic_score': '7', 'agreement': 'Strong agreement'}, 'The Departed': {'genre': 'Crime, Drama, Thriller', 'rotten-tomatoes': '91%', 'imdb': '8.5/10', 'metacritic': '85/100', 'scores': {'mean_scores': {'neg': 0.05518072289156627, 'neu': 0.8118012048192769, 'pos': 0.13303614457831328, 'compound': 0.22362228915662655}, 'failed': 7}, 'critic_score': '8.5', 'agreement': 'General agreement'}, 'Better Call Saul': {'genre': 'Crime, Drama', 'rotten-tomatoes': 0, 'imdb': '8.7/10', 'metacritic': 0, 'scores': {'mean_scores': {'neg': 0.06627325581395348, 'neu': 0.7059883720930228, 'pos': 0.22773837209302325, 'compound': 0.37970058139534857}, 'failed': 35}, 'critic_score': '8.7', 'agreement': 'General agreement'}};


// Attach a graph of given data to a canvas element.
function attachGraph(canvasContext, sentiments) {
  new Chart(canvasContext, {
    type: 'line',
    data: {
      datasets: [{
        data: sentiments.map(x => x[0]),
        label: "Sentiment",
        borderColor: "#3e95cd",
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}


// JS doesn't have a mean function!!
function mean(numbers) {
  var total = 0, i;
  for (i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
  }
  return total / numbers.length;
}


// Right side of twitflix box, a histogram.
function showHistogram(tileID, height, width, right, data) {
  var canvas = document.createElement('canvas');
  canvas.id = canvasContainerID(tileID);
  right.style.position = 'relative';
  right.style.height = `${height}px`;
  right.style.width = `${width * 0.66}px`;
  right.appendChild(canvas);

  attachGraph(canvas.getContext('2d'), data["sentiments"]);
}


// Convert a value from one range to another range.
// e.g. convertRange(5, [0, 10], [0, 100]) = 50.
function convertRange( value, r1, r2 ) {
  return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}


// Return a new div with given score text.
function scoreDiv(textAbove, textBelow) {
  const div = document.createElement('div');
  div.className = 'twitflix-score-elem';
  const above = document.createElement('div');
  above.className = 'twitflix-score-above';
  above.innerHTML = textAbove;
  const below = document.createElement('div');
  below.className = 'twitflix-score-below';
  below.innerHTML = textBelow;
  div.appendChild(above);
  div.appendChild(below);
  return div;
}


// Inner contents of some tile, for some media title.
function newInnerTile(tileID, name, height, width) {
  var main = document.createElement('div');
  main.className = 'twitflix-tile-main';
  var left = document.createElement('div');
  left.className = 'twitflix-tile-scores';
  var right = document.createElement('div');
  main.appendChild(left);
  main.appendChild(right);

  const data = filmData(name);
  const criticScore = data["critic_score"];
  const userDescription = data["agreement"];
  const userCompound = data["scores"]["mean_scores"]["compound"];
  const userScore_ = convertRange(userCompound, [-1, 1], [0, 10]);
  const userScore = +userScore_.toFixed(1);

  // Left side, critic and user score.
  var criticScoreEl = scoreDiv(`${criticScore}`, "Critics");
  var userScoreEl = scoreDiv(`${userScore}`, `Twitter<br>(${userDescription})`);
  left.appendChild(criticScoreEl);
  left.appendChild(userScoreEl);

  if (SHOW_HISTOGRAM) {
    right.className = 'twitflix-tile-graph';
    showHistogram(tileID, height, width, right, data);
  }

  return main;
}


// Return a new Twitflix tile of given size, position and media data.
//
// The tile is not yet attached to the DOM.
function newTile(tileID, height, width, left, top, name) {
  var tile = document.createElement('div');
  tile.id = tileID;
  tile.className = 'twitflix-tile';
  tile.style.height = `${height}px`;
  tile.style.width = `${width}px`;
  tile.style.position = 'absolute';
  tile.style.left = `${left}px`;
  tile.style.top =
    `${top - document.body.getBoundingClientRect().top - height}px`;
  tile.appendChild(newInnerTile(tileID, name, height, width));
  return tile;
}


// A new Twitflix tile is added to the DOM, above the given boxart element.
//
// Removes the current active tile if it exists. Also registers a function to
// resize the tile if the media box resizes or the page resizes.
function showNewTile(boxart, name) {
  if (activeTile == null || activeTile[1] != name) {
    const height = boxart.clientHeight;
    const width = boxart.clientWidth;
    const boxPosition = boxart.getBoundingClientRect();
    const tileID = newTileID();
    const tile = newTile(
      tileID, height, width, boxPosition.left, boxPosition.top, name);

    if (activeTile != null) {
      const [activeTileID, activeTileName, activeTileBoxart] = activeTile;
      const activeTileElem = document.getElementById(activeTileID);
      activeTileElem.parentNode.removeChild(activeTileElem);
    }
    document.body.insertBefore(tile, document.body.firstChild);
    activeTile = [tileID, name, boxart];
  }
}


// Register handlers to show Twitflix tiles above media boxes on mouse enter.
//
// The handler will not run if a Twitflix tile already exists for that media.
// Only media shown on the page is affected, so this function should be run
// again on page scroll.
function registerTilesOnPage() {
  const namesAndBoxarts = getNamesAndBoxarts();
  for (var i = 0; i < namesAndBoxarts.length; i ++) {
    const name = namesAndBoxarts[i][0];
    const boxart = namesAndBoxarts[i][1];
    if (!mediaNames.has(name)) {
      mediaNames.add(name);
      if (PRINT_MEDIA_NAMES)
        console.log(Array.from(mediaNames));
    }
    boxart.onmouseenter = () => {
      if (!activeTile || activeTile[1] != boxart)
        showNewTile(boxart, name);
    };
  }
}


// Reposition and resize the currently displaying Twitflix tiles.
//
// This is needed since the media boxes change size on hover.
function repositionTile() {
  var tileID, name, boxart;
  const namesAndBobPlays = getNamesAndBobPlays();
  // Position the active tile on a box art / bob card.
  if (activeTile) {
    [tileID, name, boxart] = activeTile;
    if (name in namesAndBobPlays)
        positionAbove(tileID, namesAndBobPlays[name]);
    else
        positionAbove(tileID, boxart);
  }
  window.requestAnimationFrame(repositionTile);
}


// Position a tile above a HTMLElement.
function positionAbove(tileID, targetElem) {
  var tile = document.getElementById(tileID);
  if (tile == null) {
    console.log('Previous tile removed');
    return;
  }
  const height = targetElem.clientHeight;
  const width = targetElem.clientWidth;
  const targetPosition = targetElem.getBoundingClientRect();
  tile.style.height = `${height}px`;
  tile.style.width = `${width}px`;
  tile.style.left = `${targetPosition.left}px`;
  tile.style.top =
    `${targetPosition.top - document.body.getBoundingClientRect().top - height}px`;

  if (SHOW_HISTOGRAM) {
    const right = document.getElementById(canvasContainerID(tileID));
    right.style.height = `${height}px`;
    right.style.width = `${width * 0.66}px`;
  }
}


////////////////////////////////////////////////////////////////////////////////
// Functions to find data in the Netflix page. /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// Return a list of (String, HtmlElement), film names and box art element.
//
// There may be multiple HtmlElements for the same film name.
function getNamesAndBoxarts() {
  const tuples = [];
  const links = document.links;
  for (var i = 0; i < links.length; i++) {
    const name = links[i].getAttribute("aria-label");
    const boxart = links[i].firstChild;
    if (name && name != "Play" && links[i].href.includes("watch"))
      tuples.push([name, boxart]);
  }
  return tuples;
}


// Return a set of {String: HtmlElement}, media names and bob card elements.
function getNamesAndBobPlays() {
  const namesAndBobs = {};
  const bobCards = document.getElementsByClassName('bob-card');
  const bobTitles = document.getElementsByClassName('bob-title');
  for (var i = 0; i < bobCards.length; i++) {
    // Find the title of this bob card.
    var title = null;
    for (var j = 0; j < bobTitles.length; j ++) {
      if (bobCards[i].contains(bobTitles[j])) {
        title = bobTitles[j].innerHTML;
        break;
      }
    }
    if (title != null)
        namesAndBobs[title] = bobCards[i];
    else
      console.log(`Could not find title for ${bobCards[i]}`);
  }
  return namesAndBobs;
}


console.log('Twitflix running...');
registerTilesOnPage();
window.setInterval(registerTilesOnPage, 100);
window.requestAnimationFrame(repositionTile);
