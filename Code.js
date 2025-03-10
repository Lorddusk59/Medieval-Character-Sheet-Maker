let skillPoints = 10;

const raceStats = {
    Human: { strength: 2, dexterity: 2, intelligence: 2, charisma: 2 },
    Elf: { strength: 1, dexterity: 4, intelligence: 2, charisma: 2 },
    Orc: { strength: 4, dexterity: 1, intelligence: 1, charisma: 2 },
    Dwarf: { strength: 3, dexterity: 1, intelligence: 2, charisma: 2 }
};

const subclassStats = {
    Knight: {
        Swordsman: { strength: 2, dexterity: 1, intelligence: 0, charisma: 0 },
        Defender: { strength: 3, dexterity: 0, intelligence: 0, charisma: 1 }
    },
    Mage: {
        Elementalist: { strength: 0, dexterity: 0, intelligence: 4, charisma: 0 },
        Enchanter: { strength: 1, dexterity: 1, intelligence: 3, charisma: 1 }
    },
    Rogue: {
        Assassin: { strength: 2, dexterity: 4, intelligence: 0, charisma: 0 },
        Archer: { strength: 1, dexterity: 3, intelligence: 0, charisma: 1 }
    },
    Cleric: {
        Paladin: { strength: 3, dexterity: 1, intelligence: 2, charisma: 1 },
        Healer: { strength: 1, dexterity: 2, intelligence: 3, charisma: 1 }
    },
    Warlock: {
        Necromancer: { strength: 2, dexterity: 0, intelligence: 4, charisma: 1 },
        Enchanter: { strength: 1, dexterity: 1, intelligence: 3, charisma: 2 }
    },
    Druid: {
        BeastMaster: { strength: 3, dexterity: 2, intelligence: 0, charisma: 0 },
        Elementalist: { strength: 1, dexterity: 2, intelligence: 4, charisma: 1 }
    }
};

function updateStats() {
    let selectedRace = document.getElementById("race").value;
    let selectedClass = document.getElementById("class").value;
    let selectedSubclass = document.getElementById("subclass").value;

    let raceBonus = raceStats[selectedRace];
    let classBonus = subclassStats[selectedClass];
    let subclassBonus = classBonus[selectedSubclass] || { strength: 0, dexterity: 0, intelligence: 0, charisma: 0 };

    skills = { strength: 0, dexterity: 0, intelligence: 0, charisma: 0 };

    skills.strength += raceBonus.strength;
    skills.dexterity += raceBonus.dexterity;
    skills.intelligence += raceBonus.intelligence;
    skills.charisma += raceBonus.charisma;

    skills.strength += subclassBonus.strength;
    skills.dexterity += subclassBonus.dexterity;
    skills.intelligence += subclassBonus.intelligence;
    skills.charisma += subclassBonus.charisma;

    updateUI();
}

document.getElementById("race").addEventListener("change", updateStats);
document.getElementById("class").addEventListener("change", function () {
    updateSubclasses();
    updateStats();
});

document.getElementById("subclass").addEventListener("change", updateStats);

const subclasses = {
    Knight: {
        Swordsman: { weapon: "Longsword" },
        Defender: { weapon: "Shield and Mace" }
    },
    Mage: {
        Elementalist: { weapon: "Staff of Fire" },
        Enchanter: { weapon: "Spellbook" }
    },
    Rogue: {
        Assassin: { weapon: "Daggers" },
        Archer: { weapon: "Bow and Arrows" }
    },
    Cleric: {
        Paladin: { weapon: "Holy Sword" },
        Healer: { weapon: "Healing Staff" }
    },
    Warlock: {
        Necromancer: { weapon: "Staff of Souls" },
        Enchanter: { weapon: "Spellbook" }
    },
    Druid: {
        BeastMaster: { weapon: "Staff of the Wild" },
        Elementalist: { weapon: "Nature's Wand" }
    }
};

function updateSubclasses() {
    let classSelection = document.getElementById("class").value;
    let subclassDropdown = document.getElementById("subclass");

    subclassDropdown.innerHTML = "";

    if (subclasses[classSelection]) {
        for (let subclass in subclasses[classSelection]) {
            let option = document.createElement("option");
            option.value = subclass;
            option.textContent = subclass;
            subclassDropdown.appendChild(option);
        }
    }

    updateStats();
}

function generateRandomCharacter() {
    let randomRace = Object.keys(raceStats)[Math.floor(Math.random() * Object.keys(raceStats).length)];
    let randomClass = Object.keys(subclasses)[Math.floor(Math.random() * Object.keys(subclasses).length)];

    let randomSubclass = Object.keys(subclasses[randomClass])[Math.floor(Math.random() * Object.keys(subclasses[randomClass]).length)];

    document.getElementById("race").value = randomRace;
    document.getElementById("class").value = randomClass;
    updateSubclasses();
    document.getElementById("subclass").value = randomSubclass;

    updateStats();

    skillPoints = 10 - (skills.strength + skills.dexterity + skills.intelligence + skills.charisma);
    updateUI();
}

function addSkill(skill) {
    if (skillPoints > 0 && skills[skill] < 10) {
        skills[skill]++;
        skillPoints--;
        updateUI();
    }
}

function removeSkill(skill) {
    if (skills[skill] > 0) {
        skills[skill]--;
        skillPoints++;
        updateUI();
    }
}

function updateUI() {
    document.getElementById("points").textContent = skillPoints;
    for (let skill in skills) {
        skills[skill] = Math.max(0, Math.min(10, skills[skill]));

        document.getElementById(skill).textContent = skills[skill];

        let skillBar = document.getElementById(`${skill}-bar`);
        let percentage = (skills[skill] / 10) * 100;
        skillBar.style.width = `${percentage}%`;
    }
}

function generateSheet() {
    let chosenClass = document.getElementById("class").value;
    let chosenSubclass = document.getElementById("subclass").value;
    let startingWeapon = subclasses[chosenClass][chosenSubclass].weapon;

    let output = `
        <div class="card">
            <h3>Your Character Sheet</h3>
            <p><strong>Class:</strong> ${chosenClass}</p>
            <p><strong>Subclass:</strong> ${chosenSubclass}</p>
            <p><strong>Starting Weapon:</strong> ${startingWeapon}</p>
            <div class="skills">
                <p><strong>Strength:</strong> ${skills.strength}</p>
                <div class="skill-bar"><div style="width: ${(skills.strength / 10) * 100}%"></div></div>
            </div>
            <div class="skills">
                <p><strong>Dexterity:</strong> ${skills.dexterity}</p>
                <div class="skill-bar"><div style="width: ${(skills.dexterity / 10) * 100}%"></div></div>
            </div>
            <div class="skills">
                <p><strong>Intelligence:</strong> ${skills.intelligence}</p>
                <div class="skill-bar"><div style="width: ${(skills.intelligence / 10) * 100}%"></div></div>
            </div>
            <div class="skills">
                <p><strong>Charisma:</strong> ${skills.charisma}</p>
                <div class="skill-bar"><div style="width: ${(skills.charisma / 10) * 100}%"></div></div>
            </div>
        </div>
    `;

    document.getElementById("output").style.display = 'block';
    document.getElementById("output").innerHTML = output;
}

document.addEventListener("DOMContentLoaded", updateSubclasses);
