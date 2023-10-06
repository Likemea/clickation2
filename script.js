const clickButton = document.getElementById("clickButton");
const upgradeButton = document.getElementById("upgradeButton");
const scoreElement = document.getElementById("score");

let score = 0;
let pointGainPerClick = 1;
let upgradeCost = 10;

clickButton.addEventListener("click", () => {
    score += pointGainPerClick;
    scoreElement.textContent = score;
});

upgradeButton.addEventListener("click", () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        pointGainPerClick *= 2;
        scoreElement.textContent = score;
        upgradeCost *= Math.round(Math.log(upgradeCost)); 
        upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost} P)`;
      clickButton.textContent = `Click for ${pointGainPerClick}`;
    } else {
        alert(`Not enough points to upgrade! Get ${upgradeCost - score} more points.`);
    }
});

// prestige handler
const prestigeButton = document.getElementById("prestigeButton");
let prestigeRequirement = 2500;
let timesPrestiged = 0;

prestigeButton.addEventListener("click", () => {
    if (score >= prestigeRequirement) {
        const confirmPrestige = confirm("Are you sure you want to prestige? This will reset your progress, but give you a x5 multi.");

        if (confirmPrestige) {

            score = 0;
            upgradeCost = 10;
            prestigeRequirement *= prestigeRequirement;
            timesPrestiged += 1;


            scoreElement.textContent = score;
            prestigeButton.textContent = ` Prestige (Cost: ${prestigeRequirement}P)`;
            upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost}P)`;


            pointGainPerClick *= 5;


            alert("Congratulations! You've prestiged and gained a permanent x5 boost.");
        }
    } else {
        alert(`You have ${prestigeRequirement - score} points left to prestige.`);
    }
});
// automation handler
const automationButton = document.getElementById("automationButton");
let automationCost = 50; 
let automationInterval; 

automationButton.addEventListener("click", () => {
    if (score >= automationCost) {

        score -= automationCost;
        scoreElement.textContent = score;


        startAutomation();


        automationCost *= pointGainPerClick;
        automationInterval -= 50;
        automationButton.textContent = `Automation (Cost: ${automationCost}P)`;
    } else {
        alert(`You need at least ${automationCost - score} points to purchase automation.`);
    }
});

function startAutomation() {

    automationInterval = setInterval(() => {
        score += pointGainPerClick; 
        scoreElement.textContent = score;
    }, 300); 
}

// achievement handler
const mainGameButton = document.getElementById("mainGameButton");
const achievementsButton = document.getElementById("achievementsButton");
const modalContainer = document.querySelector(".modal-container");
const closeAchievementsButton = document.getElementById("Close");

mainGameButton.addEventListener("click", () => {
    
    modalContainer.style.display = "none";
    document.querySelector(".main-game-menu").style.display = "block";
});

achievementsButton.addEventListener("click", () => {
    
    modalContainer.style.display = "block";
    document.querySelector(".main-game-menu").style.display = "none";
});

closeAchievementsButton.addEventListener("click", () => {
    
    modalContainer.style.display = "none";
});

// achievement giver handler
const pointsAchievement = document.getElementById("pointsAchievement");
const pointsRequirement = 100000000; 
const achievementNotification = document.getElementById("achievementNotification");

let achievementShown = false; 

function checkAchievement() {
    if (!achievementShown && score >= pointsRequirement) {
        
        pointsAchievement.style.display = "block";

        
        achievementNotification.style.display = "block";

        
        achievementShown = true;

        
        setTimeout(() => {
            achievementNotification.style.display = "none";
        }, 3000); 
    }
}


const achievementInterval = setInterval(() => {
    checkAchievement();
    

    if (achievementShown) {
        clearInterval(achievementInterval);
    }
}, 1000);

const prestigeAchievement = document.getElementById("prestigeAchievement");
const achievementNotification2 = achievementNotification.cloneNode(true);
document.body.appendChild(achievementNotification2);

let achievementShown2 = false; 

function checkAchievement2() {
    if (!achievementShown2 && timesPrestiged >= 3) {
        
        prestigeAchievement.style.display = "block";

        
        achievementNotification2.style.display = "block";

        
        achievementShown2 = true;

        
        setTimeout(() => {
            achievementNotification2.style.display = "none";
        }, 3000); 
    }
}


const achievementInterval2 = setInterval(() => {
    checkAchievement2();
    

    if (achievementShown2) {
        clearInterval(achievementInterval2);
    }
}, 1000);
