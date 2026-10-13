let game = {
    bananas: 0,
    basePerClick: 1,
    basePerSecond: 0,
    multiplier: 1,
    
    daveOwned: 0,
    stuartOwned: 0,
    serumOwned: 0,
    unicornOwned: 0,
    rocketOwned: 0,
    freezeOwned: 0,
    
    daveCost: 10,
    stuartCost: 50,
    serumCost: 200,
    unicornCost: 500,
    rocketCost: 1000,
    freezeCost: 5000
};

function clickMinion() {
    let clickValue = game.basePerClick * game.multiplier;
    game.bananas += clickValue;
    
    checkMilestones();
    updateUI();
}

function buyDave() {
    if (game.bananas >= game.daveCost) {
        game.bananas -= game.daveCost;
        game.daveOwned++;
        game.basePerClick += 1;
        
        game.daveCost = Math.floor(game.daveCost * 1.3);
        updateUI();
    }
}

function buyStuart() {
    if (game.bananas >= game.stuartCost) {
        game.bananas -= game.stuartCost;
        game.stuartOwned++;
        game.basePerSecond += 1;
        
        game.stuartCost = Math.floor(game.stuartCost * 1.3);
        updateUI();
    }
}

function buySerum() {
    if (game.bananas >= game.serumCost) {
        game.bananas -= game.serumCost;
        game.serumOwned++;
        game.multiplier *= 2;
        
        game.serumCost = Math.floor(game.serumCost * 2.5);
        updateUI();
    }
}

function buyUnicorn() {
    if (game.bananas >= game.unicornCost) {
        game.bananas -= game.unicornCost;
        game.unicornOwned++;
        game.basePerClick += 5;
        
        game.unicornCost = Math.floor(game.unicornCost * 1.4);
        updateUI();
    }
}

function buyRocket() {
    if (game.bananas >= game.rocketCost) {
        game.bananas -= game.rocketCost;
        game.rocketOwned++;
        game.basePerSecond += 10;
        
        game.rocketCost = Math.floor(game.rocketCost * 1.4);
        updateUI();
    }
}

function buyFreeze() {
    if (game.bananas >= game.freezeCost) {
        game.bananas -= game.freezeCost;
        game.freezeOwned++;
        game.multiplier *= 2;
        
        game.freezeCost = Math.floor(game.freezeCost * 2.5);
        updateUI();
    }
}

setInterval(function() {
    if (game.basePerSecond > 0) {
        let autoBananas = game.basePerSecond * game.multiplier;
        game.bananas += autoBananas;
        updateUI();
    }
}, 1000);

function checkMilestones() {
    let messageEl = document.getElementById("milestone-text");
    if (game.bananas >= 10000) {
        messageEl.innerText = "10,000 Bananas! King Bob approves!";
    } 
    else if (game.bananas >= 1000) {
        messageEl.innerText = "Wow! 1000 Bananas! Gru is proud.";
    }
    else if (game.bananas >= 500) {
        messageEl.innerText = "Halfway to a thousand!";
    }
    else if (game.bananas >= 100) {
        messageEl.innerText = "A hundred bananas! The minions are going crazy.";
    }
}

function updateUI() {
    document.getElementById("banana-count").innerText = Math.floor(game.bananas);
    document.getElementById("bps-display").innerText = (game.basePerSecond * game.multiplier);
    document.getElementById("bpc-display").innerText = (game.basePerClick * game.multiplier);

    document.getElementById("dave-owned").innerText = game.daveOwned;
    document.getElementById("stuart-owned").innerText = game.stuartOwned;
    document.getElementById("serum-owned").innerText = game.serumOwned;
    document.getElementById("unicorn-owned").innerText = game.unicornOwned;
    document.getElementById("rocket-owned").innerText = game.rocketOwned;
    document.getElementById("freeze-owned").innerText = game.freezeOwned;

    document.getElementById("dave-cost").innerText = game.daveCost;
    document.getElementById("stuart-cost").innerText = game.stuartCost;
    document.getElementById("serum-cost").innerText = game.serumCost;
    document.getElementById("unicorn-cost").innerText = game.unicornCost;
    document.getElementById("rocket-cost").innerText = game.rocketCost;
    document.getElementById("freeze-cost").innerText = game.freezeCost;

    document.getElementById("btn-dave").disabled = game.bananas < game.daveCost;
    document.getElementById("btn-stuart").disabled = game.bananas < game.stuartCost;
    document.getElementById("btn-serum").disabled = game.bananas < game.serumCost;
    document.getElementById("btn-unicorn").disabled = game.bananas < game.unicornCost;
    document.getElementById("btn-rocket").disabled = game.bananas < game.rocketCost;
    document.getElementById("btn-freeze").disabled = game.bananas < game.freezeCost;
}

updateUI();