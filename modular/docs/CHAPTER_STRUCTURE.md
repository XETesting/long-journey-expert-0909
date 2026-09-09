# Aeneid Trail — High-Level Chapter Structure

**Locked in Phase 1 — Foundation**  
**Expanded in Phase 2 — Narrative Skeleton**  
**Polished in Phase 3 — Systems & Polish**  
Last updated: 2026-07-21

This maps the 12 books of Virgil’s *Aeneid* into playable journey stages.  
Each chapter consists of one or more **travel legs**, scripted events, random events, and player choices.  
The structure prioritizes faithfulness to major plot beats while supporting Oregon Trail-style progression (travel → event → choice → consequence).

---

## Chapter Overview

| Ch | Title                              | Primary Books | Key Beats / Landmarks                          | Status in Phase 2          |
|----|------------------------------------|---------------|------------------------------------------------|----------------------------|
| 1  | The Fall of Troy                   | 2             | Sack of the city, escape with household gods, loss of Creusa | Fully playable             |
| 2  | Departure & First Voyages          | 2–3 (early)   | Loading the fleet, first sail, Thrace (Polydorus) | Fully playable             |
| 3  | The Wanderings                     | 3             | Delos, Crete (plague), Strophades (Harpies), Buthrotum, Sicily (death of Anchises) | Fully playable             |
| 4  | Storm & the Shores of Carthage     | 1             | Juno’s storm, landing near Carthage, welcome by Dido | Fully playable             |
| 5  | The Queen of Carthage              | 4             | Love with Dido, divine reminder of duty, departure, Dido’s death & curse | Fully playable (key choices) |
| 6  | Funeral Games                      | 5             | Return to Sicily, games for Anchises, partial burning of ships | Skeleton + key events      |
| 7  | The Underworld                     | 6             | Cumae, Sibyl, descent, vision of future Rome               | Skeleton + key prophecy    |
| 8  | Arrival in Latium                  | 7–8           | Landing, embassy to Latinus, alliance with Evander, shield of Aeneas | Skeleton + alliance choice |
| 9  | The War for Italy                  | 9–11          | Turnus’ aggression, death of Pallas, major battles         | Skeleton + resource drain & key deaths |
| 10 | The Final Reckoning                | 12            | Truce, single combat with Turnus, mercy vs. vengeance      | Fully playable ending      |

---

## Phase 2 Implementation Notes

- Chapters 1–5 are fully traversable with multiple meaningful choices and lasting flags.
- Chapters 6–9 use condensed “skeleton” scenes that still advance the plot, apply resource pressure, set critical flags, and preserve agency at the most important decision points.
- Chapter 10 always presents the climactic choice regarding Turnus.
- Random sea/land events can interrupt travel legs (driven by `junoHostility`, supplies, and morale).
- Long-term flags now tracked include: `creusaLost`, `anchisesDead`, `harpiesCursed`, `didoMet`, `didoAffair`, `didoCursed`, `leftDido`, `underworldVisited`, `pallasDead`, `evanderAllied`, `turnusSpared`, `turnusKilled`.

---

## Design Rules for Narrative Skeleton

1. Every major Virgilian beat appears, even if condensed.
2. Player choices at key moral pressure points (Creusa, Dido, Turnus, treatment of the dead, piety vs. pragmatism) produce distinct short-term outcomes and lasting flags.
3. Resource drain and random misfortune keep the Oregon Trail pressure present between scripted set-pieces.
4. Divine will remains a real force — some events are nearly forced; others can be mitigated by high piety / Venus favor or worsened by high Juno hostility.

Phase 3 added: balanced resource pressure, random events during travel, chapter progress UI, dynamic multiple endings based on flags (Turnus, Dido, piety, losses), and basic accessibility / responsive improvements.
