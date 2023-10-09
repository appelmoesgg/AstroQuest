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

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

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
    // Check if it's a mobile device, if not, show the popup
    if (!isMobileDevice()) {
      showPopup("Not enough resources to upgrade spaceship!");
    }
  }
}


function discoverPlanet() {
  const planetCost = Math.ceil(20 * Math.pow(1.5, planetCount));
  if (shipLevel >= planetCount + 1 && resourceCount >= planetCost) {
    planetCount++;
    resourceCount -= planetCost;
    updateDisplay();
  } else if (shipLevel < planetCount + 1) {
    // Check if it's a mobile device, if not, show the popup
    if (!isMobileDevice()) {
      showPopup("Upgrade your spaceship to discover more planets!");
    }
  } else {
    // Check if it's a mobile device, if not, show the popup
    if (!isMobileDevice()) {
      showPopup("Not enough resources to discover a new planet!");
    }
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
          // Check if it's a mobile device, if not, show the popup
          if (!isMobileDevice()) {
            showPopup("Not enough resources to buy an Asteroid Miner!");
      }
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
      // Check if it's a mobile device, if not, show the popup
      if (!isMobileDevice()) {
        showPopup("Not enough resources to buy an Asteroid Miner!");
      }
    }
  } else {
    // Check if it's a mobile device, if not, show the popup
    if (!isMobileDevice()) {
      showPopup("You've reached the limit of Asteroid Miners!");
    }
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
  console.log(resourceCount)
  console.log(shipLevel)
  console.log(planetCount)
  console.log(autoGathererCount)
  console.log(prestigeLevel)
  document.getElementById("resourceCount").innerText = resourceCount;
  document.getElementById("autoGathererCount").innerText = autoGathererCount;
  document.getElementById("spaceshipLevel").innerText = shipLevel;
  document.getElementById("discoveredPlanets").innerText = planetCount;

  const spaceshipCost = Math.ceil(10 * Math.pow(1.2, shipLevel - 1));
  document.getElementById("spaceshipUpgradeCost").innerText = spaceshipCost;
  if (resourceCount < spaceshipCost){
    document.getElementById("upgradeSpaceshipButton").disabled = true;
  } else {
    document.getElementById("upgradeSpaceshipButton").disabled = false;
  }
  
  const planetCost = Math.ceil(20 * Math.pow(1.5, planetCount));
  document.getElementById("planetDiscoveryCost").innerText = planetCost;
  if (resourceCount < planetCost){
    document.getElementById("discoverPlanetButton").disabled = true;
  } else {
    document.getElementById("discoverPlanetButton").disabled = false;
  }

  const autoGathererCost = Math.ceil(10 * Math.pow(autoGathererCostIncrease, autoGathererCount));
  document.getElementById("autoGathererCost").innerText = Math.ceil(10 * Math.pow(autoGathererCostIncrease, autoGathererCount));
  if (resourceCount < autoGathererCost){
    document.getElementById("buyAutoGathererButton").disabled = true;
  } else {
    document.getElementById("buyAutoGathererButton").disabled = false;
  }

  if (planetCount < 5) {
    document.getElementById("prestige").disabled = true;
  } else {
    document.getElementById("prestige").disabled = false;
  }
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


// Add a variable to track the current step of the welcome popup
let welcomePopupStep = 0;

function showWelcomePopup() {
  const welcomePopupOverlay = document.getElementById("welcome-popup-overlay");
  welcomePopupOverlay.style.display = "flex";
  showWelcomePopupStep(welcomePopupStep);
}

function showWelcomePopupStep(step) {
  const welcomePopupSteps = document.querySelectorAll('.welcome-popup-step');
  welcomePopupSteps.forEach((stepElem, index) => {
    if (index === step) {
      stepElem.style.display = 'block';
    } else {
      stepElem.style.display = 'none';
    }
  });
}

function nextWelcomePopupStep() {
  welcomePopupStep++;
  showWelcomePopupStep(welcomePopupStep);
}

function closeWelcomePopup() {
  const welcomePopupOverlay = document.getElementById("welcome-popup-overlay");
  welcomePopupOverlay.style.display = "none";
  updateDisplay();
}

showWelcomePopupStep(0)

updateDisplay();