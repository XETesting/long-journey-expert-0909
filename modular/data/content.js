/**
 * Aeneid Trail — Content
 * Full arc from Fall of Troy to the final duel with Turnus.
 * Chapters 1–5 fully detailed; 6–9 condensed but playable; 10 climactic.
 * Data-driven. Faithful to major Virgilian beats while granting agency.
 */

window.AENEID_DATA = {
  version: "1.0.0",

  startingState: {
    version: "1.0.0",
    men: 250,
    ships: 0,
    supplies: 55,
    morale: 55,
    piety: 70,
    junoHostility: 70,
    venusFavor: 60,
    health: 85,
    companions: [
      { id: "anchises", name: "Anchises", status: "alive", role: "father" },
      { id: "ascanius", name: "Ascanius", status: "alive", role: "son" },
      { id: "creusa",   name: "Creusa",   status: "alive", role: "wife" },
      { id: "achates",  name: "Achates",  status: "alive", role: "lieutenant" }
    ],
    flags: {
      escapedTroy: false,
      creusaLost: false,
      householdGodsSecured: false,
      fleetAssembled: false,
      firstVoyageComplete: false,
      polydorusFound: false,
      delosVisited: false,
      creteAttempted: false,
      harpiesCursed: false,
      buthrotumVisited: false,
      anchisesDead: false,
      didoMet: false,
      didoAffair: false,
      leftDido: false,
      didoCursed: false,
      underworldVisited: false,
      sawFutureRome: false,
      evanderAllied: false,
      pallasDead: false,
      turnusSpared: false,
      turnusKilled: false
    },
    travel: {
      currentChapter: 1,
      currentLeg: "troy-burning",
      daysElapsed: 0
    },
    eventLog: []
  },

  // ------------------------------------------------------------------
  // RANDOM EVENT POOL (can fire during travel legs)
  // ------------------------------------------------------------------
  randomEvents: [
    {
      id: "squall",
      weight: 30,
      title: "Sudden Squall",
      text: "A black squall rises without warning. The sea heaves and the ships strain against their ropes.",
      choices: [
        {
          id: "ride_it",
          text: "Order the men to reef sails and ride it out.",
          effects: { ships: -1, supplies: -6, morale: -5, log: "One ship is damaged but the fleet holds together." }
        },
        {
          id: "pray_neptune",
          text: "Call upon Neptune and pour a libation.",
          effects: { piety: 5, supplies: -3, log: "The storm lessens. The men take it as a sign." }
        }
      ]
    },
    {
      id: "sickness",
      weight: 20,
      title: "Sickness Among the Men",
      text: "Fever spreads through several ships. The weaker begin to fail.",
      choices: [
        {
          id: "isolate",
          text: "Isolate the sick and press on.",
          effects: { men: -18, morale: -8, log: "Some die. The rest harden themselves." }
        },
        {
          id: "delay_care",
          text: "Delay to care for the sick as best you can.",
          effects: { supplies: -12, daysElapsed: 2, morale: 5, log: "You lose time and stores, but fewer men perish." }
        }
      ]
    },
    {
      id: "good_omen",
      weight: 15,
      title: "A Favorable Sign",
      text: "Dolphins play about the prows and a steady following wind rises. The men cheer.",
      choices: [
        {
          id: "accept",
          text: "Take the omen and press the advantage.",
          effects: { morale: 10, venusFavor: 5, log: "Spirits rise. The ships make good time." }
        }
      ]
    },
    {
      id: "juno_anger",
      weight: 25,
      title: "The Anger of Juno",
      text: "The sky darkens unnaturally. Thunder rolls though no storm follows. The older men mutter that Juno has not forgotten Troy.",
      choices: [
        {
          id: "sacrifice",
          text: "Offer sacrifice to appease the queen of the gods.",
          effects: { piety: 8, supplies: -8, junoHostility: -5, log: "The rites are performed. Whether they will help remains to be seen." }
        },
        {
          id: "ignore",
          text: "Hold course. Fate is stronger than any one goddess.",
          effects: { junoHostility: 5, morale: -5, log: "You refuse to yield. The air remains heavy." }
        }
      ]
    },
    {
      id: "desertion",
      weight: 12,
      title: "Whispers of Desertion",
      text: "In the night some of the men speak of turning back or slipping away to a nearby shore. Morale is fraying.",
      choices: [
        {
          id: "inspire",
          text: "Speak to them of the destiny that waits in Italy and of those already lost.",
          effects: { morale: 8, piety: 3, log: "Your words steady most of them. A few still slip away in the dark." }
        },
        {
          id: "punish",
          text: "Make an example of the ringleaders so the rest remember their duty.",
          effects: { men: -8, morale: -5, log: "Discipline is restored through fear. The fleet moves on quieter." }
        }
      ]
    },
    {
      id: "calm_sea",
      weight: 18,
      title: "A Day of Calm",
      text: "The sea lies flat and bright. For once the gods seem indifferent or kind. The men rest and mend gear.",
      choices: [
        {
          id: "rest",
          text: "Allow a full day of rest and repair.",
          effects: { morale: 8, supplies: -4, health: 5, log: "The fleet recovers strength. Spirits lift." }
        },
        {
          id: "press",
          text: "Use the calm to cover as many miles as possible.",
          effects: { supplies: -6, log: "You make good distance while the weather holds." }
        }
      ]
    }
  ],

  // ------------------------------------------------------------------
  // SCENES
  // ------------------------------------------------------------------
  scenes: {

    // ===================== CHAPTER 1: FALL OF TROY =====================
    "start": {
      id: "start",
      title: "The Night Troy Fell",
      text: `The walls of Troy are broken. Greek fire lights the night sky. Hector’s ghost has already visited you in a dream, urging you to flee and take the household gods of Troy with you. Your father Anchises, your wife Creusa, and your young son Ascanius wait in the house. The city is dying around you.

What do you do first?`,
      choices: [
        {
          id: "secure_gods",
          text: "Seek the household gods and the sacred things of Troy first — duty to the gods before all else.",
          effects: { piety: 10, flags: { householdGodsSecured: true }, log: "You gather the Penates and the sacred fire. The gods of Troy will travel with you." },
          next: "find_family"
        },
        {
          id: "find_family_first",
          text: "Race home at once to gather Anchises, Creusa, and Ascanius before the streets become impassable.",
          effects: { morale: 5, log: "You push through the burning streets toward your house. Time is short." },
          next: "find_family"
        },
        {
          id: "fight",
          text: "Join the last defenders and try to hold a street or a temple against the Greeks.",
          effects: { men: -40, morale: -10, health: -15, log: "You fight bravely, but the city is already lost. More of your men fall. You are forced to fall back." },
          next: "find_family"
        }
      ]
    },

    "find_family": {
      id: "find_family",
      title: "The House of Aeneas",
      text: `You reach your house. Anchises refuses to leave the city of his fathers. Creusa and Ascanius are ready. Flames and the shouts of Greeks draw closer.

Anchises says he will die in Troy. How do you answer him?`,
      choices: [
        {
          id: "persuade_anchises",
          text: "Plead with him by the memory of Hector and by the future of Ascanius. Beg him to live for the line of Troy.",
          effects: { piety: 5, morale: 5, log: "Your words move him. At last Anchises consents to be carried from the city." },
          next: "escape_city"
        },
        {
          id: "omen",
          text: "Pray for a sign. (A sudden tongue of flame appears on Ascanius’ head and is quenched harmlessly — an omen from the gods.)",
          effects: { piety: 15, venusFavor: 10, flags: { householdGodsSecured: true }, log: "The omen convinces Anchises. The gods themselves will the escape." },
          next: "escape_city"
        },
        {
          id: "force",
          text: "Order your men to lift him by force if necessary. Survival comes first.",
          effects: { piety: -10, morale: -5, log: "Anchises yields, but the act sits heavily on everyone. The gods may remember this." },
          next: "escape_city"
        }
      ]
    },

    "escape_city": {
      id: "escape_city",
      title: "Through the Burning Streets",
      text: `You lift Anchises onto your shoulders. Ascanius holds your hand. Creusa follows a little behind. The streets are chaos — falling roofs, Greek spears, Trojan dead.

In the confusion near the gates, Creusa falls behind. When you reach the muster point outside the walls, she is not there.`,
      choices: [
        {
          id: "search_creusa",
          text: "Turn back alone into the burning city to search for her, despite the danger.",
          effects: { health: -10, morale: -5, flags: { creusaLost: true }, log: "You search the streets and the house. At last her shade appears and tells you that the Great Mother has taken her. She is gone." },
          next: "muster"
        },
        {
          id: "wait_and_search",
          text: "Send trusted men to search while you guard Anchises and Ascanius.",
          effects: { men: -15, flags: { creusaLost: true }, log: "Your men return empty-handed. Later her ghost will appear with a prophecy of a new wife and kingdom in the west. Creusa is lost." },
          next: "muster"
        },
        {
          id: "press_on",
          text: "Press on with the living. The dead cannot be helped, and the fleet must be saved.",
          effects: { piety: -5, morale: -10, flags: { creusaLost: true }, log: "You do not look back. The loss of Creusa will weigh on you, but the survivors are safe for now." },
          next: "muster"
        }
      ]
    },

    "muster": {
      id: "muster",
      title: "Outside the Walls",
      text: `Dawn finds a ragged company of Trojans gathered on the shore. Women, children, and the remaining warriors look to you. The Greek ships still control the harbor, but a few Trojan vessels can be seized or repaired.

You must decide how to spend the precious hours before the enemy closes in.`,
      choices: [
        {
          id: "assemble_fleet",
          text: "Focus everything on assembling and loading the ships. Speed is survival.",
          effects: { ships: 18, supplies: 30, men: -20, flags: { fleetAssembled: true, escapedTroy: true }, log: "By nightfall a fleet is ready. Not all who wished to come could be taken." },
          next: "set_sail"
        },
        {
          id: "scavenge_more",
          text: "Send parties to scavenge more supplies and gather more survivors from the hills.",
          effects: { ships: 15, supplies: 55, men: 35, morale: 10, flags: { fleetAssembled: true, escapedTroy: true }, log: "You delay a day. More supplies and more mouths are taken aboard. The fleet is stronger." },
          next: "set_sail"
        },
        {
          id: "sacrifice",
          text: "Take time to offer sacrifice to the gods for safe passage, even if it costs daylight.",
          effects: { ships: 16, supplies: 35, piety: 15, venusFavor: 10, flags: { fleetAssembled: true, escapedTroy: true, householdGodsSecured: true }, log: "The rites are performed. The Penates are secured on the lead ship." },
          next: "set_sail"
        }
      ]
    },

    // ===================== CHAPTER 2: DEPARTURE =====================
    "set_sail": {
      id: "set_sail",
      title: "The First Voyage",
      text: `The ships push out from the Trojan shore. Behind you the smoke of the city still rises. Ahead lies the open sea and an unknown fate. Anchises sits wrapped in cloaks; Ascanius watches the horizon.

A fair wind rises. You are free of Troy — for now.`,
      choices: [
        {
          id: "sail_west",
          text: "Set a course westward, toward the lands the oracles have vaguely promised.",
          effects: { supplies: -8, travel: { currentChapter: 2, currentLeg: "sea-westward", daysElapsed: 3 }, flags: { firstVoyageComplete: true }, log: "You sail into the west. The first leg of the long journey begins." },
          next: "thrace"
        },
        {
          id: "sail_nearby",
          text: "Hug the coast and make for the nearest shore to regroup.",
          effects: { supplies: -5, travel: { currentChapter: 2, currentLeg: "coastal-thrace", daysElapsed: 2 }, flags: { firstVoyageComplete: true }, log: "You keep the land in sight. The first landfall will come sooner." },
          next: "thrace"
        }
      ]
    },

    "thrace": {
      id: "thrace",
      title: "The Shore of Thrace",
      text: `You land on a desolate stretch of the Thracian coast, hoping to found a temporary settlement. While cutting wood for an altar, dark blood flows from the roots of a bush. A voice rises from the ground — the spirit of Polydorus, Priam’s son, murdered here for gold by the Thracian king.

The place is cursed.`,
      choices: [
        {
          id: "honor_polydorus",
          text: "Perform proper funeral rites for Polydorus and leave this shore at once.",
          effects: { piety: 12, supplies: -5, flags: { polydorusFound: true }, log: "You give Polydorus the rites denied him. The blood ceases. You sail on, heavier in heart but cleaner in conscience." },
          next: "delos"
        },
        {
          id: "take_gold",
          text: "Take what gold remains and depart quickly — the living need it more.",
          effects: { supplies: 15, piety: -10, morale: -5, flags: { polydorusFound: true }, log: "You take the gold. The voice falls silent, but the men look away. The curse of this place travels with you." },
          next: "delos"
        }
      ]
    },

    // ===================== CHAPTER 3: THE WANDERINGS =====================
    "delos": {
      id: "delos",
      title: "The Island of Delos",
      text: `You reach the sacred island of Delos, birthplace of Apollo. The priest-king Anius welcomes you. In the temple you pray for guidance. The voice of the god answers: “Seek your ancient mother. There the house of Aeneas will rule every shore.”

Anchises interprets this as Crete, the old homeland of Teucer.`,
      choices: [
        {
          id: "accept_crete",
          text: "Accept the interpretation and set sail for Crete at once.",
          effects: { piety: 5, flags: { delosVisited: true }, travel: { currentChapter: 3, currentLeg: "to-crete", daysElapsed: 5 }, log: "You sail for Crete, believing you have found the promised land." },
          next: "crete"
        },
        {
          id: "doubt",
          text: "Express doubt. The wording is ambiguous — press for clearer counsel.",
          effects: { piety: 8, flags: { delosVisited: true }, log: "You linger in prayer. The god’s will remains veiled, but your caution is noted." },
          next: "crete"
        }
      ]
    },

    "crete": {
      id: "crete",
      title: "Crete — A City of the Dead",
      text: `You land on Crete and begin to build walls, naming the place Pergamea. For a short time hope rises. Then plague strikes the settlement. Men and animals die. The sky is hard and dry.

In a dream the household gods appear and correct the error: the true homeland is not Crete but a western land called Hesperia — Italy.`,
      choices: [
        {
          id: "abandon_crete",
          text: "Abandon the half-built city at once and sail for the west.",
          effects: { men: -25, supplies: -15, morale: -10, flags: { creteAttempted: true }, travel: { currentLeg: "leave-crete", daysElapsed: 8 }, log: "You leave the dead behind. The plague does not follow onto the ships." },
          next: "strophades"
        },
        {
          id: "linger_rite",
          text: "Stay long enough to burn the dead and offer rites before departing.",
          effects: { men: -35, supplies: -20, piety: 10, morale: -5, flags: { creteAttempted: true }, log: "You honor the dead at cost. The survivors are fewer but the gods are not further offended." },
          next: "strophades"
        }
      ]
    },

    "strophades": {
      id: "strophades",
      title: "The Strophades — The Harpies",
      text: `Starving, you land on the Strophades. Cattle and goats roam free. You slaughter them and prepare a feast. Suddenly the Harpies — foul bird-women — swoop down, defiling the food and driving the men back with their stench and claws.

Celaeno, the eldest, perches on a high rock and delivers a prophecy: you will reach Italy, but you will not found your city until hunger forces you to eat your own tables.`,
      choices: [
        {
          id: "fight_harpies",
          text: "Order the men to fight the creatures off with swords and spears.",
          effects: { men: -10, morale: -5, flags: { harpiesCursed: true }, log: "You drive them away for a time, but Celaeno’s curse has been spoken. It cannot be unsaid." },
          next: "buthrotum"
        },
        {
          id: "withdraw",
          text: "Withdraw, accept the omen, and sail on without further bloodshed.",
          effects: { piety: 5, flags: { harpiesCursed: true }, log: "You leave the cursed shore. The prophecy of the tables travels with you." },
          next: "buthrotum"
        }
      ]
    },

    "buthrotum": {
      id: "buthrotum",
      title: "Buthrotum — Helenus and Andromache",
      text: `You reach Buthrotum in Epirus and find a little Troy already built by Helenus, son of Priam, and Andromache, Hector’s widow. They welcome you as kin. Helenus, a seer, gives you detailed prophecy: the signs by which you will know the site of your city (a white sow with thirty young), the dangers of the western sea, and the need to seek the Sibyl in Italy.

Andromache gives gifts to Ascanius, seeing in him the face of her lost son.`,
      choices: [
        {
          id: "accept_prophecy",
          text: "Receive the prophecy with reverence and prepare to sail for Italy by the long route Helenus advises.",
          effects: { piety: 10, morale: 15, supplies: 20, flags: { buthrotumVisited: true }, log: "You leave richer in knowledge and stores. The path ahead is clearer, though still long." },
          next: "sicily_anchises"
        },
        {
          id: "hasten",
          text: "Thank them but hasten onward — every delay is a risk.",
          effects: { morale: 5, flags: { buthrotumVisited: true }, log: "You take the essential counsel and depart. Time, you judge, is the greater danger." },
          next: "sicily_anchises"
        }
      ]
    },

    "sicily_anchises": {
      id: "sicily_anchises",
      title: "Sicily — The Death of Anchises",
      text: `You land at Drepanum in Sicily. Here, after so many labors, Anchises dies. The man who had been your burden and your counsel is gone. You bury him with all the honor the place allows. The men mourn. Ascanius stands silent beside the grave.

Winter is near. The fleet is battered. The next stretch of sea will be the most dangerous yet.`,
      choices: [
        {
          id: "mourn_fully",
          text: "Remain long enough to hold proper funeral games and rites for your father.",
          effects: {
            piety: 15,
            morale: 5,
            supplies: -10,
            companionStatus: { anchises: "dead" },
            flags: { anchisesDead: true },
            travel: { currentChapter: 4, currentLeg: "leave-sicily", daysElapsed: 12 },
            log: "You honor Anchises with games and sacrifice. The loss is no lighter, but the duty is done."
          },
          next: "storm"
        },
        {
          id: "sail_soon",
          text: "Bury him simply and put to sea before the weather turns against you.",
          effects: {
            piety: 5,
            morale: -5,
            companionStatus: { anchises: "dead" },
            flags: { anchisesDead: true },
            travel: { currentChapter: 4, currentLeg: "leave-sicily", daysElapsed: 9 },
            log: "You give what rites you can and sail. The sea ahead is dark."
          },
          next: "storm"
        }
      ]
    },

    // ===================== CHAPTER 4: THE STORM & CARTHAGE =====================
    "storm": {
      id: "storm",
      title: "The Storm of Juno",
      text: `Juno, still hating the Trojan race, bribes Aeolus to unleash the winds. A storm of unnatural fury strikes the fleet. Waves like mountains rise. Ships are lifted and cast down. You cry out that it would have been better to die at Troy by the hand of Diomedes or Achilles.

Neptune, angered that the winds have been loosed without his leave, calms the sea. But the damage is done.`,
      choices: [
        {
          id: "rally",
          text: "Rally what ships remain and make for the nearest shore.",
          effects: {
            ships: -4,
            men: -35,
            supplies: -20,
            morale: -15,
            junoHostility: 5,
            travel: { currentLeg: "libya-landing", daysElapsed: 3 },
            log: "Four ships are lost with their crews. The survivors crawl toward an unknown coast."
          },
          next: "carthage_landing"
        },
        {
          id: "trust_venus",
          text: "Call upon your mother Venus and hold the course as best you can.",
          effects: {
            ships: -2,
            men: -20,
            supplies: -12,
            venusFavor: 10,
            morale: -5,
            travel: { currentLeg: "libya-landing", daysElapsed: 2 },
            log: "Venus softens the blow. You lose ships, but fewer than you might have. Land appears ahead."
          },
          next: "carthage_landing"
        }
      ]
    },

    "carthage_landing": {
      id: "carthage_landing",
      title: "The Shores of Libya",
      text: `You beach the surviving ships on a desolate African shore. While scouting with Achates, you meet a huntress who is Venus in disguise. She tells you of a nearby city founded by exiles from Tyre under a queen named Dido, and she cloaks you both in mist so you may enter unseen.

You walk into Carthage and stand amazed at the rising walls, the harbor, the temple of Juno where the story of Troy is already carved in stone.`,
      choices: [
        {
          id: "reveal",
          text: "Allow the mist to part and present yourself and your people openly to Queen Dido.",
          effects: { flags: { didoMet: true }, morale: 10, log: "Dido receives you with royal courtesy. She has heard of your sufferings and offers friendship and aid." },
          next: "dido_welcome"
        },
        {
          id: "observe",
          text: "Remain hidden a while longer and observe the queen and her city before revealing yourself.",
          effects: { flags: { didoMet: true }, piety: 5, log: "You watch. Dido is just, capable, and burdened by her own past. When you finally step forward, she welcomes you still." },
          next: "dido_welcome"
        }
      ]
    },

    "dido_welcome": {
      id: "dido_welcome",
      title: "The Court of Dido",
      text: `Dido holds a great feast. She asks to hear the whole story of Troy’s fall and your wanderings. You tell it through the long night. As you speak, Venus and Juno together kindle a flame in Dido’s heart. She begins to love you.

Winter is coming. Your ships need repair. Your people need rest. Dido offers all of this and more.`,
      choices: [
        {
          id: "accept_winter",
          text: "Accept her hospitality for the winter. The men need recovery and the ships need work.",
          effects: { supplies: 55, morale: 20, ships: 2, flags: { didoAffair: true }, log: "You remain in Carthage. The city begins to feel like a home. Dido’s love grows openly." },
          next: "carthage_stay"
        },
        {
          id: "limit_stay",
          text: "Accept aid for the ships and supplies, but keep the stay short and the relationship formal.",
          effects: { supplies: 25, morale: 10, flags: { didoMet: true }, log: "You take what is needed and hold yourself at a careful distance. Dido’s disappointment is visible." },
          next: "mercury"
        }
      ]
    },

    // ===================== CHAPTER 5: DIDO =====================
    "carthage_stay": {
      id: "carthage_stay",
      title: "The Long Winter",
      text: `Months pass. You and Dido become lovers. The building of Carthage slows. Your own destiny begins to fade from daily thought. Rumor carries the story to the surrounding kingdoms and to the gods.

One day Mercury appears to you on the shore, sent by Jupiter himself: “Are you now laying the foundations of lofty Carthage under a woman’s rule? The man who is to rule Italy and carry Trojan blood into the future is forgetful of his kingdom and his fates.”`,
      choices: [
        {
          id: "obey_at_once",
          text: "Obey at once. Order the ships made ready in secret and prepare to leave.",
          effects: { piety: 15, morale: -10, flags: { leftDido: true }, log: "You give the order. The men are glad to be moving again. Dido has not yet been told." },
          next: "dido_departure"
        },
        {
          id: "delay_tell",
          text: "Delay long enough to speak with Dido yourself and try to explain the will of the gods.",
          effects: { piety: 5, morale: -5, flags: { leftDido: true, didoAffair: true }, log: "You go to her. The conversation is bitter. She sees only betrayal." },
          next: "dido_departure"
        }
      ]
    },

    "mercury": {
      id: "mercury",
      title: "The Messenger of Jupiter",
      text: `Even though you have kept a careful distance, Mercury finds you. Jupiter’s command is the same: Italy is your fate. Carthage is not. You must sail.`,
      choices: [
        {
          id: "depart_clean",
          text: "Take the remaining aid Dido has offered and depart with clear thanks and no deeper entanglement.",
          effects: { piety: 10, flags: { leftDido: true }, log: "You leave Carthage with honor intact on both sides, though Dido’s eyes follow the ships." },
          next: "leave_carthage"
        }
      ]
    },

    "dido_departure": {
      id: "dido_departure",
      title: "The Departure",
      text: `Dido discovers the preparations. Her grief turns to fury and then to a terrible resolve. She builds a great pyre of your gifts and her marriage bed. As your ships pull away from the harbor at dawn, the smoke of that pyre rises behind you.

From the high walls she has cursed you and all your descendants: endless war between your peoples, an avenger who will rise from her bones, and no peace between Carthage and the future Rome.`,
      choices: [
        {
          id: "look_back",
          text: "Look back at the smoke and feel the weight of what you have left.",
          effects: { morale: -15, flags: { didoCursed: true, leftDido: true }, log: "You watch the smoke until it is only a stain on the horizon. The curse is spoken." },
          next: "leave_carthage"
        },
        {
          id: "eyes_forward",
          text: "Keep your eyes on the open sea. The gods have commanded this. Looking back will not change it.",
          effects: { piety: 5, morale: -10, flags: { didoCursed: true, leftDido: true }, log: "You do not look back. The men row in silence. The curse still follows." },
          next: "leave_carthage"
        }
      ]
    },

    "leave_carthage": {
      id: "leave_carthage",
      title: "Away from Carthage",
      text: `The African coast falls behind. Your fleet is stronger than when you arrived, yet something essential has been left on that shore. The men sense it. Ascanius is quieter than usual.

You set course once more for Italy, as the gods require.`,
      choices: [
        {
          id: "to_sicily_again",
          text: "Make first for Sicily, to revisit the tomb of Anchises and hold the funeral games long delayed.",
          effects: { travel: { currentChapter: 6, currentLeg: "return-sicily", daysElapsed: 6 }, log: "You turn the prows toward Sicily and the grave of your father." },
          next: "funeral_games"
        }
      ]
    },

    // ===================== CHAPTER 6: FUNERAL GAMES (skeleton) =====================
    "funeral_games": {
      id: "funeral_games",
      title: "Funeral Games for Anchises",
      text: `On the anniversary of Anchises’ death you hold games in his honor: ship race, foot race, boxing, archery. The men are glad of the contest. For a short time the weight of destiny lifts.

Then the Trojan women, weary of wandering and stirred by Juno, set fire to the ships. Four are destroyed before the flames are quenched by a sudden rain — Jupiter’s intervention. Some of the people choose to stay behind in Sicily under Acestes. The rest sail on, fewer in number.`,
      choices: [
        {
          id: "leave_weary",
          text: "Allow those who wish to remain to stay. Press on to Italy with the willing.",
          effects: { men: -40, ships: -4, morale: 5, travel: { currentChapter: 7, currentLeg: "to-cumae", daysElapsed: 10 }, log: "You leave the weary behind. The fleet that sails for Italy is smaller but more resolute." },
          next: "cumae"
        },
        {
          id: "force_all",
          text: "Compel everyone to continue. The destiny of Troy cannot be abandoned by any.",
          effects: { men: -15, ships: -4, morale: -15, travel: { currentChapter: 7, currentLeg: "to-cumae", daysElapsed: 10 }, log: "You force the issue. Some come unwillingly. The mood aboard is dark." },
          next: "cumae"
        }
      ]
    },

    // ===================== CHAPTER 7: THE UNDERWORLD =====================
    "cumae": {
      id: "cumae",
      title: "Cumae — The Sibyl",
      text: `You land at Cumae and seek the Sibyl in her cave. She agrees to guide you to the underworld so you may speak with the shade of Anchises, but first you must find the golden bough that is the passport of the living among the dead.

After trials and the burial of Misenus, you pluck the bough and descend.`,
      choices: [
        {
          id: "descend",
          text: "Descend into the underworld with the Sibyl.",
          effects: { piety: 10, flags: { underworldVisited: true }, log: "You pass the gates of Dis. The journey among the dead begins." },
          next: "underworld"
        }
      ]
    },

    "underworld": {
      id: "underworld",
      title: "The Underworld",
      text: `You pass the unburied, the suicides, the fields of mourning. You see Dido among the shades of those who died for love. She turns from you in silence and flees to the woods where her first husband Sychaeus waits.

Deeper still, in the Elysian fields, you find Anchises. He shows you the long line of souls waiting to be born as your descendants — the future kings of Alba, Romulus, the great Julius, and the emperor who will bring an age of peace. He teaches you the meaning of your labors: to rule the nations with law, to spare the conquered, and to war down the proud.`,
      choices: [
        {
          id: "accept_vision",
          text: "Accept the vision and the charge. Return to the upper world ready to fulfill it.",
          effects: { piety: 15, morale: 20, flags: { sawFutureRome: true, underworldVisited: true }, travel: { currentChapter: 8, currentLeg: "to-latium", daysElapsed: 5 }, log: "You return through the gate of ivory. The future is both a burden and a light." },
          next: "latium"
        }
      ]
    },

    // ===================== CHAPTER 8: LATIUM =====================
    "latium": {
      id: "latium",
      title: "The Mouth of the Tiber",
      text: `You sail into the mouth of the Tiber. On the shore you see a white sow with a litter of thirty — the sign Helenus promised. You have reached the destined land.

King Latinus, warned by omens that his daughter Lavinia must marry a foreigner, receives your embassy with favor. But Turnus, the Rutulian prince who had expected to marry Lavinia, is filled with rage. Juno stirs the war.

You seek allies. Evander, an Arcadian king settled on the future site of Rome, welcomes you and gives you his son Pallas to fight at your side. Venus brings you armor forged by Vulcan, including a great shield on which the future history of Rome is already engraved.`,
      choices: [
        {
          id: "accept_pallas",
          text: "Accept Pallas as a companion in arms and the alliance with Evander.",
          effects: { men: 80, morale: 15, flags: { evanderAllied: true }, travel: { currentChapter: 9, currentLeg: "war-begins", daysElapsed: 4 }, log: "Pallas rides beside you. The war for Italy has begun in earnest." },
          next: "war"
        }
      ]
    },

    // ===================== CHAPTER 9: THE WAR =====================
    "war": {
      id: "war",
      title: "The War for Italy",
      text: `Battle follows battle. The Trojan camp is besieged. Many fall on both sides. In a fierce engagement, Turnus kills young Pallas and takes his sword-belt as a trophy. The loss strikes you like a second death of a son.

The war grinds on. Camilla the Volscian warrior-maiden dies. The gods themselves take counsel. At last a truce is proposed so that the matter may be settled by single combat between you and Turnus.`,
      choices: [
        {
          id: "accept_combat",
          text: "Accept single combat with Turnus. End the bloodshed with one decisive fight.",
          effects: { flags: { pallasDead: true }, travel: { currentChapter: 10, currentLeg: "final-duel", daysElapsed: 20 }, log: "The armies draw back. You and Turnus will decide the fate of Italy alone." },
          next: "final_duel"
        },
        {
          id: "continue_war",
          text: "Refuse the truce. The war must be fought to the end by the full strength of both sides.",
          effects: { men: -60, morale: -10, flags: { pallasDead: true }, travel: { currentChapter: 10, currentLeg: "final-duel", daysElapsed: 25 }, log: "More blood is spilled before the combat is forced upon you anyway. Turnus still stands." },
          next: "final_duel"
        }
      ]
    },

    // ===================== CHAPTER 10: THE FINAL RECKONING =====================
    "final_duel": {
      id: "final_duel",
      title: "The Final Duel",
      text: `You and Turnus meet in the open field. The fight is long and bitter. At last Turnus is wounded and falls. He looks up at you and asks for mercy — for the sake of his father, for the sake of the body that should return home.

Your eyes fall on the sword-belt of Pallas that Turnus still wears. The memory of the boy’s death rises in you like fire.`,
      choices: [
        {
          id: "kill_turnus",
          text: "Drive the sword home. Avenge Pallas. End the threat to your people’s future.",
          effects: { flags: { turnusKilled: true }, log: "You kill Turnus. The war ends. The cost is written in the dust." },
          next: "ending"
        },
        {
          id: "spare_turnus",
          text: "Stay your hand. Spare the conquered, as Anchises taught in the underworld.",
          effects: { piety: 20, flags: { turnusSpared: true }, log: "You spare Turnus. Whether this mercy will be remembered as strength or weakness, only the future will tell." },
          next: "ending"
        }
      ]
    },

    "ending": {
      id: "ending",
      title: "The End of the Journey",
      text: "The long voyage is over. The engine will replace this text with a full epilogue based on your choices.",
      choices: [
        {
          id: "restart",
          text: "Begin the journey again from the fall of Troy.",
          effects: {},
          next: "start"
        }
      ],
      isEnd: true
    }
  }
};
