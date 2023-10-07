let resourceCount = 0;
let shipLevel = 1;
let planetCount = 0;
let prestigeLevel = 0;
let autoGathererCount = 0;
let autoGathererCost = 10;
let autoGathererCostIncrease = 1.2;
const autoGathererLimit = 10;


const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });
});

function gatherResource() {
  resourceCount += shipLevel;
  updateDisplay();
}

function upgradeSpaceship() {
  const upgradeCost = Math.ceil(10 * Math.pow(1.2, shipLevel - 1));
  if (resourceCount >= upgradeCost) {
    resourceCount -= upgradeCost;
    shipLevel++;
    updateDisplay();
  } else {
    showPopup("Not enough resources to upgrade spaceship!");
  }
}

function discoverPlanet() {
  const planetCost = Math.ceil(20 * Math.pow(1.5, planetCount));
  if (shipLevel >= planetCount + 1 && resourceCount >= planetCost) {
    planetCount++;
    resourceCount -= planetCost;
    updateDisplay();
  } else if (shipLevel < planetCount + 1) {
    showPopup("Upgrade your spaceship to discover more planets!");
  } else {
    showPopup("Not enough resources to discover a new planet!");
  }
}

function prestige() {
  if (planetCount >= 5) {
    prestigeLevel++;
    planetCount = 0;
    shipLevel = 1;
    resourceCount = 0;
    autoGathererCount = 0;  // Clear all miners
    autoGathererLimit++;    // Increase the maximum allowed miners by 1
    updateAutoGathererCost();
    updateDisplay();
  } else {
    showPopup("Discover at least 5 planets to prestige!");
  }
}

function buyAutoGatherer() {
  if (autoGathererCount < autoGathererLimit) {
    const cost = Math.ceil(autoGathererCost * Math.pow(autoGathererCostIncrease, autoGathererCount));
    if (resourceCount >= cost) {
      resourceCount -= cost;
      autoGathererCount++;
      updateAutoGathererCost();
      updateDisplay();
      startAutoGatherer();
    } else {
      showPopup("Not enough resources to buy an Asteroid Miner!");
    }
  } else {
    showPopup("You've reached the limit of Asteroid Miners!");
  }
}

function updateAutoGathererCost() {
  autoGathererCost = Math.ceil(autoGathererCost * autoGathererCostIncrease);
}

function startAutoGatherer() {
  setInterval(() => {
    resourceCount += autoGathererCount;
    updateDisplay();
  }, 1000);
}

function updateDisplay() {
  document.getElementById("resourceCount").innerText = resourceCount;
  document.getElementById("autoGathererCount").innerText = autoGathererCount;
  document.getElementById("autoGathererCost").innerText = Math.ceil(autoGathererCost * Math.pow(autoGathererCostIncrease, autoGathererCount));

  const spaceshipCost = Math.ceil(10 * Math.pow(1.2, shipLevel - 1));
  document.getElementById("spaceshipUpgradeCost").innerText = spaceshipCost;
  

  const planetCost = Math.ceil(20 * Math.pow(1.5, planetCount));
  document.getElementById("planetDiscoveryCost").innerText = planetCost;
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  popupText.innerText = message;
  popup.style.display = "block";
  setTimeout(closePopup, 1500);
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}


// Function to close the welcome popup
function closeWelcomePopup() {
  const welcomePopup = document.getElementById("welcome-popup-overlay");
  welcomePopup.style.display = "none";
}

updateDisplay();